# 数据处理模块

数据处理模块负责保险续保预测项目中的数据获取、清洗、转换和特征工程，确保模型训练和预测使用高质量的数据输入。

## 功能说明

该模块提供以下核心功能：

1. **数据获取**: 从各种数据源加载原始数据
2. **数据清洗**: 处理缺失值、异常值和数据错误
3. **数据转换**: 编码分类变量、标准化数值特征
4. **特征工程**: 创建新特征以提高模型性能
5. **数据分割**: 将数据集分为训练、验证和测试集
6. **数据导出**: 将处理后的数据保存为可用格式

## 模块组件

### loader.py

```python
def load_data(data_path: str, file_type: str = 'csv') -> pd.DataFrame:
    """
    加载原始数据
    
    Args:
        data_path: 数据文件路径
        file_type: 文件类型 ('csv', 'excel', 'parquet', 'sql')
        
    Returns:
        加载的数据DataFrame
    """

def query_database(query: str, connection_string: str) -> pd.DataFrame:
    """
    从数据库查询数据
    
    Args:
        query: SQL查询语句
        connection_string: 数据库连接字符串
        
    Returns:
        查询结果DataFrame
    """
    
def combine_data_sources(dataframes: List[pd.DataFrame], 
                        join_keys: List[str]) -> pd.DataFrame:
    """
    合并多个数据源
    
    Args:
        dataframes: DataFrame列表
        join_keys: 用于合并的键列表
        
    Returns:
        合并后的DataFrame
    """
```

### cleaner.py

```python
def handle_missing_values(df: pd.DataFrame, strategy: Dict[str, str] = None) -> pd.DataFrame:
    """
    处理缺失值
    
    Args:
        df: 输入数据
        strategy: 列名到处理策略的映射 ('mean', 'median', 'mode', 'drop', 'fill_value')
        
    Returns:
        处理后的DataFrame
    """

def handle_outliers(df: pd.DataFrame, method: str = 'iqr', 
                   columns: List[str] = None) -> pd.DataFrame:
    """
    处理异常值
    
    Args:
        df: 输入数据
        method: 异常值处理方法 ('iqr', 'zscore', 'isolation_forest')
        columns: 要处理的列
        
    Returns:
        处理后的DataFrame
    """
    
def validate_data(df: pd.DataFrame, rules: Dict[str, Any]) -> pd.DataFrame:
    """
    根据规则验证数据
    
    Args:
        df: 输入数据
        rules: 验证规则字典
        
    Returns:
        验证后的数据和验证报告
    """
```

### transformer.py

```python
def encode_categorical_features(df: pd.DataFrame, 
                              encoding_type: str = 'onehot',
                              columns: List[str] = None) -> pd.DataFrame:
    """
    编码分类特征
    
    Args:
        df: 输入数据
        encoding_type: 编码类型 ('onehot', 'label', 'target', 'count', 'binary')
        columns: 要编码的列
        
    Returns:
        编码后的DataFrame
    """

def scale_numerical_features(df: pd.DataFrame, 
                           scaling_type: str = 'standard',
                           columns: List[str] = None) -> pd.DataFrame:
    """
    缩放数值特征
    
    Args:
        df: 输入数据
        scaling_type: 缩放类型 ('standard', 'minmax', 'robust', 'log')
        columns: 要缩放的列
        
    Returns:
        缩放后的DataFrame
    """
    
def perform_dimensionality_reduction(df: pd.DataFrame, 
                                   method: str = 'pca',
                                   n_components: int = None) -> pd.DataFrame:
    """
    执行降维
    
    Args:
        df: 输入数据
        method: 降维方法 ('pca', 'tsne', 'umap')
        n_components: 目标维度
        
    Returns:
        降维后的DataFrame
    """
```

### feature_engineering.py

```python
def create_time_features(df: pd.DataFrame, 
                        date_column: str) -> pd.DataFrame:
    """
    从日期列创建时间特征
    
    Args:
        df: 输入数据
        date_column: 日期列名
        
    Returns:
        添加时间特征后的DataFrame
    """

def create_interaction_features(df: pd.DataFrame, 
                              feature_pairs: List[Tuple[str, str]]) -> pd.DataFrame:
    """
    创建特征交互
    
    Args:
        df: 输入数据
        feature_pairs: 要交互的特征对列表
        
    Returns:
        添加交互特征后的DataFrame
    """
    
def create_aggregation_features(df: pd.DataFrame, 
                              group_columns: List[str],
                              agg_columns: List[str],
                              agg_funcs: List[str]) -> pd.DataFrame:
    """
    创建聚合特征
    
    Args:
        df: 输入数据
        group_columns: 分组列
        agg_columns: 聚合列
        agg_funcs: 聚合函数
        
    Returns:
        添加聚合特征后的DataFrame
    """
    
def select_features(df: pd.DataFrame, target: str,
                   method: str = 'mutual_info',
                   k: int = None) -> pd.DataFrame:
    """
    特征选择
    
    Args:
        df: 输入数据
        target: 目标变量
        method: 选择方法 ('mutual_info', 'chi2', 'rfe', 'l1')
        k: 选择的特征数
        
    Returns:
        选择特征后的DataFrame
    """
```

### splitter.py

```python
def train_test_split_with_time(df: pd.DataFrame, 
                              target: str,
                              time_column: str,
                              test_size: float = 0.2,
                              validation_size: float = 0.2) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.Series, pd.Series, pd.Series]:
    """
    基于时间的训练测试分割
    
    Args:
        df: 输入数据
        target: 目标变量列名
        time_column: 时间列名
        test_size: 测试集比例
        validation_size: 验证集比例
        
    Returns:
        X_train, X_val, X_test, y_train, y_val, y_test
    """

def create_stratified_fold(df: pd.DataFrame, 
                          target: str,
                          n_splits: int = 5,
                          shuffle: bool = True) -> List[Tuple[np.ndarray, np.ndarray]]:
    """
    创建分层交叉验证折
    
    Args:
        df: 输入数据
        target: 目标变量列名
        n_splits: 分割数
        shuffle: 是否打乱
        
    Returns:
        训练和测试索引的列表
    """
```

## 数据处理流程

典型的数据处理流程如下：

1. **数据加载**: 从CSV、数据库或其他源加载原始数据
2. **数据清洗**:
   - 处理缺失值（插补或删除）
   - 识别和处理异常值
   - 修正数据类型和格式问题
3. **特征工程**:
   - 创建时间特征（季节性、趋势）
   - 创建客户行为特征
   - 基于业务知识创建派生特征
4. **特征转换**:
   - 编码分类变量
   - 标准化数值特征
   - 应用非线性变换
5. **特征选择**: 选择最相关特征以减少维度
6. **数据分割**: 创建训练、验证和测试集

## 输入数据

本模块处理的主要数据包括：

1. **客户基本信息**: 年龄、性别、地区等
2. **保单信息**: 保险类型、保费、保险期限等
3. **理赔历史**: 理赔次数、金额、类型等
4. **客户交互**: 客服接触次数、满意度调查等
5. **支付记录**: 支付方式、支付历史等

## 输出特征

处理后的数据集包含以下类型的特征：

1. **基础特征**: 经过清洗和转换的原始特征
2. **时间特征**: 客户生命周期、季节性特征等
3. **行为特征**: 客户互动模式、理赔行为等
4. **统计特征**: 各种统计聚合（均值、标准差等）
5. **交互特征**: 特征组合和交互项

## 使用示例

```python
from src.data.loader import load_data
from src.data.cleaner import handle_missing_values, handle_outliers
from src.data.transformer import encode_categorical_features, scale_numerical_features
from src.data.feature_engineering import create_time_features, select_features
from src.data.splitter import train_test_split_with_time

# 加载数据
df = load_data("data/raw/insurance_data.csv")

# 数据清洗
df = handle_missing_values(df, {'age': 'median', 'income': 'mean', 'region': 'mode'})
df = handle_outliers(df, method='iqr', columns=['premium', 'claim_amount'])

# 特征工程
df = create_time_features(df, 'policy_date')
df = encode_categorical_features(df, encoding_type='onehot', 
                              columns=['policy_type', 'region', 'payment_method'])
df = scale_numerical_features(df, scaling_type='standard',
                           columns=['age', 'income', 'premium'])

# 特征选择
df_selected = select_features(df, target='renewed', method='mutual_info', k=20)

# 数据分割
X_train, X_val, X_test, y_train, y_val, y_test = train_test_split_with_time(
    df_selected, target='renewed', time_column='policy_date',
    test_size=0.2, validation_size=0.15
)

# 保存处理后的数据
X_train.to_parquet("data/processed/X_train.parquet")
y_train.to_parquet("data/processed/y_train.parquet")
```

## 配置和参数

数据处理流程可通过`config.yaml`文件配置，包括：

- 文件路径和数据源
- 清洗和转换策略
- 特征工程参数
- 数据分割比例

## 更新记录

- 2025-04-13: 初始化数据处理模块结构和README文档 