# 模型开发模块

模型开发模块负责构建、训练和优化保险续保预测模型，提供多种算法实现和参数调优方法，支持业务团队开发高准确度的续保预测解决方案。

## 功能说明

该模块提供以下核心功能：

1. **模型构建**: 支持多种机器学习算法实现
2. **参数调优**: 自动化超参数搜索和优化
3. **模型训练**: 高效处理大规模保险数据训练
4. **模型保存与加载**: 标准化模型序列化与反序列化
5. **预测接口**: 统一的预测功能接口

## 已实现模型

### 1. 基础分类模型

- 逻辑回归
- 随机森林
- 梯度提升树
- XGBoost
- LightGBM

### 2. 逻辑回归模型详解

我们使用逻辑回归模型对客户是否会续保进行了预测。模型表现出色，取得了以下性能：
- **准确率**: 91.00%
- **ROC AUC**: 0.9691
- **精确度**: 对于续保客户为93%，对于不续保客户为81%
- **召回率**: 对于续保客户为96%，对于不续保客户为68%

该模型已用于分析影响客户续保决策的关键因素，详细分析记录在"逻辑回归解释.md"文档中。

#### 主要影响因素

**正面影响因素（促进续保）**:
1. 中等收入客户 (系数: 2.93)
2. 已婚客户 (系数: 1.83)
3. 平安福保险产品持有者 (系数: 1.37)
4. 高收入客户 (系数: 1.35)
5. 医生职业客户 (系数: 1.20)

**负面影响因素（阻碍续保）**:
1. 低收入客户 (系数: -4.28)
2. 离异状态客户 (系数: -1.91)
3. 设计师职业客户 (系数: -1.53)
4. 高中学历客户 (系数: -1.27)
5. 年龄因素 (系数: -1.16)

## 模块组件

### base_model.py

```python
class BaseModel(ABC):
    """模型基类，定义所有模型的通用接口"""
    
    @abstractmethod
    def train(self, X: pd.DataFrame, y: pd.Series) -> None:
        """
        训练模型
        
        Args:
            X: 特征数据
            y: 目标变量
        """
        pass
    
    @abstractmethod
    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测标签
        
        Args:
            X: 特征数据
            
        Returns:
            预测标签数组
        """
        pass
    
    @abstractmethod
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测概率
        
        Args:
            X: 特征数据
            
        Returns:
            预测概率数组
        """
        pass
    
    def save(self, path: str) -> None:
        """
        保存模型到指定路径
        
        Args:
            path: 保存路径
        """
        joblib.dump(self, path)
    
    @classmethod
    def load(cls, path: str) -> 'BaseModel':
        """
        从指定路径加载模型
        
        Args:
            path: 模型路径
            
        Returns:
            加载的模型对象
        """
        return joblib.load(path)
```

### logistic_regression.py

```python
class LogisticRegressionModel(BaseModel):
    """逻辑回归模型实现"""
    
    def __init__(self, C: float = 1.0, penalty: str = 'l2', 
                 class_weight: Optional[Union[Dict, str]] = None):
        """
        初始化逻辑回归模型
        
        Args:
            C: 正则化强度的倒数
            penalty: 正则化类型 ('l1', 'l2', 'elasticnet', 'none')
            class_weight: 类别权重
        """
        self.C = C
        self.penalty = penalty
        self.class_weight = class_weight
        self.model = LogisticRegression(
            C=C, 
            penalty=penalty,
            class_weight=class_weight,
            random_state=42,
            max_iter=1000,
            solver='liblinear' if penalty == 'l1' else 'lbfgs'
        )
        
    def train(self, X: pd.DataFrame, y: pd.Series) -> None:
        """
        训练逻辑回归模型
        
        Args:
            X: 特征数据
            y: 目标变量
        """
        self.model.fit(X, y)
        self.feature_names_ = X.columns.tolist()
        
    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测标签
        
        Args:
            X: 特征数据
            
        Returns:
            预测标签数组
        """
        return self.model.predict(X)
    
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测概率
        
        Args:
            X: 特征数据
            
        Returns:
            预测概率数组
        """
        return self.model.predict_proba(X)
    
    def get_feature_importance(self) -> Dict[str, float]:
        """
        获取特征重要性
        
        Returns:
            特征名到重要性的映射
        """
        coef = self.model.coef_[0]
        return dict(zip(self.feature_names_, np.abs(coef)))
```

### random_forest.py

```python
class RandomForestModel(BaseModel):
    """随机森林模型实现"""
    
    def __init__(self, n_estimators: int = 100, max_depth: Optional[int] = None,
                 min_samples_split: int = 2, min_samples_leaf: int = 1,
                 class_weight: Optional[Union[Dict, str]] = None):
        """
        初始化随机森林模型
        
        Args:
            n_estimators: 树的数量
            max_depth: 树的最大深度
            min_samples_split: 内部节点再划分所需的最小样本数
            min_samples_leaf: 叶节点所需的最小样本数
            class_weight: 类别权重
        """
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.min_samples_leaf = min_samples_leaf
        self.class_weight = class_weight
        self.model = RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            min_samples_leaf=min_samples_leaf,
            class_weight=class_weight,
            random_state=42,
            n_jobs=-1
        )
        
    def train(self, X: pd.DataFrame, y: pd.Series) -> None:
        """
        训练随机森林模型
        
        Args:
            X: 特征数据
            y: 目标变量
        """
        self.model.fit(X, y)
        self.feature_names_ = X.columns.tolist()
        
    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测标签
        
        Args:
            X: 特征数据
            
        Returns:
            预测标签数组
        """
        return self.model.predict(X)
    
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测概率
        
        Args:
            X: 特征数据
            
        Returns:
            预测概率数组
        """
        return self.model.predict_proba(X)
    
    def get_feature_importance(self) -> Dict[str, float]:
        """
        获取特征重要性
        
        Returns:
            特征名到重要性的映射
        """
        return dict(zip(self.feature_names_, self.model.feature_importances_))
```

### gbm.py

```python
class GradientBoostingModel(BaseModel):
    """梯度提升模型实现"""
    
    def __init__(self, learning_rate: float = 0.1, n_estimators: int = 100,
                 max_depth: int = 3, subsample: float = 1.0,
                 colsample_bytree: float = 1.0):
        """
        初始化梯度提升模型
        
        Args:
            learning_rate: 学习率
            n_estimators: 提升树的数量
            max_depth: 树的最大深度
            subsample: 训练每棵树时使用的样本比例
            colsample_bytree: 训练每棵树时使用的特征比例
        """
        self.learning_rate = learning_rate
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.subsample = subsample
        self.colsample_bytree = colsample_bytree
        self.model = XGBClassifier(
            learning_rate=learning_rate,
            n_estimators=n_estimators,
            max_depth=max_depth,
            subsample=subsample,
            colsample_bytree=colsample_bytree,
            random_state=42,
            use_label_encoder=False,
            eval_metric='logloss'
        )
        
    def train(self, X: pd.DataFrame, y: pd.Series, 
             eval_set: Optional[List[Tuple[pd.DataFrame, pd.Series]]] = None) -> None:
        """
        训练梯度提升模型
        
        Args:
            X: 特征数据
            y: 目标变量
            eval_set: 评估数据集
        """
        self.model.fit(
            X, y,
            eval_set=eval_set,
            early_stopping_rounds=10 if eval_set else None,
            verbose=False
        )
        self.feature_names_ = X.columns.tolist()
        
    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测标签
        
        Args:
            X: 特征数据
            
        Returns:
            预测标签数组
        """
        return self.model.predict(X)
    
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测概率
        
        Args:
            X: 特征数据
            
        Returns:
            预测概率数组
        """
        return self.model.predict_proba(X)
    
    def get_feature_importance(self) -> Dict[str, float]:
        """
        获取特征重要性
        
        Returns:
            特征名到重要性的映射
        """
        return dict(zip(self.feature_names_, self.model.feature_importances_))
```

### neural_network.py

```python
class NeuralNetworkModel(BaseModel):
    """神经网络模型实现"""
    
    def __init__(self, hidden_layers: List[int] = [64, 32], 
                dropout_rate: float = 0.2, learning_rate: float = 0.001,
                batch_size: int = 64, epochs: int = 50,
                early_stopping_patience: int = 5):
        """
        初始化神经网络模型
        
        Args:
            hidden_layers: 隐藏层节点数列表
            dropout_rate: Dropout比率
            learning_rate: 学习率
            batch_size: 批量大小
            epochs: 训练轮数
            early_stopping_patience: 早停耐心值
        """
        self.hidden_layers = hidden_layers
        self.dropout_rate = dropout_rate
        self.learning_rate = learning_rate
        self.batch_size = batch_size
        self.epochs = epochs
        self.early_stopping_patience = early_stopping_patience
        self.model = None
        self.scaler = StandardScaler()
        
    def _build_model(self, input_dim: int) -> None:
        """
        构建神经网络模型
        
        Args:
            input_dim: 输入维度
        """
        model = Sequential()
        
        # 输入层
        model.add(Dense(self.hidden_layers[0], input_dim=input_dim, activation='relu'))
        model.add(Dropout(self.dropout_rate))
        
        # 隐藏层
        for units in self.hidden_layers[1:]:
            model.add(Dense(units, activation='relu'))
            model.add(Dropout(self.dropout_rate))
        
        # 输出层
        model.add(Dense(1, activation='sigmoid'))
        
        # 编译模型
        optimizer = Adam(learning_rate=self.learning_rate)
        model.compile(
            loss='binary_crossentropy',
            optimizer=optimizer,
            metrics=['accuracy', AUC()]
        )
        
        self.model = model
        
    def train(self, X: pd.DataFrame, y: pd.Series) -> None:
        """
        训练神经网络模型
        
        Args:
            X: 特征数据
            y: 目标变量
        """
        # 保存特征名
        self.feature_names_ = X.columns.tolist()
        
        # 数据标准化
        X_scaled = self.scaler.fit_transform(X)
        
        # 分割验证集
        X_train, X_val, y_train, y_val = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42
        )
        
        # 构建模型
        self._build_model(X.shape[1])
        
        # 定义早停回调
        early_stopping = EarlyStopping(
            monitor='val_auc',
            mode='max',
            patience=self.early_stopping_patience,
            restore_best_weights=True
        )
        
        # 训练模型
        self.model.fit(
            X_train, y_train,
            epochs=self.epochs,
            batch_size=self.batch_size,
            validation_data=(X_val, y_val),
            callbacks=[early_stopping],
            verbose=0
        )
        
    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测标签
        
        Args:
            X: 特征数据
            
        Returns:
            预测标签数组
        """
        X_scaled = self.scaler.transform(X)
        y_prob = self.model.predict(X_scaled)
        return (y_prob > 0.5).astype(int).flatten()
    
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测概率
        
        Args:
            X: 特征数据
            
        Returns:
            预测概率数组
        """
        X_scaled = self.scaler.transform(X)
        y_prob = self.model.predict(X_scaled).flatten()
        return np.vstack((1 - y_prob, y_prob)).T
```

### tuning.py

```python
def hyperparameter_tuning(model_class: Type[BaseModel], 
                         param_grid: Dict[str, List], 
                         X: pd.DataFrame, y: pd.Series,
                         cv: int = 5,
                         n_jobs: int = -1,
                         scoring: str = 'roc_auc',
                         verbose: int = 1) -> Tuple[Dict[str, Any], float]:
    """
    执行超参数调优
    
    Args:
        model_class: 模型类
        param_grid: 参数网格
        X: 特征数据
        y: 目标变量
        cv: 交叉验证折数
        n_jobs: 并行作业数
        scoring: 评分标准
        verbose: 详细程度
        
    Returns:
        最佳参数和最佳得分
    """
    
    def model_builder(**kwargs):
        model = model_class(**kwargs)
        return model.model  # 获取底层sklearn模型
    
    # 创建网格搜索
    grid_search = GridSearchCV(
        estimator=SklearnEstimator(model_builder),
        param_grid=param_grid,
        cv=cv,
        n_jobs=n_jobs,
        scoring=scoring,
        verbose=verbose
    )
    
    # 执行超参数搜索
    grid_search.fit(X, y)
    
    return grid_search.best_params_, grid_search.best_score_
```

### ensemble.py

```python
class EnsembleModel(BaseModel):
    """集成模型实现"""
    
    def __init__(self, models: List[BaseModel], weights: Optional[List[float]] = None):
        """
        初始化集成模型
        
        Args:
            models: 基础模型列表
            weights: 模型权重列表 (None表示均等权重)
        """
        self.models = models
        if weights is None:
            self.weights = [1/len(models)] * len(models)
        else:
            self.weights = weights
            
    def train(self, X: pd.DataFrame, y: pd.Series) -> None:
        """
        训练集成模型中的所有基础模型
        
        Args:
            X: 特征数据
            y: 目标变量
        """
        for model in self.models:
            model.train(X, y)
        
    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测标签
        
        Args:
            X: 特征数据
            
        Returns:
            预测标签数组
        """
        y_prob = self.predict_proba(X)[:, 1]
        return (y_prob > 0.5).astype(int)
    
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """
        生成预测概率
        
        Args:
            X: 特征数据
            
        Returns:
            预测概率数组
        """
        all_probs = np.zeros((X.shape[0], 2))
        
        for model, weight in zip(self.models, self.weights):
            probs = model.predict_proba(X)
            all_probs += probs * weight
            
        return all_probs
```

### feature_selection.py

```python
def select_features_by_importance(model: BaseModel, X: pd.DataFrame, 
                                 threshold: float = 0.01) -> List[str]:
    """
    基于特征重要性选择特征
    
    Args:
        model: 训练好的模型
        X: 特征数据
        threshold: 重要性阈值
        
    Returns:
        选择的特征列表
    """
    importances = model.get_feature_importance()
    return [feature for feature, importance in importances.items() 
            if importance >= threshold]
    
def recursive_feature_elimination(model_class: Type[BaseModel], 
                                 X: pd.DataFrame, y: pd.Series,
                                 n_features_to_select: int = None,
                                 cv: int = 5) -> List[str]:
    """
    使用递归特征消除选择特征
    
    Args:
        model_class: 模型类
        X: 特征数据
        y: 目标变量
        n_features_to_select: 要选择的特征数量
        cv: 交叉验证折数
        
    Returns:
        选择的特征列表
    """
    model = model_class()
    
    # 创建RFE选择器
    rfe = RFECV(
        estimator=model.model,
        step=1,
        min_features_to_select=n_features_to_select or max(1, X.shape[1] // 2),
        cv=cv,
        scoring='roc_auc'
    )
    
    # 执行特征选择
    rfe.fit(X, y)
    
    # 获取选择的特征
    selected_features = X.columns[rfe.support_].tolist()
    
    return selected_features
```

## 支持的算法

该模块实现的保险续保预测算法包括：

1. **逻辑回归**: 基础线性模型，提供良好的可解释性
2. **随机森林**: 强大的集成树模型，处理非线性关系
3. **梯度提升树**: 高性能提升算法，通常提供最佳预测效果
4. **神经网络**: 多层感知器实现，适用于复杂特征关系
5. **集成模型**: 组合多个不同模型，提高稳定性和性能

## 超参数调优

模型开发模块提供的超参数调优方法包括：

1. **网格搜索**: 穷举搜索参数空间
2. **随机搜索**: 随机采样参数空间
3. **贝叶斯优化**: 智能搜索最佳参数组合

常见需要调优的超参数：

- **逻辑回归**: 正则化强度、惩罚类型
- **随机森林**: 树的数量、最大深度、最小样本分割数
- **梯度提升**: 学习率、树的数量、最大深度、子采样率
- **神经网络**: 隐藏层大小、dropout率、学习率、批量大小

## 特征选择

模型开发过程中的特征选择方法：

1. **基于重要性**: 根据模型计算的特征重要性进行选择
2. **递归特征消除**: 反复训练模型并移除最不重要的特征
3. **L1正则化**: 利用L1正则化的稀疏特性自动选择特征

## 模型保存格式

训练好的模型通过以下格式保存：

1. **joblib**: 标准Python对象序列化
2. **pickle**: 传统Python序列化方式
3. **ONNX**: 开放神经网络交换格式（用于神经网络）

## 使用示例

### 基本模型训练与预测

```python
from src.models.gbm import GradientBoostingModel

# 加载数据
X_train = pd.read_parquet("data/processed/X_train.parquet")
X_test = pd.read_parquet("data/processed/X_test.parquet")
y_train = pd.read_parquet("data/processed/y_train.parquet")

# 初始化模型
gbm = GradientBoostingModel(
    learning_rate=0.1,
    n_estimators=100,
    max_depth=3
)

# 训练模型
gbm.train(X_train, y_train)

# 生成预测
y_prob = gbm.predict_proba(X_test)[:, 1]
y_pred = gbm.predict(X_test)

# 保存模型
gbm.save("models/gbm_model.pkl")

# 加载模型
loaded_model = GradientBoostingModel.load("models/gbm_model.pkl")
```

### 超参数调优

```python
from src.models.random_forest import RandomForestModel
from src.models.tuning import hyperparameter_tuning

# 定义参数网格
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 5, 10],
    'min_samples_split': [2, 5, 10]
}

# 执行超参数调优
best_params, best_score = hyperparameter_tuning(
    model_class=RandomForestModel,
    param_grid=param_grid,
    X=X_train,
    y=y_train,
    cv=5,
    scoring='roc_auc'
)

# 使用最佳参数创建模型
rf = RandomForestModel(**best_params)
rf.train(X_train, y_train)
```

### 集成多个模型

```python
from src.models.logistic_regression import LogisticRegressionModel
from src.models.random_forest import RandomForestModel
from src.models.gbm import GradientBoostingModel
from src.models.ensemble import EnsembleModel

# 创建各个基础模型
lr = LogisticRegressionModel(C=1.0)
rf = RandomForestModel(n_estimators=100)
gbm = GradientBoostingModel(learning_rate=0.1, n_estimators=100)

# 训练各个模型
lr.train(X_train, y_train)
rf.train(X_train, y_train)
gbm.train(X_train, y_train)

# 创建集成模型
ensemble = EnsembleModel(
    models=[lr, rf, gbm], 
    weights=[0.2, 0.3, 0.5]  # 基于各模型性能设置权重
)

# 使用集成模型进行预测
y_prob = ensemble.predict_proba(X_test)[:, 1]
```

## 更新记录

- 2025-04-14: 添加逻辑回归模型及其详细分析结果
- 2025-04-13: 初始化模型模块结构和基本功能定义
- 2025-04-10: 创建模型开发模块 README 文件 