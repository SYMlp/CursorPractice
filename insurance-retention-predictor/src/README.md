# 源代码目录 (src)

本目录包含保险客户续保预测系统的主要源代码，按功能模块组织。

## 目录结构

- `data/`: 数据处理模块
  - `preprocessing.py`: 数据预处理功能
  - `validation.py`: 数据验证功能
  
- `features/`: 特征工程模块
  - `creation.py`: 特征创建功能
  - `selection.py`: 特征选择功能
  
- `models/`: 模型构建模块
  - `train_model.py`: 模型训练功能
  - `predict_model.py`: 模型预测功能
  - `evaluate_model.py`: 模型评估功能
  
- `visualization/`: 数据可视化模块
  - `exploratory.py`: 探索性图表生成
  - `model_insights.py`: 模型解释图表
  
- `utils/`: 工具函数
  - `config.py`: 配置工具
  - `logger.py`: 日志工具

## 模块间依赖关系

```
data → features → models → visualization
  ↑        ↑         ↑           ↑
  └────────┴─── utils ───────────┘
```

- 数据处理模块为特征工程提供清洗后的数据
- 特征工程模块为模型构建提供特征集
- 模型构建模块为可视化提供训练后的模型和评估结果
- 工具函数被所有模块使用

## 代码规范

1. **类型提示**: 使用Python类型注解增强代码可读性和维护性
2. **文档字符串**: 所有函数和类都应有清晰的文档字符串
3. **错误处理**: 使用适当的异常处理机制
4. **日志记录**: 使用`utils/logger.py`中的日志工具记录关键操作
5. **配置管理**: 使用`utils/config.py`管理配置参数，避免硬编码

## 使用示例

以下是一个端到端的数据处理、特征工程、模型训练和预测的示例：

```python
# 数据预处理
from src.data.preprocessing import load_data, preprocess_data
from src.features.creation import create_features
from src.models.train_model import train_model
from src.models.predict_model import predict

# 加载并预处理数据
df = load_data("data/raw/insurance_data.csv")
X_train, X_test, y_train, y_test = preprocess_data(df)

# 创建特征
X_train_featured = create_features(X_train)
X_test_featured = create_features(X_test)

# 训练模型
model = train_model(X_train_featured, y_train)

# 进行预测
predictions = predict(model, X_test_featured)
```

## 更新记录

- 2025-04-13: 初始化源代码目录结构和README文档 