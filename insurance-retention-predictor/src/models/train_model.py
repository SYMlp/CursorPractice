"""
模型训练模块

该模块负责训练和评估保险客户续保预测模型，包括：
- 加载预处理后的数据
- 训练多种机器学习模型
- 对比模型性能
- 优化最佳模型
- 保存训练好的模型
"""

import os
import logging
import yaml
import pickle
import joblib
from typing import Dict, Any, Tuple
import argparse
from datetime import datetime

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report,
    precision_recall_curve, roc_curve, average_precision_score
)
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
import xgboost as xgb
import lightgbm as lgb
import mlflow
import mlflow.sklearn

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# 项目根目录
PROJECT_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "../.."
))

# 数据和模型路径
PROCESSED_DATA_DIR = os.path.join(PROJECT_ROOT, "data/processed")
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")


def load_processed_data(data_dir: str = PROCESSED_DATA_DIR) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """
    加载预处理后的数据

    Args:
        data_dir: 数据目录路径

    Returns:
        X_train, X_test, y_train, y_test
    """
    logger.info(f"从 {data_dir} 加载处理后的数据")
    
    try:
        X_train = pd.read_csv(os.path.join(data_dir, "X_train.csv"))
        X_test = pd.read_csv(os.path.join(data_dir, "X_test.csv"))
        y_train = pd.read_csv(os.path.join(data_dir, "y_train.csv")).squeeze()
        y_test = pd.read_csv(os.path.join(data_dir, "y_test.csv")).squeeze()
        
        logger.info(f"成功加载数据 - 训练集: {X_train.shape}, 测试集: {X_test.shape}")
        return X_train, X_test, y_train, y_test
    
    except Exception as e:
        logger.error(f"加载数据失败: {str(e)}")
        raise


def train_models(X_train: pd.DataFrame, y_train: pd.Series, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    训练多个模型并返回训练结果

    Args:
        X_train: 训练特征
        y_train: 训练标签
        config: 配置参数

    Returns:
        包含所有训练模型的字典
    """
    logger.info("开始训练模型")
    
    models = {}
    
    # 逻辑回归
    if "logistic_regression" in config["models"]:
        logger.info("训练逻辑回归模型")
        lr_params = config["models"]["logistic_regression"]["params"]
        lr = LogisticRegression(**lr_params)
        lr.fit(X_train, y_train)
        models["logistic_regression"] = lr
    
    # 随机森林
    if "random_forest" in config["models"]:
        logger.info("训练随机森林模型")
        rf_params = config["models"]["random_forest"]["params"]
        rf = RandomForestClassifier(**rf_params)
        rf.fit(X_train, y_train)
        models["random_forest"] = rf
    
    # 梯度提升树
    if "gradient_boosting" in config["models"]:
        logger.info("训练梯度提升树模型")
        gb_params = config["models"]["gradient_boosting"]["params"]
        gb = GradientBoostingClassifier(**gb_params)
        gb.fit(X_train, y_train)
        models["gradient_boosting"] = gb
    
    # XGBoost
    if "xgboost" in config["models"]:
        logger.info("训练XGBoost模型")
        xgb_params = config["models"]["xgboost"]["params"]
        xgb_model = xgb.XGBClassifier(**xgb_params)
        xgb_model.fit(X_train, y_train)
        models["xgboost"] = xgb_model
    
    # LightGBM
    if "lightgbm" in config["models"]:
        logger.info("训练LightGBM模型")
        lgb_params = config["models"]["lightgbm"]["params"]
        lgb_model = lgb.LGBMClassifier(**lgb_params)
        lgb_model.fit(X_train, y_train)
        models["lightgbm"] = lgb_model
    
    logger.info(f"完成训练，共训练了 {len(models)} 个模型")
    return models


def evaluate_models(models: Dict[str, Any], X_test: pd.DataFrame, y_test: pd.Series) -> Dict[str, Dict[str, float]]:
    """
    评估所有模型的性能

    Args:
        models: 训练好的模型字典
        X_test: 测试特征
        y_test: 测试标签

    Returns:
        包含每个模型评估指标的字典
    """
    logger.info("开始评估模型性能")
    
    evaluation_results = {}
    
    for name, model in models.items():
        logger.info(f"评估模型: {name}")
        
        # 预测概率和类别
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        y_pred = model.predict(X_test)
        
        # 计算各种评估指标
        metrics = {
            "accuracy": accuracy_score(y_test, y_pred),
            "precision": precision_score(y_test, y_pred),
            "recall": recall_score(y_test, y_pred),
            "f1": f1_score(y_test, y_pred),
            "roc_auc": roc_auc_score(y_test, y_pred_proba),
            "avg_precision": average_precision_score(y_test, y_pred_proba)
        }
        
        evaluation_results[name] = metrics
        
        logger.info(f"模型 {name} 评估结果:")
        for metric_name, value in metrics.items():
            logger.info(f"  {metric_name}: {value:.4f}")
    
    return evaluation_results


def optimize_best_model(
    X_train: pd.DataFrame, y_train: pd.Series,
    X_test: pd.DataFrame, y_test: pd.Series,
    best_model_name: str, config: Dict[str, Any]
) -> Any:
    """
    对最佳模型进行超参数优化

    Args:
        X_train: 训练特征
        y_train: 训练标签
        X_test: 测试特征
        y_test: 测试标签
        best_model_name: 最佳模型名称
        config: 配置参数

    Returns:
        优化后的最佳模型
    """
    logger.info(f"对最佳模型 {best_model_name} 进行超参数优化")
    
    if best_model_name == "logistic_regression":
        model = LogisticRegression()
        param_grid = config["hyperparameters"]["logistic_regression"]
    elif best_model_name == "random_forest":
        model = RandomForestClassifier()
        param_grid = config["hyperparameters"]["random_forest"]
    elif best_model_name == "gradient_boosting":
        model = GradientBoostingClassifier()
        param_grid = config["hyperparameters"]["gradient_boosting"]
    elif best_model_name == "xgboost":
        model = xgb.XGBClassifier()
        param_grid = config["hyperparameters"]["xgboost"]
    elif best_model_name == "lightgbm":
        model = lgb.LGBMClassifier()
        param_grid = config["hyperparameters"]["lightgbm"]
    else:
        raise ValueError(f"不支持的模型类型: {best_model_name}")
    
    # 使用随机搜索进行超参数优化
    search_method = config.get("hyperparameter_search", {}).get("method", "random")
    n_iter = config.get("hyperparameter_search", {}).get("n_iter", 10)
    cv = config.get("hyperparameter_search", {}).get("cv", 5)
    
    if search_method == "grid":
        logger.info("使用网格搜索进行超参数优化")
        search = GridSearchCV(
            model, param_grid, cv=cv, scoring="roc_auc",
            verbose=1, n_jobs=-1, return_train_score=True
        )
    else:
        logger.info("使用随机搜索进行超参数优化")
        search = RandomizedSearchCV(
            model, param_grid, n_iter=n_iter, cv=cv, scoring="roc_auc",
            verbose=1, n_jobs=-1, random_state=42, return_train_score=True
        )
    
    # 开始搜索
    search.fit(X_train, y_train)
    
    logger.info(f"最佳参数: {search.best_params_}")
    logger.info(f"最佳交叉验证得分: {search.best_score_:.4f}")
    
    # 使用最佳参数重新训练模型
    best_model = search.best_estimator_
    best_model.fit(X_train, y_train)
    
    # 在测试集上评估优化后的模型
    y_pred = best_model.predict(X_test)
    y_pred_proba = best_model.predict_proba(X_test)[:, 1]
    
    optimized_metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_pred_proba),
        "avg_precision": average_precision_score(y_test, y_pred_proba)
    }
    
    logger.info("优化后的模型评估结果:")
    for metric_name, value in optimized_metrics.items():
        logger.info(f"  {metric_name}: {value:.4f}")
    
    return best_model


def save_model(model: Any, model_name: str, output_dir: str = MODELS_DIR) -> str:
    """
    保存训练好的模型

    Args:
        model: 训练好的模型
        model_name: 模型名称
        output_dir: 输出目录

    Returns:
        模型保存路径
    """
    # 确保模型目录存在
    os.makedirs(output_dir, exist_ok=True)
    
    # 创建时间戳
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    model_filename = f"{model_name}_{timestamp}.pkl"
    model_path = os.path.join(output_dir, model_filename)
    
    # 保存模型
    logger.info(f"保存模型到 {model_path}")
    joblib.dump(model, model_path)
    
    return model_path


def log_to_mlflow(
    model: Any, model_name: str, 
    metrics: Dict[str, float], 
    params: Dict[str, Any],
    experiment_name: str = "保险续保预测"
) -> None:
    """
    将模型及其性能记录到MLflow

    Args:
        model: 训练好的模型
        model_name: 模型名称
        metrics: 评估指标
        params: 模型参数
        experiment_name: MLflow实验名称
    """
    # 设置MLflow实验
    mlflow.set_experiment(experiment_name)
    
    # 开始一个新的MLflow运行
    with mlflow.start_run(run_name=f"{model_name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"):
        # 记录参数
        for key, value in params.items():
            mlflow.log_param(key, value)
        
        # 记录指标
        for metric_name, value in metrics.items():
            mlflow.log_metric(metric_name, value)
        
        # 记录模型
        if model_name in ["random_forest", "gradient_boosting", "logistic_regression"]:
            mlflow.sklearn.log_model(model, model_name)
        elif model_name == "xgboost":
            mlflow.xgboost.log_model(model, model_name)
        elif model_name == "lightgbm":
            mlflow.lightgbm.log_model(model, model_name)
        
        logger.info(f"已将模型 {model_name} 记录到MLflow")


def load_config(config_path: str) -> Dict[str, Any]:
    """
    加载配置文件

    Args:
        config_path: 配置文件路径

    Returns:
        配置参数字典
    """
    logger.info(f"从 {config_path} 加载配置")
    
    try:
        with open(config_path, "r") as file:
            config = yaml.safe_load(file)
        return config
    except Exception as e:
        logger.error(f"加载配置失败: {str(e)}")
        raise


def plot_model_comparison(evaluation_results: Dict[str, Dict[str, float]], output_dir: str = None) -> None:
    """
    绘制模型比较图

    Args:
        evaluation_results: 模型评估结果
        output_dir: 输出目录
    """
    # 提取指标和模型名称
    metrics = ["accuracy", "precision", "recall", "f1", "roc_auc", "avg_precision"]
    models = list(evaluation_results.keys())
    
    # 创建图形
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # 设置宽度和位置
    width = 0.1
    x = np.arange(len(metrics))
    
    # 为每个模型绘制柱状图
    for i, model_name in enumerate(models):
        values = [evaluation_results[model_name][metric] for metric in metrics]
        ax.bar(x + i * width, values, width, label=model_name)
    
    # 设置图形属性
    ax.set_ylabel("得分")
    ax.set_title("模型性能比较")
    ax.set_xticks(x + width * (len(models) - 1) / 2)
    ax.set_xticklabels(metrics)
    ax.legend()
    
    plt.tight_layout()
    
    # 保存图形
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
        plt.savefig(os.path.join(output_dir, "model_comparison.png"))
    
    plt.close()


def find_best_model(evaluation_results: Dict[str, Dict[str, float]], metric: str = "roc_auc") -> str:
    """
    根据指定指标找出最佳模型

    Args:
        evaluation_results: 模型评估结果
        metric: 用于比较的指标

    Returns:
        最佳模型名称
    """
    model_scores = {name: results[metric] for name, results in evaluation_results.items()}
    best_model = max(model_scores.items(), key=lambda x: x[1])
    logger.info(f"最佳模型（基于 {metric}）: {best_model[0]} with score {best_model[1]:.4f}")
    return best_model[0]


def main(config_path: str):
    """
    主函数：执行完整的模型训练和评估流程

    Args:
        config_path: 配置文件路径
    """
    # 记录起始时间
    start_time = datetime.now()
    logger.info(f"开始模型训练流程，时间: {start_time}")
    
    # 加载配置
    config = load_config(config_path)
    
    # 加载数据
    X_train, X_test, y_train, y_test = load_processed_data()
    
    # 训练多个模型
    models = train_models(X_train, y_train, config)
    
    # 评估模型
    evaluation_results = evaluate_models(models, X_test, y_test)
    
    # 绘制模型比较图
    plot_model_comparison(evaluation_results, os.path.join(PROJECT_ROOT, "reports/figures"))
    
    # 找出最佳模型
    best_model_name = find_best_model(evaluation_results, config.get("best_model_metric", "roc_auc"))
    
    # 优化最佳模型
    optimized_model = optimize_best_model(
        X_train, y_train, X_test, y_test, best_model_name, config
    )
    
    # 评估优化后的模型
    y_pred = optimized_model.predict(X_test)
    y_pred_proba = optimized_model.predict_proba(X_test)[:, 1]
    
    optimized_metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_pred_proba),
        "avg_precision": average_precision_score(y_test, y_pred_proba)
    }
    
    # 保存最佳模型
    model_path = save_model(optimized_model, f"optimized_{best_model_name}")
    
    # 记录到MLflow
    if config.get("use_mlflow", False):
        log_to_mlflow(
            optimized_model, best_model_name,
            optimized_metrics,
            optimized_model.get_params()
        )
    
    # 记录完成时间和总耗时
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"模型训练流程完成，耗时: {duration}")
    logger.info(f"最佳优化模型已保存到 {model_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="训练保险续保预测模型")
    parser.add_argument(
        "--config", dest="config_path", type=str,
        default=os.path.join(PROJECT_ROOT, "configs/default.yaml"),
        help="配置文件路径"
    )
    
    args = parser.parse_args()
    main(args.config_path) 