# 模型评估模块

模型评估模块负责全面评估保险续保预测模型的性能，提供多维度的评估指标和可视化结果，帮助业务团队理解模型效果并做出决策。

## 功能说明

该模块提供以下核心功能：

1. **性能评估**: 计算多种评估指标
2. **阈值优化**: 基于业务目标确定最佳决策阈值
3. **模型比较**: 比较不同模型的性能差异
4. **业务价值评估**: 评估模型对业务指标的影响
5. **可视化报告**: 生成直观的评估可视化和报告

## 模块组件

### metrics.py

```python
def classification_metrics(y_true: np.ndarray, y_pred: np.ndarray, 
                          y_prob: np.ndarray = None) -> Dict[str, float]:
    """
    计算分类模型的性能指标
    
    Args:
        y_true: 真实标签
        y_pred: 预测标签
        y_prob: 预测概率（如有）
        
    Returns:
        包含各种指标的字典
    """

def regression_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
    """
    计算回归模型的性能指标
    
    Args:
        y_true: 真实值
        y_pred: 预测值
        
    Returns:
        包含各种指标的字典
    """
    
def calculate_lift(y_true: np.ndarray, y_score: np.ndarray, 
                  n_bins: int = 10) -> Tuple[np.ndarray, np.ndarray]:
    """
    计算提升度和累积提升度
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        n_bins: 分位数数量
        
    Returns:
        提升度和累积提升度数组
    """
    
def calculate_stability_index(train_preds: np.ndarray, 
                             test_preds: np.ndarray, 
                             n_bins: int = 10) -> float:
    """
    计算稳定性指数（PSI）
    
    Args:
        train_preds: 训练集预测
        test_preds: 测试集预测
        n_bins: 分位数数量
        
    Returns:
        稳定性指数值
    """
```

### visualization.py

```python
def plot_roc_curve(y_true: np.ndarray, y_score: np.ndarray, 
                  title: str = None) -> plt.Figure:
    """
    绘制ROC曲线
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        title: 图表标题
        
    Returns:
        Figure对象
    """

def plot_precision_recall_curve(y_true: np.ndarray, y_score: np.ndarray, 
                               title: str = None) -> plt.Figure:
    """
    绘制精确率-召回率曲线
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        title: 图表标题
        
    Returns:
        Figure对象
    """
    
def plot_confusion_matrix(y_true: np.ndarray, y_pred: np.ndarray, 
                         normalize: bool = True, 
                         title: str = None) -> plt.Figure:
    """
    绘制混淆矩阵
    
    Args:
        y_true: 真实标签
        y_pred: 预测标签
        normalize: 是否归一化
        title: 图表标题
        
    Returns:
        Figure对象
    """
    
def plot_calibration_curve(y_true: np.ndarray, y_prob: np.ndarray, 
                          n_bins: int = 10, 
                          title: str = None) -> plt.Figure:
    """
    绘制校准曲线
    
    Args:
        y_true: 真实标签
        y_prob: 预测概率
        n_bins: 分位数数量
        title: 图表标题
        
    Returns:
        Figure对象
    """
    
def plot_lift_chart(y_true: np.ndarray, y_score: np.ndarray, 
                   n_bins: int = 10, 
                   title: str = None) -> plt.Figure:
    """
    绘制提升图
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        n_bins: 分位数数量
        title: 图表标题
        
    Returns:
        Figure对象
    """
    
def plot_feature_importance(importance: np.ndarray, feature_names: List[str], 
                           title: str = None) -> plt.Figure:
    """
    绘制特征重要性图
    
    Args:
        importance: 特征重要性值
        feature_names: 特征名称列表
        title: 图表标题
        
    Returns:
        Figure对象
    """
```

### threshold.py

```python
def find_optimal_threshold(y_true: np.ndarray, y_score: np.ndarray, 
                         metric: str = 'f1', 
                         return_metric_values: bool = False) -> Union[float, Tuple[float, np.ndarray]]:
    """
    寻找最优决策阈值
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        metric: 优化指标 ('f1', 'precision', 'recall', 'accuracy', 'custom')
        return_metric_values: 是否返回指标值数组
        
    Returns:
        最优阈值（和可选的指标值数组）
    """

def threshold_from_business_constraint(y_true: np.ndarray, y_score: np.ndarray, 
                                      constraint_type: str, 
                                      constraint_value: float) -> float:
    """
    基于业务约束确定阈值
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        constraint_type: 约束类型 ('precision', 'recall', 'fpr', 'tpr', 'coverage')
        constraint_value: 约束值
        
    Returns:
        满足约束的阈值
    """
```

### business_metrics.py

```python
def calculate_expected_profit(y_true: np.ndarray, y_score: np.ndarray, 
                             threshold: float,
                             profit_matrix: Dict[str, float]) -> float:
    """
    计算预期盈利
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        threshold: 决策阈值
        profit_matrix: 利润矩阵，包含TP, FP, TN, FN的利润/成本
        
    Returns:
        预期盈利
    """

def calculate_roi(y_true: np.ndarray, y_score: np.ndarray, 
                 threshold: float,
                 cost_per_contact: float,
                 revenue_per_conversion: float) -> float:
    """
    计算投资回报率
    
    Args:
        y_true: 真实标签
        y_score: 预测分数
        threshold: 决策阈值
        cost_per_contact: 单位接触成本
        revenue_per_conversion: 单位转化收入
        
    Returns:
        投资回报率
    """
    
def retention_improvement(baseline_retention: float, 
                         targeted_retention: float,
                         targeting_ratio: float) -> float:
    """
    计算续保率改善
    
    Args:
        baseline_retention: 基准续保率
        targeted_retention: 定向营销后的续保率
        targeting_ratio: 定向营销覆盖比例
        
    Returns:
        总体续保率改善
    """
```

### cross_validation.py

```python
def cross_validate_model(model, X: pd.DataFrame, y: pd.Series, 
                        cv: int = 5, 
                        scoring: Union[str, List[str]] = 'roc_auc') -> Dict[str, np.ndarray]:
    """
    进行交叉验证
    
    Args:
        model: 机器学习模型
        X: 特征数据
        y: 标签数据
        cv: 交叉验证折数
        scoring: 评分方式
        
    Returns:
        包含各种指标的字典
    """

def cross_validate_with_time_series(model, X: pd.DataFrame, y: pd.Series, 
                                   time_column: str,
                                   n_splits: int = 5,
                                   gap: int = 0) -> Dict[str, np.ndarray]:
    """
    进行时间序列交叉验证
    
    Args:
        model: 机器学习模型
        X: 特征数据
        y: 标签数据
        time_column: 时间列名
        n_splits: 分割数
        gap: 训练集和测试集之间的间隔
        
    Returns:
        包含各种指标的字典
    """
```

### report.py

```python
def generate_evaluation_report(model, X_train: pd.DataFrame, X_test: pd.DataFrame, 
                              y_train: pd.Series, y_test: pd.Series, 
                              feature_names: List[str] = None,
                              output_path: str = None) -> Dict[str, Any]:
    """
    生成综合评估报告
    
    Args:
        model: 训练好的模型
        X_train: 训练特征
        X_test: 测试特征
        y_train: 训练标签
        y_test: 测试标签
        feature_names: 特征名称列表
        output_path: 报告输出路径
        
    Returns:
        包含评估结果的字典
    """

def compare_models(models: Dict[str, Any], X: pd.DataFrame, y: pd.Series, 
                  test_size: float = 0.2, 
                  metrics: List[str] = None,
                  cv: int = 5) -> pd.DataFrame:
    """
    比较多个模型的性能
    
    Args:
        models: 模型名称到模型对象的字典
        X: 特征数据
        y: 标签数据
        test_size: 测试集比例
        metrics: 要计算的指标列表
        cv: 交叉验证折数
        
    Returns:
        比较结果DataFrame
    """
```

## 主要评估指标

### 分类指标

- **AUC-ROC**: 衡量模型区分正负样本的能力
- **AUC-PR**: 在类别不平衡情况下比ROC更敏感
- **KS统计量**: 评估区分度，常用于金融风控模型
- **对数损失**: 评估概率预测的准确性
- **准确率/精确率/召回率/F1分数**: 分类效果指标
- **混淆矩阵**: 详细展示预测结果分布

### 业务指标

- **提升度**: 相对于随机选择的改善程度
- **ROI**: 基于成本和收益的投资回报率
- **续保率改善**: 相对于基准的续保率提升
- **PSI**: 评估模型在不同数据集上的稳定性
- **收益曲线**: 基于不同决策阈值的预期收益

## 评估流程

典型的模型评估流程包括：

1. **基础性能评估**:
   - 计算AUC、精确率、召回率等基础指标
   - 绘制ROC曲线、PR曲线等可视化图表
2. **阈值优化**:
   - 根据业务目标选择最佳决策阈值
   - 评估不同阈值下的业务影响
3. **业务价值评估**:
   - 估计模型对续保率的潜在提升
   - 计算实施模型的预期ROI
4. **模型稳定性评估**:
   - 评估在不同时间段上的表现
   - 检查不同客户群体上的表现差异
5. **模型解释**:
   - 分析关键影响因素
   - 生成可解释的评估报告

## 使用示例

```python
from src.evaluation.metrics import classification_metrics
from src.evaluation.visualization import plot_roc_curve, plot_precision_recall_curve
from src.evaluation.threshold import find_optimal_threshold
from src.evaluation.business_metrics import calculate_roi
from src.evaluation.report import generate_evaluation_report

# 加载模型和数据
model = joblib.load("models/gbm_model.pkl")
X_test = pd.read_parquet("data/processed/X_test.parquet")
y_test = pd.read_parquet("data/processed/y_test.parquet")

# 获取预测值
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

# 计算评估指标
metrics = classification_metrics(y_test, y_pred, y_prob)
print(f"AUC: {metrics['auc']:.4f}, F1: {metrics['f1']:.4f}")

# 绘制评估曲线
roc_fig = plot_roc_curve(y_test, y_prob, title="客户续保预测ROC曲线")
roc_fig.savefig("reports/figures/roc_curve.png")

pr_fig = plot_precision_recall_curve(y_test, y_prob, title="客户续保预测PR曲线")
pr_fig.savefig("reports/figures/pr_curve.png")

# 寻找最优阈值
optimal_threshold = find_optimal_threshold(y_test, y_prob, metric='f1')
print(f"最优阈值: {optimal_threshold:.4f}")

# 计算业务指标
roi = calculate_roi(
    y_test, y_prob, 
    threshold=optimal_threshold,
    cost_per_contact=50,
    revenue_per_conversion=500
)
print(f"预期ROI: {roi:.2f}")

# 生成完整评估报告
report = generate_evaluation_report(
    model, 
    X_train, X_test, 
    y_train, y_test,
    feature_names=X_test.columns,
    output_path="reports/model_evaluation_report.html"
)
```

## 报告格式

标准评估报告包含以下内容：

1. **执行摘要**: 关键性能指标和业务价值概述
2. **数据概述**: 训练和测试数据的分布和特点
3. **模型性能**: 详细的性能指标和可视化图表
4. **业务影响**: 对业务KPI的预计影响
5. **特征重要性**: 主要影响因素分析
6. **模型稳定性**: 不同条件下的表现分析
7. **建议**: 基于评估结果的行动建议

## 更新记录

- 2025-04-13: 初始化模型评估模块结构和README文档 