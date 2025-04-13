"""
保险客户续保预测系统 - 探索性数据分析(EDA)

该脚本对保险客户数据进行探索性分析，包括：
1. 数据概览
2. 缺失值分析
3. 数据分布分析
4. 相关性分析
5. 目标变量分析
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import sys
import traceback
from datetime import datetime
import io  # 导入正确的io模块

print("="*50)
print("开始执行EDA分析")
print("="*50)

# 设置中文字体支持
try:
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
    plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
    print("已设置中文字体支持")
except Exception as e:
    print(f"设置字体时出错: {str(e)}")

# 获取项目根目录
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# 添加项目根目录到系统路径
sys.path.append(project_root)

# 构建文件路径
file_path = os.path.join(project_root, 'data', 'raw', 'policy_data.xlsx')
print(f"数据文件路径: {file_path}")
print(f"文件是否存在: {os.path.exists(file_path)}")

# 创建图表保存目录
figures_dir = os.path.join(project_root, 'reports', 'figures')
os.makedirs(figures_dir, exist_ok=True)
print(f"图表保存目录: {figures_dir}")

# 生成当前时间戳，用于图表文件名
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

def save_fig(fig, name):
    """保存图表到指定目录"""
    filename = f"{name}_{timestamp}.png"
    fig.savefig(os.path.join(figures_dir, filename), bbox_inches='tight', dpi=300)
    plt.close(fig)
    print(f"已保存图表: {filename}")

try:
    # 读取Excel文件
    print(f"正在读取数据: {file_path}")
    df = pd.read_excel(file_path)
    print(f"成功读取数据，形状: {df.shape}")
    
    #==========================================================
    # 1. 数据概览
    #==========================================================
    print("\n=== 数据概览 ===")
    print(f"数据形状: {df.shape[0]}行, {df.shape[1]}列")
    print("\n前5行数据:")
    print(df.head())
    
    print("\n数据类型信息:")
    buffer = io.StringIO()  # 使用正确的io.StringIO
    df.info(buf=buffer)
    print(buffer.getvalue())
    
    print("\n数值型数据统计描述:")
    print(df.describe())
    
    print("\n分类变量统计描述:")
    categorical_columns = df.select_dtypes(include=['object']).columns  # 修改为仅包含object类型
    for col in categorical_columns:
        print(f"\n{col}的值计数:")
        print(df[col].value_counts())
    
    #==========================================================
    # 2. 缺失值分析
    #==========================================================
    print("\n=== 缺失值分析 ===")
    missing_data = pd.DataFrame({
        '缺失值数量': df.isnull().sum(),
        '缺失比例': df.isnull().sum() / len(df) * 100
    }).sort_values('缺失比例', ascending=False)
    print(missing_data[missing_data['缺失值数量'] > 0])
    
    # 可视化缺失值
    if missing_data['缺失值数量'].sum() > 0:
        print("正在生成缺失值图表...")
        plt.figure(figsize=(10, 6))
        plt.title('缺失值比例')
        missing_cols = missing_data.index[missing_data['缺失值数量'] > 0]
        if len(missing_cols) > 0:
            sns.barplot(x=missing_cols, 
                        y=missing_data['缺失比例'][missing_data['缺失值数量'] > 0])
            plt.xticks(rotation=90)
            plt.tight_layout()
            save_fig(plt.gcf(), "missing_values")
        else:
            print("数据中没有缺失值")
    else:
        print("数据中没有缺失值")
    
    #==========================================================
    # 3. 数据分布分析
    #==========================================================
    print("\n=== 数据分布分析 ===")
    
    # 数值型特征分布
    numeric_columns = df.select_dtypes(include=['int64', 'float64']).columns
    print(f"数值型特征: {list(numeric_columns)}")
    
    # 直方图
    if len(numeric_columns) > 0:
        print("正在生成数值特征直方图...")
        for i, col in enumerate(numeric_columns):
            if i % 3 == 0:
                n_cols = min(3, len(numeric_columns) - i)
                fig, axes = plt.subplots(1, n_cols, figsize=(15, 5))
                if n_cols == 1:
                    axes = [axes]  # 保证axes总是列表
            
            ax_idx = i % 3
            try:
                sns.histplot(df[col], kde=True, ax=axes[ax_idx])
                axes[ax_idx].set_title(f'{col}分布')
            except Exception as e:
                print(f"生成 {col} 直方图时出错: {str(e)}")
            
            if i % 3 == 2 or i == len(numeric_columns) - 1:
                plt.tight_layout()
                save_fig(plt.gcf(), f"numeric_dist_{i//3}")
        
        # 箱线图
        print("正在生成数值特征箱线图...")
        plt.figure(figsize=(15, 10))
        for i, col in enumerate(numeric_columns):
            plt.subplot(len(numeric_columns), 1, i+1)
            try:
                sns.boxplot(x=df[col])
                plt.title(f'{col}箱线图')
            except Exception as e:
                print(f"生成 {col} 箱线图时出错: {str(e)}")
        plt.tight_layout()
        save_fig(plt.gcf(), "numeric_boxplots")
    else:
        print("没有找到数值型特征")
    
    # 分类特征分布
    if len(categorical_columns) > 0:
        print("正在生成分类特征分布图...")
        for col in categorical_columns:
            plt.figure(figsize=(10, 6))
            try:
                if df[col].nunique() <= 30:  # 限制类别数量
                    sns.countplot(y=df[col], order=df[col].value_counts().index)
                    plt.title(f'{col}分布')
                    plt.tight_layout()
                    save_fig(plt.gcf(), f"categorical_{col}")
                else:
                    print(f"跳过 {col}，因为它有 {df[col].nunique()} 个不同值，太多了")
            except Exception as e:
                print(f"生成 {col} 分布图时出错: {str(e)}")
    else:
        print("没有找到分类特征")
    
    #==========================================================
    # 4. 相关性分析
    #==========================================================
    print("\n=== 相关性分析 ===")
    
    # 计算数值变量之间的相关性
    if len(numeric_columns) > 1:
        corr = df[numeric_columns].corr()
        print("\n相关系数矩阵:")
        print(corr)
        
        # 热图可视化相关性
        print("正在生成相关性热图...")
        plt.figure(figsize=(12, 10))
        sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
        plt.title('特征相关性热图')
        plt.tight_layout()
        save_fig(plt.gcf(), "correlation_heatmap")
    else:
        print("没有足够的数值特征进行相关性分析")
    
    #==========================================================
    # 5. 目标变量分析
    #==========================================================
    print("\n=== 目标变量分析 ===")
    
    # 假设目标变量是'renewal'
    target_col = 'renewal'
    
    if target_col in df.columns:
        print(f"目标变量 '{target_col}' 已找到")
        
        # 目标变量分布
        print("正在生成目标变量分布图...")
        plt.figure(figsize=(8, 5))
        sns.countplot(x=df[target_col])
        plt.title('续保分布')
        save_fig(plt.gcf(), "renewal_distribution")
        
        # 数值特征与目标变量的关系
        if len(numeric_columns) > 0:
            print("正在生成数值特征与目标变量关系图...")
            for col in numeric_columns:
                if col != target_col:
                    plt.figure(figsize=(10, 6))
                    try:
                        sns.boxplot(x=df[target_col], y=df[col])
                        plt.title(f'{col}与续保关系')
                        save_fig(plt.gcf(), f"target_vs_{col}")
                    except Exception as e:
                        print(f"生成 {col} 与目标变量关系图时出错: {str(e)}")
        
        # 分类特征与目标变量的关系
        if len(categorical_columns) > 0:
            print("正在生成分类特征与目标变量关系图...")
            for col in categorical_columns:
                if col != target_col:
                    try:
                        if df[col].nunique() <= 15:  # 限制类别数量
                            plt.figure(figsize=(12, 8))
                            
                            # 创建交叉表
                            cross_tab = pd.crosstab(df[col], df[target_col], normalize='index') * 100
                            
                            # 绘制堆叠条形图
                            cross_tab.plot(kind='bar', stacked=True)
                            plt.title(f'{col}与续保关系')
                            plt.ylabel('百分比 (%)')
                            plt.tight_layout()
                            save_fig(plt.gcf(), f"categorical_{col}_vs_target")
                        else:
                            print(f"跳过 {col} 与目标变量关系图，因为它有 {df[col].nunique()} 个不同值，太多了")
                    except Exception as e:
                        print(f"生成 {col} 与目标变量关系图时出错: {str(e)}")
    else:
        print(f"未找到目标变量 '{target_col}'")
    
    print(f"\n分析完成! 图表已保存至 {figures_dir} 目录")

except FileNotFoundError:
    print(f'文件不存在: {file_path}')
except Exception as e:
    print(f'分析过程中出错: {str(e)}')
    print("详细错误信息:")
    traceback.print_exc()

print("\n" + "="*50)
print("EDA分析执行完毕")
print("="*50) 