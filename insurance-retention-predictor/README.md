# 保险客户续保预测系统 (Insurance Retention Predictor)

<p align="center">
  <img src="docs/images/logo.png" alt="Insurance Retention Predictor Logo" width="200"/>
</p>

## 项目概述

保险客户续保预测系统是一个端到端的机器学习应用，通过分析客户的历史数据、行为模式和保险产品使用情况，预测客户是否会续保其保险产品。本项目采用多种机器学习算法，包括决策树、随机森林、梯度提升树和深度学习模型，建立预测模型，帮助保险公司识别可能流失的高风险客户，及时采取营销策略和客户关怀措施，提高客户留存率。

### 业务价值

- **提高客户留存率**：通过提前预测可能流失的客户，制定针对性的客户维系策略
- **优化营销资源分配**：将营销资源集中在高流失风险的客户群体上
- **增强业务洞察力**：发现影响客户续保决策的核心因素
- **提升客户体验**：基于分析结果，改进产品和服务设计

## 最新成果

### 逻辑回归模型分析

我们最近完成了逻辑回归模型的开发和分析，取得了以下成果：

- **高预测性能**：准确率达91.00%，ROC AUC为0.9691
- **关键因素识别**：成功识别了影响客户续保决策的关键因素
  - **正面因素**：中等收入、已婚状态、医生职业等
  - **负面因素**：低收入、离异状态、高龄等
- **业务洞察**：提供了详细的客户画像和针对性的业务建议

详细分析请参阅：[逻辑回归解释.md](逻辑回归解释.md)

## 目录结构

```
insurance-retention-predictor/
│
├── data/                      # 数据目录
│   ├── raw/                   # 原始数据
│   └── processed/             # 处理后的数据
│
├── notebooks/                 # Jupyter notebooks
│   ├── 01_EDA.ipynb           # 探索性数据分析
│   ├── 02_Feature_Engineering.ipynb  # 特征工程
│   ├── 03_Model_Development.ipynb    # 模型开发与评估
│   ├── policy_data_eda.py     # 保单数据EDA分析脚本
│   └── logistic_regression_model.py  # 逻辑回归模型脚本
│
├── src/                       # 源代码
│   ├── data/                  # 数据处理模块
│   │   ├── preprocessing.py   # 数据预处理
│   │   └── validation.py      # 数据验证
│   │
│   ├── features/              # 特征工程模块
│   │   ├── creation.py        # 特征创建
│   │   └── selection.py       # 特征选择
│   │
│   ├── models/                # 模型构建模块
│   │   ├── train_model.py     # 模型训练
│   │   ├── predict_model.py   # 模型预测
│   │   └── evaluate_model.py  # 模型评估
│   │
│   ├── visualization/         # 数据可视化模块
│   │   ├── exploratory.py     # 探索性图表
│   │   └── model_insights.py  # 模型解释图表
│   │
│   └── utils/                 # 工具函数
│       ├── config.py          # 配置
│       └── logger.py          # 日志
│
├── models/                    # 保存训练好的模型
│   └── logistic_regression_model_*.pkl  # 逻辑回归模型
│
├── reports/                   # 报告和结果
│   └── figures/               # 生成的图表和可视化
│
├── docs/                      # 文档
│   └── todo/                  # 开发计划文档
│
├── tests/                     # 单元测试和集成测试
│   ├── test_data.py           # 数据处理测试
│   └── test_models.py         # 模型测试
│
├── app.py                     # Web应用入口
├── requirements.txt           # 项目依赖
├── setup.py                   # 安装脚本
├── 逻辑回归解释.md            # 逻辑回归模型解释文档
└── README.md                  # 项目说明
```

## 安装与使用

### 前提条件

- Python 3.8+
- pip (Python包管理器)
- 虚拟环境管理工具（推荐使用conda或venv）

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/yourusername/insurance-retention-predictor.git
cd insurance-retention-predictor
```

2. 创建并激活虚拟环境
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. 安装依赖
```bash
pip install -r requirements.txt
```

### 使用方法

#### 数据准备

将原始数据放入`data/raw`目录，然后运行数据预处理脚本：

```bash
python src/data/preprocessing.py
```

#### 探索性数据分析

```bash
python notebooks/policy_data_eda.py
```

#### 模型训练

基本模型训练：
```bash
python src/models/train_model.py --config configs/default.yaml
```

逻辑回归模型训练与分析：
```bash
python notebooks/logistic_regression_model.py
```

#### 预测

```bash
python src/models/predict_model.py --input data/samples/new_customers.csv --output predictions.csv
```

#### 启动Web应用

```bash
python app.py
```

## 项目重点关注

1. **数据质量与特征工程**
   - 处理缺失值、异常值和数据不平衡
   - 创建反映客户行为和特征的有效特征
   - 应用特征选择方法，提高模型性能

2. **模型选择与优化**
   - 比较多种算法性能
   - 应用超参数优化
   - 使用交叉验证评估模型稳定性

3. **模型解释性**
   - 使用系数分析、SHAP和LIME等工具解释模型决策
   - 识别影响客户续保的关键因素
   - 生成可actionable的业务洞察

4. **MLOps最佳实践**
   - 实现持续集成和部署流程
   - 构建模型监控系统
   - 使用实验跟踪工具（如MLflow）管理实验

5. **业务价值转化**
   - 将模型结果转化为具体营销策略
   - 设计A/B测试评估模型实际效果
   - 计算模型ROI和业务价值

## 职业收获

通过完成本项目，您将获得以下职业技能和经验，这对于寻求AI应用开发工作非常有价值：

1. **端到端ML项目实施经验**
   - 从数据收集到模型部署的完整流程
   - 应对实际业务问题的解决方案设计

2. **先进ML/AI技术应用能力**
   - 应用最新的机器学习算法
   - 解决不平衡数据集问题
   - 实现复杂特征工程

3. **MLOps技能**
   - 模型版本控制
   - 自动化部署流程
   - 模型监控和维护

4. **业务理解与价值转化**
   - 将技术结果转化为业务决策
   - 评估模型业务影响
   - 与业务团队有效沟通

5. **可扩展系统设计经验**
   - 构建可扩展的数据处理流程
   - 设计高效的批处理和实时预测系统
   - 集成现有业务系统

6. **高质量软件工程实践**
   - 编写可测试、模块化的代码
   - 实现有效的错误处理和日志记录
   - 使用Git进行版本控制

## 更新记录

- 2025-04-14: 完成逻辑回归模型开发与解释文档，系数可视化与分析
- 2025-04-13: 添加保单数据探索性分析，创建可视化图表
- 2025-04-10: 初始化项目结构和基础代码框架
- 2025-04-08: 创建项目规范和文档模板


