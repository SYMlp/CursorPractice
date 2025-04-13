"""
保险客户续保预测系统 - 逻辑回归模型

本脚本使用逻辑回归模型预测客户是否会续保，并对模型系数进行可视化分析。

步骤：
1. 数据准备与预处理
2. 构建逻辑回归模型
3. 评估模型性能
4. 可视化模型系数（区分正负系数）
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import sys
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve, accuracy_score
from sklearn.impute import SimpleImputer
import traceback

# 设置中文字体支持
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号

print("="*50)
print("开始构建逻辑回归模型")
print("="*50)

# 获取项目根目录
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# 添加项目根目录到系统路径
sys.path.append(project_root)

# 构建文件路径
file_path = os.path.join(project_root, 'data', 'raw', 'policy_data.xlsx')
print(f"数据文件路径: {file_path}")

# 创建图表保存目录
figures_dir = os.path.join(project_root, 'reports', 'figures')
models_dir = os.path.join(project_root, 'models')
os.makedirs(figures_dir, exist_ok=True)
os.makedirs(models_dir, exist_ok=True)
print(f"图表保存目录: {figures_dir}")
print(f"模型保存目录: {models_dir}")

# 生成当前时间戳，用于图表和模型文件名
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

def save_fig(fig, name):
    """保存图表到指定目录"""
    filename = f"{name}_{timestamp}.png"
    fig.savefig(os.path.join(figures_dir, filename), bbox_inches='tight', dpi=300)
    plt.close(fig)
    print(f"已保存图表: {filename}")

try:
    # 1. 数据准备与预处理
    print("\n=== 数据准备与预处理 ===")

    # 读取数据
    print(f"正在读取数据: {file_path}")
    df = pd.read_excel(file_path)
    print(f"成功读取数据，形状: {df.shape}")
    
    # 查看前几行数据
    print("\n数据预览：")
    print(df.head())
    
    # 检查目标变量
    print("\n目标变量分布：")
    print(df['renewal'].value_counts())
    
    # 编码目标变量 (Yes -> 1, No -> 0)
    df['renewal_encoded'] = df['renewal'].map({'Yes': 1, 'No': 0})
    print("\n编码后的目标变量：")
    print(df['renewal_encoded'].value_counts())
    
    # 识别分类特征和数值特征
    cat_features = df.select_dtypes(include=['object']).columns.tolist()
    
    # 确保'renewal'在cat_features中才移除
    if 'renewal' in cat_features:
        cat_features.remove('renewal')  # 移除目标变量
        
    num_features = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
    
    # 确保'renewal_encoded'不在num_features中
    if 'renewal_encoded' in num_features:
        num_features.remove('renewal_encoded')
        
    date_features = df.select_dtypes(include=['datetime64']).columns.tolist()
    
    print(f"\n分类特征: {cat_features}")
    print(f"数值特征: {num_features}")
    print(f"日期特征: {date_features}")
    
    # 处理日期特征：提取年份和月份
    for date_col in date_features:
        df[f'{date_col}_year'] = df[date_col].dt.year
        df[f'{date_col}_month'] = df[date_col].dt.month
    
    # 更新特征列表
    date_derived_features = []
    for date_col in date_features:
        date_derived_features.append(f'{date_col}_year')
        date_derived_features.append(f'{date_col}_month')
    
    # 将新创建的日期特征添加到数值特征列表
    num_features.extend(date_derived_features)
    
    # 准备特征和目标变量，排除原始日期特征和目标变量
    X = df.drop(['renewal', 'renewal_encoded'] + date_features, axis=1)
    y = df['renewal_encoded']
    
    print(f"\nX形状: {X.shape}, 特征列: {X.columns.tolist()}")
    
    # 分割训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    print(f"\n训练集大小: {X_train.shape}, 测试集大小: {X_test.shape}")
    
    # 再次确认分类特征和数值特征存在于X中
    valid_cat_features = [col for col in cat_features if col in X.columns]
    valid_num_features = [col for col in num_features if col in X.columns]
    
    print(f"\n有效分类特征: {valid_cat_features}")
    print(f"有效数值特征: {valid_num_features}")
    
    # 创建预处理管道
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    
    # 检查是否有有效特征
    if valid_num_features or valid_cat_features:
        transformers = []
        
        if valid_num_features:
            transformers.append(('num', numeric_transformer, valid_num_features))
        
        if valid_cat_features:
            transformers.append(('cat', categorical_transformer, valid_cat_features))
        
        preprocessor = ColumnTransformer(transformers=transformers)
        
        # 2. 构建逻辑回归模型
        print("\n=== 构建逻辑回归模型 ===")
        
        # 创建完整的模型管道
        model = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('classifier', LogisticRegression(max_iter=1000, random_state=42, C=1.0))
        ])
        
        # 训练模型
        print("训练模型中...")
        model.fit(X_train, y_train)
        print("模型训练完成")
        
        # 保存模型
        model_filename = f"logistic_regression_model_{timestamp}.pkl"
        import joblib
        joblib.dump(model, os.path.join(models_dir, model_filename))
        print(f"模型已保存至: {os.path.join(models_dir, model_filename)}")
        
        # 3. 评估模型性能
        print("\n=== 评估模型性能 ===")
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        
        # 计算准确率
        accuracy = accuracy_score(y_test, y_pred)
        print(f"准确率: {accuracy:.4f}")
        
        # 打印分类报告
        print("\n分类报告:")
        print(classification_report(y_test, y_pred))
        
        # 计算ROC AUC
        roc_auc = roc_auc_score(y_test, y_pred_proba)
        print(f"ROC AUC: {roc_auc:.4f}")
        
        # 绘制混淆矩阵
        plt.figure(figsize=(8, 6))
        cm = confusion_matrix(y_test, y_pred)
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
        plt.title('混淆矩阵')
        plt.xlabel('预测标签')
        plt.ylabel('真实标签')
        save_fig(plt.gcf(), "confusion_matrix")
        
        # 绘制ROC曲线
        plt.figure(figsize=(8, 6))
        fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
        plt.plot(fpr, tpr, label=f'ROC曲线 (AUC = {roc_auc:.4f})')
        plt.plot([0, 1], [0, 1], 'k--')
        plt.xlabel('假阳性率')
        plt.ylabel('真阳性率')
        plt.title('ROC曲线')
        plt.legend(loc='lower right')
        save_fig(plt.gcf(), "roc_curve")
        
        # 4. 可视化模型系数（区分正负系数）
        print("\n=== 可视化模型系数 ===")
        
        # 获取预处理后的特征名称
        feature_names = []
        
        # 获取数值特征名称
        if valid_num_features:
            feature_names.extend(valid_num_features)
        
        # 获取OneHot编码后的分类特征名称
        if valid_cat_features:
            # 处理分类特征
            cat_encoder = model.named_steps['preprocessor'].transformers_[1][1].named_steps['onehot']
            cat_feature_names = cat_encoder.get_feature_names_out(valid_cat_features)
            feature_names.extend(cat_feature_names)
        
        # 获取逻辑回归系数
        coef = model.named_steps['classifier'].coef_[0]
        
        # 确保特征名称和系数长度匹配
        if len(feature_names) == len(coef):
            # 创建系数DataFrame
            coef_df = pd.DataFrame({
                'Feature': feature_names,
                'Coefficient': coef
            })
            
            # 按系数绝对值排序
            coef_df = coef_df.reindex(coef_df['Coefficient'].abs().sort_values(ascending=False).index)
            
            # 取前20个系数进行可视化
            top_n = min(20, len(coef_df))
            top_coef_df = coef_df.head(top_n)
            
            # 创建颜色映射，正系数用蓝色，负系数用红色
            colors = ['red' if c < 0 else 'blue' for c in top_coef_df['Coefficient']]
            
            # 绘制系数条形图
            plt.figure(figsize=(12, 10))
            bars = plt.barh(top_coef_df['Feature'], top_coef_df['Coefficient'], color=colors)
            plt.xlabel('系数值')
            plt.ylabel('特征')
            plt.title('逻辑回归模型系数（前20个）- 蓝色为正影响，红色为负影响')
            plt.grid(axis='x', linestyle='--', alpha=0.6)
            
            # 在条形上添加数值标签
            for bar in bars:
                width = bar.get_width()
                label_x_pos = width if width > 0 else width - 0.1
                plt.text(label_x_pos, bar.get_y() + bar.get_height()/2, 
                         f'{width:.3f}', va='center')
            
            plt.tight_layout()
            save_fig(plt.gcf(), "logistic_regression_coefficients")
            
            # 全部系数可视化（正负分开）
            plt.figure(figsize=(16, 20))
            
            # 正系数
            positive_coef = coef_df[coef_df['Coefficient'] > 0].sort_values('Coefficient', ascending=True)
            if len(positive_coef) > 0:
                plt.subplot(1, 2, 1)
                pos_bars = plt.barh(positive_coef['Feature'].tail(min(20, len(positive_coef))), 
                        positive_coef['Coefficient'].tail(min(20, len(positive_coef))), 
                        color='blue')
                        
                # 添加数值标签
                for bar in pos_bars:
                    width = bar.get_width()
                    plt.text(width + 0.01, bar.get_y() + bar.get_height()/2, 
                             f'{width:.3f}', va='center')
                
                plt.xlabel('系数值')
                plt.ylabel('特征')
                plt.title('正影响因素（促进续保）')
                plt.grid(axis='x', linestyle='--', alpha=0.6)
            
            # 负系数
            negative_coef = coef_df[coef_df['Coefficient'] < 0].sort_values('Coefficient')
            if len(negative_coef) > 0:
                plt.subplot(1, 2, 2)
                neg_bars = plt.barh(negative_coef['Feature'].head(min(20, len(negative_coef))), 
                        negative_coef['Coefficient'].head(min(20, len(negative_coef))), 
                        color='red')
                        
                # 添加数值标签
                for bar in neg_bars:
                    width = bar.get_width()
                    plt.text(width - 0.05, bar.get_y() + bar.get_height()/2, 
                             f'{width:.3f}', va='center')
                
                plt.xlabel('系数值')
                plt.ylabel('特征')
                plt.title('负影响因素（阻碍续保）')
                plt.grid(axis='x', linestyle='--', alpha=0.6)
            
            plt.tight_layout()
            save_fig(plt.gcf(), "logistic_regression_pos_neg_coefficients")
            
            print("\n系数分析完成！")
            print(f"正系数（促进续保）数量: {len(positive_coef)}")
            print(f"负系数（阻碍续保）数量: {len(negative_coef)}")
            
            # 输出前5个最重要的正负系数
            print("\n最重要的正面影响因素（前5个）:")
            if len(positive_coef) > 0:
                for _, row in positive_coef.tail(min(5, len(positive_coef))).iloc[::-1].iterrows():
                    print(f"{row['Feature']}: {row['Coefficient']:.4f}")
            
            print("\n最重要的负面影响因素（前5个）:")
            if len(negative_coef) > 0:
                for _, row in negative_coef.head(min(5, len(negative_coef))).iterrows():
                    print(f"{row['Feature']}: {row['Coefficient']:.4f}")
        else:
            print(f"错误: 特征名称数量 ({len(feature_names)}) 与系数数量 ({len(coef)}) 不匹配")
    else:
        print("错误: 没有有效的特征可用于训练模型")
    
except FileNotFoundError:
    print(f"文件不存在: {file_path}")
except Exception as e:
    print(f"处理过程中出错: {str(e)}")
    traceback.print_exc()

print("\n" + "="*50)
print("逻辑回归模型构建完成")
print("="*50) 