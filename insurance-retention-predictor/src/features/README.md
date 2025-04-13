# 特征工程模块

特征工程模块负责从预处理后的保险客户数据中提取、创建和选择有效特征，为模型训练提供高质量的特征集。

## 功能说明

该模块提供以下核心功能：

1. **特征创建**: 从原始数据生成新特征
2. **特征转换**: 应用数学变换提升特征质量
3. **特征选择**: 选择最具预测力的特征子集
4. **特征编码**: 对分类特征进行高级编码

## 模块组件

### creation.py

```python
def create_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    基于原始特征创建新特征
    
    Args:
        df: 输入DataFrame
        
    Returns:
        包含新特征的DataFrame
    """
    
def create_time_features(df: pd.DataFrame, date_column: str) -> pd.DataFrame:
    """
    从日期特征创建时间相关特征
    
    Args:
        df: 输入DataFrame
        date_column: 日期列名
        
    Returns:
        包含时间特征的DataFrame
    """
    
def create_interaction_features(df: pd.DataFrame, features: List[str]) -> pd.DataFrame:
    """
    创建特征交互项
    
    Args:
        df: 输入DataFrame
        features: 用于创建交互项的特征列表
        
    Returns:
        包含交互特征的DataFrame
    """
```

### selection.py

```python
def select_features(X: pd.DataFrame, y: pd.Series, method: str = 'importance', threshold: float = 0.01) -> pd.DataFrame:
    """
    选择最重要的特征
    
    Args:
        X: 特征DataFrame
        y: 目标变量
        method: 选择方法 ('importance', 'correlation', 'recursive')
        threshold: 重要性阈值
        
    Returns:
        选择后的特征DataFrame
    """
    
def get_feature_importance(X: pd.DataFrame, y: pd.Series, model_type: str = 'rf') -> pd.DataFrame:
    """
    计算特征重要性
    
    Args:
        X: 特征DataFrame
        y: 目标变量
        model_type: 模型类型
        
    Returns:
        特征重要性DataFrame
    """
    
def remove_multicollinearity(X: pd.DataFrame, threshold: float = 0.8) -> pd.DataFrame:
    """
    移除高度相关的特征以减少多重共线性
    
    Args:
        X: 特征DataFrame
        threshold: 相关性阈值
        
    Returns:
        处理后的特征DataFrame
    """
```

## 特征类型

本模块支持创建以下类型的特征：

### 1. 客户特征

- **人口统计学特征**: 年龄组、职业类型、家庭状况
- **财务特征**: 收入水平、资产价值、信用评分
- **行为特征**: 支付方式、支付频率、互动频率

### 2. 保单特征

- **产品特征**: 保单类型、保障范围、保险期限
- **价格特征**: 保费金额、保费/收入比率、价格弹性
- **历史特征**: 客户保留期、以往续保记录、产品转换

### 3. 索赔特征

- **索赔历史**: 索赔次数、索赔金额、索赔频率
- **索赔时间**: 最近索赔时间、索赔间隔、季节性模式
- **索赔类型**: 索赔原因分类、严重程度评级

## 使用示例

```python
from src.features.creation import create_features, create_time_features
from src.features.selection import select_features, get_feature_importance

# 创建新特征
features_df = create_features(preprocessed_df)

# 添加时间特征
features_df = create_time_features(features_df, 'policy_start_date')

# 获取特征重要性
importance_df = get_feature_importance(features_df, target)
print("Top 5 important features:")
print(importance_df.head(5))

# 选择最佳特征
selected_features = select_features(features_df, target, method='importance', threshold=0.01)
```

## 注意事项

- 特征创建应避免数据泄露，确保不使用未来信息
- 极端值特征可能需要缩放或限制，以避免模型偏差
- 当特征数量较大时，推荐使用选择方法减少维度
- 对于高度相关特征，应移除冗余特征以提高模型效率

## 更新记录

- 2025-04-13: 初始化特征工程模块结构和README文档 