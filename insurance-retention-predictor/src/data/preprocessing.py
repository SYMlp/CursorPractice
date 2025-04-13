"""
数据预处理模块

该模块负责原始保险数据的预处理，包括：
- 加载数据
- 数据清洗（处理缺失值、异常值）
- 数据转换（编码分类变量、标准化/归一化数值变量）
- 划分训练集和测试集
- 保存处理后的数据
"""

import os
import logging
from typing import Tuple, Dict, Any

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

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

# 数据路径
RAW_DATA_PATH = os.path.join(PROJECT_ROOT, "data/raw/insurance_data.csv")
PROCESSED_DATA_DIR = os.path.join(PROJECT_ROOT, "data/processed")


def load_data(file_path: str = RAW_DATA_PATH) -> pd.DataFrame:
    """
    加载原始保险数据

    Args:
        file_path: 原始数据文件路径

    Returns:
        加载的数据DataFrame
    """
    logger.info(f"从 {file_path} 加载数据")
    
    try:
        df = pd.read_csv(file_path)
        logger.info(f"成功加载数据：{df.shape[0]} 行, {df.shape[1]} 列")
        return df
    except Exception as e:
        logger.error(f"加载数据失败: {str(e)}")
        raise


def explore_data(df: pd.DataFrame) -> Dict[str, Any]:
    """
    探索数据基本信息

    Args:
        df: 原始数据DataFrame

    Returns:
        包含数据统计信息的字典
    """
    logger.info("开始数据探索")
    
    stats = {
        "shape": df.shape,
        "columns": list(df.columns),
        "dtypes": df.dtypes.to_dict(),
        "missing_values": df.isnull().sum().to_dict(),
        "numerical_stats": df.describe().to_dict(),
    }
    
    # 检查目标变量分布
    if "Renewed" in df.columns:
        stats["target_distribution"] = df["Renewed"].value_counts().to_dict()
        renewal_rate = df["Renewed"].mean() * 100
        logger.info(f"续保率: {renewal_rate:.2f}%")
    
    return stats


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    清洗数据：处理缺失值、异常值等

    Args:
        df: 原始数据DataFrame

    Returns:
        清洗后的DataFrame
    """
    logger.info("开始数据清洗")
    
    # 创建数据副本
    df_clean = df.copy()
    
    # 记录原始数据形状
    original_shape = df_clean.shape
    logger.info(f"原始数据形状: {original_shape}")
    
    # 删除全为空的行
    df_clean = df_clean.dropna(how="all")
    
    # 删除重复行
    df_clean = df_clean.drop_duplicates()
    logger.info(f"删除空行和重复行后数据形状: {df_clean.shape}")
    
    # 处理异常值（示例：将超过3个标准差的数值替换为截断值）
    numeric_cols = df_clean.select_dtypes(include=["int64", "float64"]).columns
    for col in numeric_cols:
        if col == "CustomerID" or col == "Renewed":  # 跳过ID和目标变量
            continue
            
        mean = df_clean[col].mean()
        std = df_clean[col].std()
        lower_bound = mean - 3 * std
        upper_bound = mean + 3 * std
        
        # 记录异常值数量
        outliers = ((df_clean[col] < lower_bound) | (df_clean[col] > upper_bound)).sum()
        if outliers > 0:
            logger.info(f"列 {col} 中发现 {outliers} 个异常值")
            
            # 截断异常值
            df_clean[col] = np.where(
                df_clean[col] < lower_bound,
                lower_bound,
                np.where(df_clean[col] > upper_bound, upper_bound, df_clean[col])
            )
    
    # 处理缺失值会在后续转换步骤中进行
    
    return df_clean


def get_feature_names(column_transformer):
    """获取ColumnTransformer转换后的特征名称"""
    feature_names = []
    for i, transformer_info in enumerate(column_transformer.transformers_):
        if transformer_info[0] != 'remainder':
            if hasattr(transformer_info[1], 'get_feature_names_out'):
                feature_names.extend(transformer_info[1].get_feature_names_out())
            else:
                feature_names.extend(transformer_info[2])
    return feature_names


def preprocess_data(df: pd.DataFrame, test_size: float = 0.2, random_state: int = 42) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """
    预处理数据：特征转换、编码、缩放并划分训练集和测试集

    Args:
        df: 清洗后的DataFrame
        test_size: 测试集比例
        random_state: 随机种子

    Returns:
        训练特征、测试特征、训练标签、测试标签
    """
    logger.info("开始数据预处理")
    
    if "Renewed" not in df.columns:
        raise ValueError("数据中缺少目标变量'Renewed'")
    
    # 分离特征和目标变量
    X = df.drop(columns=["Renewed", "CustomerID"])
    y = df["Renewed"]
    
    # 识别列类型
    numerical_features = X.select_dtypes(include=["int64", "float64"]).columns.tolist()
    categorical_features = X.select_dtypes(include=["object", "category"]).columns.tolist()
    
    logger.info(f"数值特征: {len(numerical_features)}, 分类特征: {len(categorical_features)}")
    
    # 创建预处理管道
    numerical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])
    
    categorical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numerical_transformer, numerical_features),
            ("cat", categorical_transformer, categorical_features)
        ]
    )
    
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )
    
    logger.info(f"训练集大小: {X_train.shape}, 测试集大小: {X_test.shape}")
    
    # 应用预处理
    X_train_transformed = preprocessor.fit_transform(X_train)
    X_test_transformed = preprocessor.transform(X_test)
    
    # 获取转换后的特征名称
    feature_names = get_feature_names(preprocessor)
    
    # 转换为DataFrame以保留特征名称
    X_train_processed = pd.DataFrame(X_train_transformed, columns=feature_names)
    X_test_processed = pd.DataFrame(X_test_transformed, columns=feature_names)
    
    return X_train_processed, X_test_processed, y_train, y_test, preprocessor


def save_processed_data(
    X_train: pd.DataFrame, X_test: pd.DataFrame, 
    y_train: pd.Series, y_test: pd.Series,
    preprocessor: ColumnTransformer,
    output_dir: str = PROCESSED_DATA_DIR
) -> None:
    """
    保存处理后的数据和预处理器

    Args:
        X_train: 训练特征
        X_test: 测试特征
        y_train: 训练标签
        y_test: 测试标签
        preprocessor: 列转换器
        output_dir: 输出目录
    """
    logger.info(f"保存处理后的数据到 {output_dir}")
    
    # 确保输出目录存在
    os.makedirs(output_dir, exist_ok=True)
    
    # 保存处理后的数据
    X_train.to_csv(os.path.join(output_dir, "X_train.csv"), index=False)
    X_test.to_csv(os.path.join(output_dir, "X_test.csv"), index=False)
    y_train.to_csv(os.path.join(output_dir, "y_train.csv"), index=False)
    y_test.to_csv(os.path.join(output_dir, "y_test.csv"), index=False)
    
    # 使用joblib保存预处理器
    import joblib
    joblib.dump(preprocessor, os.path.join(output_dir, "preprocessor.pkl"))
    
    logger.info("处理后的数据和预处理器保存完成")


def main():
    """主函数：执行完整的数据预处理流程"""
    logger.info("开始保险数据预处理流程")
    
    # 检查原始数据文件是否存在
    if not os.path.exists(RAW_DATA_PATH):
        logger.error(f"原始数据文件不存在: {RAW_DATA_PATH}")
        return
    
    # 加载数据
    df = load_data()
    
    # 探索数据
    stats = explore_data(df)
    logger.info(f"数据包含 {stats['shape'][0]} 行和 {stats['shape'][1]} 列")
    
    # 清洗数据
    df_clean = clean_data(df)
    
    # 预处理数据
    X_train, X_test, y_train, y_test, preprocessor = preprocess_data(df_clean)
    
    # 保存处理后的数据
    save_processed_data(X_train, X_test, y_train, y_test, preprocessor)
    
    logger.info("数据预处理流程完成")


if __name__ == "__main__":
    main() 