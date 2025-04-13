# 数据可视化模块

数据可视化模块负责生成直观的图表和报告，用于数据探索、特征分析、模型性能评估和结果展示，帮助团队理解客户续保行为并为业务决策提供支持。

## 功能说明

该模块提供以下核心功能：

1. **探索性数据分析**: 生成可视化图表以了解数据分布和关系
2. **特征洞察**: 可视化特征重要性和相关性
3. **模型评估**: 展示模型性能和比较不同模型
4. **结果展示**: 创建用于业务展示的图表和仪表板

## 模块组件

### exploratory.py

```python
def plot_feature_distributions(df: pd.DataFrame, features: List[str] = None) -> None:
    """
    绘制特征分布图
    
    Args:
        df: 输入DataFrame
        features: 要可视化的特征列表，默认为None(所有数值型特征)
    """
    
def plot_correlation_matrix(df: pd.DataFrame, method: str = 'pearson') -> plt.Figure:
    """
    绘制特征相关性矩阵热图
    
    Args:
        df: 输入DataFrame
        method: 相关系数计算方法
        
    Returns:
        matplotlib图形对象
    """
    
def plot_target_vs_feature(df: pd.DataFrame, target: str, features: List[str]) -> None:
    """
    绘制目标变量与特征之间的关系图
    
    Args:
        df: 输入DataFrame
        target: 目标变量列名
        features: 特征列表
    """
```

### model_viz.py

```python
def plot_roc_curve(y_true: np.ndarray, y_prob: np.ndarray, model_name: str = 'Model') -> plt.Figure:
    """
    绘制ROC曲线
    
    Args:
        y_true: 真实标签
        y_prob: 预测概率
        model_name: 模型名称
        
    Returns:
        matplotlib图形对象
    """
    
def plot_confusion_matrix(y_true: np.ndarray, y_pred: np.ndarray, labels: List[str] = None) -> plt.Figure:
    """
    绘制混淆矩阵
    
    Args:
        y_true: 真实标签
        y_pred: 预测标签
        labels: 类别标签
        
    Returns:
        matplotlib图形对象
    """
    
def plot_feature_importance(importance_df: pd.DataFrame, top_n: int = 20) -> plt.Figure:
    """
    绘制特征重要性条形图
    
    Args:
        importance_df: 特征重要性DataFrame
        top_n: 展示前n个特征
        
    Returns:
        matplotlib图形对象
    """
    
def plot_model_comparison(models_metrics: Dict[str, Dict]) -> plt.Figure:
    """
    比较多个模型的性能
    
    Args:
        models_metrics: 包含多个模型评估指标的字典
        
    Returns:
        matplotlib图形对象
    """
```

### business_viz.py

```python
def create_retention_dashboard(predictions: pd.DataFrame, actual: pd.DataFrame = None) -> None:
    """
    创建客户续保预测仪表板
    
    Args:
        predictions: 预测结果DataFrame
        actual: 实际结果DataFrame（可选）
    """
    
def plot_customer_segments(df: pd.DataFrame, segment_col: str, metrics: List[str]) -> plt.Figure:
    """
    按客户群体绘制关键指标
    
    Args:
        df: 客户数据DataFrame
        segment_col: 分群列名
        metrics: 要展示的指标列表
        
    Returns:
        matplotlib图形对象
    """
    
def plot_retention_trend(data: pd.DataFrame, time_col: str, retention_col: str, 
                         segment_col: str = None) -> plt.Figure:
    """
    绘制续保率时间趋势
    
    Args:
        data: 时间序列数据
        time_col: 时间列名
        retention_col: 续保率列名
        segment_col: 分群列名（可选）
        
    Returns:
        matplotlib图形对象
    """
```

## 可视化类型

本模块支持以下类型的可视化：

### 1. 数据探索可视化

- **分布图**: 直方图、密度图、箱线图
- **关系图**: 散点图、成对图、相关性热图
- **分类图**: 条形图、饼图、计数图

### 2. 模型性能可视化

- **评估图**: ROC曲线、PR曲线、增益图、提升图
- **结果图**: 混淆矩阵、分类报告可视化
- **解释图**: 特征重要性、SHAP值、部分依赖图

### 3. 业务洞察可视化

- **分群图**: 客户细分图、续保率比较
- **预测图**: 流失风险热图、客户价值矩阵
- **趋势图**: 续保率趋势、季节性图表

## 使用示例

```python
from src.visualization.exploratory import plot_feature_distributions, plot_correlation_matrix
from src.visualization.model_viz import plot_feature_importance, plot_model_comparison
from src.visualization.business_viz import plot_retention_trend

# 探索数据分布
plot_feature_distributions(data, features=['age', 'income', 'policy_tenure'])

# 查看特征相关性
corr_fig = plot_correlation_matrix(data)
corr_fig.savefig('reports/figures/correlation_matrix.png')

# 可视化特征重要性
importance_fig = plot_feature_importance(feature_importance_df, top_n=15)
importance_fig.savefig('reports/figures/feature_importance.png')

# 绘制续保率趋势
trend_fig = plot_retention_trend(
    time_series_data, 
    time_col='month', 
    retention_col='retention_rate',
    segment_col='customer_segment'
)
trend_fig.savefig('reports/figures/retention_trend.png')
```

## 输出格式

可视化图表可以保存为以下格式：

- **静态图形**: PNG, JPG, PDF, SVG
- **交互式图形**: HTML (使用Plotly或Bokeh)
- **报告文档**: PDF报告包含多个图形和分析
- **仪表板**: 使用Streamlit或Dash构建的交互式仪表板

## 更新记录

- 2025-04-13: 初始化数据可视化模块结构和README文档 