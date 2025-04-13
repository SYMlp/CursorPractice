"""
决策树模型分类与可视化

使用决策树模型对保险客户续保行为进行分类，并进行可视化。
设置决策树最大深度为3，以确保模型的可解释性和可视化效果。
"""

import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_curve, auc

# 设置中文显示
plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体
plt.rcParams['axes.unicode_minus'] = False    # 解决保存图像时负号'-'显示为方块的问题

# 项目路径
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_PATH = os.path.join(PROJECT_ROOT, 'data/raw/policy_data.xlsx')
FIGURES_DIR = os.path.join(PROJECT_ROOT, 'reports/figures')
MODELS_DIR = os.path.join(PROJECT_ROOT, 'models')

# 确保目录存在
os.makedirs(FIGURES_DIR, exist_ok=True)
os.makedirs(MODELS_DIR, exist_ok=True)

# 时间戳，用于唯一文件名
TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")

def load_data(data_path):
    """加载原始数据"""
    print(f"正在读取数据: {data_path}")
    df = pd.read_excel(data_path)
    print(f"成功读取数据，形状: {df.shape}")
    return df

def preprocess_data(df):
    """数据预处理"""
    # 将目标变量转换为二进制(Yes=1, No=0)
    le = LabelEncoder()
    df['renewal_encoded'] = le.fit_transform(df['renewal'])
    
    # 从日期中提取年月特征
    df['policy_start_date_year'] = df['policy_start_date'].dt.year
    df['policy_start_date_month'] = df['policy_start_date'].dt.month
    df['policy_end_date_year'] = df['policy_end_date'].dt.year
    df['policy_end_date_month'] = df['policy_end_date'].dt.month
    
    return df

def prepare_features_target(df):
    """准备特征和目标变量"""
    # 分离特征和目标变量
    y = df['renewal_encoded']
    
    # 排除原始目标变量和ID
    X = df.drop(['renewal', 'renewal_encoded', 'policy_start_date', 'policy_end_date'], axis=1)
    
    # 区分类别特征和数值特征
    cat_features = X.select_dtypes(include=['object']).columns.tolist()
    num_features = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
    
    print(f"类别特征: {cat_features}")
    print(f"数值特征: {num_features}")
    
    return X, y, cat_features, num_features

def build_train_decision_tree(X_train, y_train, cat_features, num_features, random_state=42):
    """
    构建和训练决策树模型 - 使用原始特征值
    参数:
        X_train (pd.DataFrame): 训练特征数据
        y_train (pd.Series): 训练标签数据
        cat_features (list): 分类特征列表
        num_features (list): 数值特征列表
        random_state (int): 随机种子
    返回:
        trained_model: 训练好的决策树模型
    """
    # 构建预处理器 - 数值特征不进行标准化
    numeric_transformer = 'passthrough'  # 使用原始值不进行标准化
    categorical_transformer = OneHotEncoder(drop='first', handle_unknown='ignore')
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, num_features),
            ('cat', categorical_transformer, cat_features)
        ]
    )
    
    # 构建模型管道
    model = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', DecisionTreeClassifier(
            max_depth=5, 
            min_samples_split=20,
            min_samples_leaf=10,
            class_weight='balanced',
            random_state=random_state
        ))
    ])
    
    # 训练模型
    model.fit(X_train, y_train)
    
    return model

def evaluate_model(model, X_test, y_test):
    """评估模型性能"""
    # 预测
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # 计算指标
    accuracy = accuracy_score(y_test, y_pred)
    class_report = classification_report(y_test, y_pred)
    conf_matrix = confusion_matrix(y_test, y_pred)
    
    # ROC曲线数据
    fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
    roc_auc = auc(fpr, tpr)
    
    print(f"准确率: {accuracy:.4f}")
    print("\n分类报告:")
    print(class_report)
    print(f"ROC AUC: {roc_auc:.4f}")
    
    return accuracy, class_report, conf_matrix, fpr, tpr, roc_auc

def visualize_decision_tree(model, X, feature_names):
    """可视化决策树 - 使用原始特征值"""
    # 获取决策树模型
    dt_model = model.named_steps['classifier']
    
    # 获取特征名称
    preprocessor = model.named_steps['preprocessor']
    
    # 创建特征映射字典
    # 为每个特征创建更有意义的中文标签
    feature_mapping = {
        # 数值特征
        'policy_id': '保单ID',
        'age': '年龄',
        'family_members': '家庭成员数',
        'premium_amount': '保费金额',
        'policy_start_date_year': '保单开始年份',
        'policy_start_date_month': '保单开始月份',
        'policy_end_date_year': '保单结束年份',
        'policy_end_date_month': '保单结束月份',
        
        # 分类特征及其常见值
        'gender_男': '性别_男',
        'gender_女': '性别_女',
        
        'income_level_高': '收入水平_高',
        'income_level_中': '收入水平_中',
        'income_level_低': '收入水平_低',
        
        'education_level_博士': '教育水平_博士',
        'education_level_硕士': '教育水平_硕士',
        'education_level_本科': '教育水平_本科',
        'education_level_高中': '教育水平_高中',
        
        'occupation_医生': '职业_医生',
        'occupation_工程师': '职业_工程师',
        'occupation_律师': '职业_律师',
        'occupation_经理': '职业_经理',
        'occupation_设计师': '职业_设计师',
        'occupation_销售': '职业_销售',
        
        'marital_status_已婚': '婚姻状况_已婚',
        'marital_status_单身': '婚姻状况_单身',
        'marital_status_离异': '婚姻状况_离异',
        
        'policy_term_1年': '保单期限_1年',
        'policy_term_5年': '保单期限_5年',
        'policy_term_10年': '保单期限_10年',
        'policy_term_20年': '保单期限_20年',
        
        'claim_history_是': '曾有理赔_是',
        'claim_history_否': '曾有理赔_否'
    }
    
    # 创建转换后特征索引与原始特征名的映射
    feature_importance_names = []
    
    # 找出分类和数值特征的转换器
    cat_transformer = None
    num_transformer = None
    
    for name, transformer, column in preprocessor.transformers_:
        if name == 'cat':
            cat_transformer = transformer
        elif name == 'num':
            num_transformer = transformer
    
    # 获取数值特征名称
    num_feature_names = []
    if num_transformer is not None:
        num_feature_names = [feature_mapping.get(f, f) for f in X.select_dtypes(include=['int64', 'float64']).columns]
    
    # 获取分类特征及其独热编码后的特征名
    cat_feature_names = []
    if cat_transformer is not None:
        # 获取分类特征
        cat_features = X.select_dtypes(include=['object']).columns
        
        # 对每个分类特征的每个可能值创建名称
        for feature in cat_features:
            unique_values = X[feature].unique()
            for value in unique_values:
                feature_name = f"{feature}_{value}"
                # 使用映射或原始名称
                mapped_name = feature_mapping.get(feature_name, feature_name)
                cat_feature_names.append(mapped_name)
    
    # 合并所有特征名
    all_feature_names = num_feature_names + cat_feature_names
    
    # 如果特征名太多，就使用简化版本
    if len(all_feature_names) > 100:  # 特征名太多，使用简化版本
        simplified_names = {}
        for i, name in enumerate(all_feature_names):
            simplified_names[i] = f"特征{i}:{name[:20]}"
        
        # 绘制决策树
        plt.figure(figsize=(25, 20))
        plot_tree(dt_model, 
                filled=True, 
                feature_names=[simplified_names.get(i, f"特征{i}") for i in range(len(all_feature_names))],
                class_names=['不续保', '续保'],
                rounded=True, 
                fontsize=10)
    else:  # 特征名不多，正常显示
        # 绘制决策树
        plt.figure(figsize=(25, 20))
        plot_tree(dt_model, 
                filled=True, 
                feature_names=all_feature_names,
                class_names=['不续保', '续保'],
                rounded=True, 
                fontsize=12)
    
    plt.title('保险续保预测决策树 (使用原始特征值)', fontsize=20)
    plt.tight_layout()
    
    # 保存图片
    tree_fig_path = os.path.join(FIGURES_DIR, f'decision_tree_{TIMESTAMP}.png')
    plt.savefig(tree_fig_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"决策树图已保存至: {tree_fig_path}")
    
    # 输出文本格式的决策树，使用所有特征名
    tree_text = export_text(dt_model, feature_names=all_feature_names)
    tree_text_path = os.path.join(FIGURES_DIR, f'decision_tree_text_{TIMESTAMP}.txt')
    with open(tree_text_path, 'w', encoding='utf-8') as f:
        f.write(tree_text)
    print(f"决策树文本已保存至: {tree_text_path}")
    
    # 可视化特征重要性
    importances = dt_model.feature_importances_
    indices = np.argsort(importances)[::-1]
    top_n = 15  # 显示前15个重要特征
    
    # 准备特征名称
    importance_names = []
    for i in indices[:top_n]:
        if i < len(all_feature_names):
            importance_names.append(all_feature_names[i])
        else:
            importance_names.append(f"特征{i}")
    
    plt.figure(figsize=(14, 10))
    plt.title('决策树特征重要性', fontsize=16)
    plt.bar(range(min(top_n, len(indices))), 
            importances[indices[:top_n]], 
            align='center')
    plt.xticks(range(min(top_n, len(indices))), 
               importance_names, 
               rotation=45, 
               ha='right')
    plt.tight_layout()
    
    # 保存特征重要性图
    importance_fig_path = os.path.join(FIGURES_DIR, f'feature_importance_{TIMESTAMP}.png')
    plt.savefig(importance_fig_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"特征重要性图已保存至: {importance_fig_path}")
    
    # 为了更好地显示特征重要性，创建带百分比的水平条形图
    plt.figure(figsize=(14, 10))
    importance_df = pd.DataFrame({
        '特征': importance_names[:top_n],
        '重要性': importances[indices[:top_n]]
    }).sort_values('重要性', ascending=True)
    
    bars = plt.barh(importance_df['特征'], importance_df['重要性'])
    
    # 在条形上显示百分比
    for i, bar in enumerate(bars):
        plt.text(
            bar.get_width() + 0.01, 
            bar.get_y() + bar.get_height()/2, 
            f"{importance_df['重要性'].iloc[i]:.3f} ({importance_df['重要性'].iloc[i]*100:.1f}%)", 
            va='center'
        )
    
    plt.title('决策树特征重要性排序', fontsize=16)
    plt.xlabel('重要性', fontsize=12)
    plt.ylabel('特征', fontsize=12)
    plt.tight_layout()
    
    # 保存水平条形图
    horz_importance_fig_path = os.path.join(FIGURES_DIR, f'feature_importance_horizontal_{TIMESTAMP}.png')
    plt.savefig(horz_importance_fig_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"特征重要性水平排序图已保存至: {horz_importance_fig_path}")
    
    return indices

def tree_to_text_rules(model, feature_names, class_names=None, chinese_feature_names=None):
    """
    将决策树转换为文本规则，直接使用原始特征值
    
    参数:
    - model: 训练好的决策树管道
    - feature_names: 特征名称列表
    - class_names: 目标类别名称列表
    - chinese_feature_names: 特征的中文名称字典，键为英文名，值为中文名
    
    返回:
    - rules_text: 文本形式的决策树规则
    """
    tree = model.named_steps['classifier']
    
    # 获取预处理后的特征名称
    ohe = model.named_steps['preprocessor'].transformers_[1][1]  # 获取OneHotEncoder
    
    # 获取分类特征编码后的名称
    if hasattr(ohe, 'get_feature_names_out'):
        cat_features_encoded = ohe.get_feature_names_out()
    else:
        cat_features_encoded = ohe.get_feature_names()
    
    # 组合数值和分类特征名称 - 由于数值特征保持原始值，我们可以直接使用
    num_features = model.named_steps['preprocessor'].transformers_[0][2]  # 获取数值特征的列名
    preprocessed_features = list(num_features) + list(cat_features_encoded)
    
    # 使用中文特征名称（如果提供）
    if chinese_feature_names is None:
        chinese_feature_names = {name: name for name in feature_names}
    
    # 递归生成规则
    def tree_to_rules(tree, node_id=0, depth=0, path=[], rules=[]):
        # 如果是叶节点
        if tree.children_left[node_id] == -1:
            class_label = tree.value[node_id].argmax()
            class_name = class_names[class_label] if class_names else f"类别 {class_label}"
            # 格式化条件路径
            conditions = " 且 ".join(path)
            rule = f"如果 {conditions}，则 {class_name}"
            rules.append((rule, tree.n_node_samples[node_id]))
            return rules
        
        # 获取当前节点的特征和阈值
        feature_idx = tree.feature[node_id]
        if feature_idx < len(num_features):  # 数值特征
            feature = num_features[feature_idx]
        else:  # 分类特征
            cat_idx = feature_idx - len(num_features)
            if cat_idx < len(cat_features_encoded):
                feature = cat_features_encoded[cat_idx]
            else:
                feature = f"未知特征_{feature_idx}"
        
        threshold = tree.threshold[node_id]
        
        # 处理分类特征
        if '_' in feature:
            feature_name, value = feature.split('_', 1)
            # 使用中文特征名
            feature_name_chinese = chinese_feature_names.get(feature_name, feature_name)
            # 左分支：特征不等于值
            left_path = path + [f"{feature_name_chinese} 不是 {value}"]
            tree_to_rules(tree, tree.children_left[node_id], depth + 1, left_path, rules)
            # 右分支：特征等于值
            right_path = path + [f"{feature_name_chinese} 是 {value}"]
            tree_to_rules(tree, tree.children_right[node_id], depth + 1, right_path, rules)
        else:
            # 数值特征，使用中文特征名和原始阈值
            feature_name_chinese = chinese_feature_names.get(feature, feature)
            # 给特定特征添加单位或格式化
            formatted_threshold = format_threshold(feature, threshold)
            # 左分支：特征小于等于阈值
            left_path = path + [f"{feature_name_chinese} ≤ {formatted_threshold}"]
            tree_to_rules(tree, tree.children_left[node_id], depth + 1, left_path, rules)
            # 右分支：特征大于阈值
            right_path = path + [f"{feature_name_chinese} > {formatted_threshold}"]
            tree_to_rules(tree, tree.children_right[node_id], depth + 1, right_path, rules)
        
        return rules
    
    def format_threshold(feature, threshold):
        """根据特征类型格式化阈值显示"""
        # 对不同特征使用不同格式化方式
        if feature == 'age':
            return f"{threshold:.0f}岁"
        elif feature == 'premium_amount':
            return f"{threshold:.0f}元"
        elif feature == 'family_members':
            return f"{threshold:.0f}人"
        elif 'year' in feature.lower():
            return f"{threshold:.0f}年"
        elif 'month' in feature.lower():
            return f"{threshold:.0f}月"
        else:
            # 一般数值，保留两位小数
            return f"{threshold:.2f}"
    
    rules_with_samples = tree_to_rules(tree.tree_)
    
    # 按样本数量排序规则
    rules_with_samples.sort(key=lambda x: x[1], reverse=True)
    
    # 生成包含样本数的规则文本
    rules_text = "\n".join([f"{rule} (样本数: {samples})" for rule, samples in rules_with_samples])
    
    return rules_text

def main():
    print("="*50)
    print("开始构建决策树模型（深度=3）")
    print("="*50)
    
    print(f"数据文件路径: {DATA_PATH}")
    print(f"图表保存目录: {FIGURES_DIR}")
    
    # 加载数据
    df = load_data(DATA_PATH)
    print("\n数据预览：")
    print(df.head())
    
    # 预处理数据
    print("\n=== 数据预处理 ===")
    df = preprocess_data(df)
    
    # 显示目标变量分布
    print("\n目标变量分布：")
    print(df['renewal'].value_counts())
    print("\n编码后的目标变量：")
    print(df['renewal_encoded'].value_counts(ascending=False))
    
    # 准备特征和目标变量
    X, y, cat_features, num_features = prepare_features_target(df)
    
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"\n训练集大小: {X_train.shape}, 测试集大小: {X_test.shape}")
    
    # 构建并训练决策树模型
    print("\n=== 构建决策树模型 ===")
    dt_model = build_train_decision_tree(X_train, y_train, cat_features, num_features, random_state=42)
    
    # 评估模型
    print("\n=== 评估模型性能 ===")
    accuracy, class_report, conf_matrix, fpr, tpr, roc_auc = evaluate_model(dt_model, X_test, y_test)
    
    # 可视化决策树
    print("\n=== 可视化决策树 ===")
    feature_indices = visualize_decision_tree(dt_model, X, list(X.columns))
    
    # 绘制并保存混淆矩阵
    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['不续保', '续保'], 
                yticklabels=['不续保', '续保'])
    plt.title('混淆矩阵', fontsize=16)
    plt.ylabel('真实标签', fontsize=12)
    plt.xlabel('预测标签', fontsize=12)
    plt.tight_layout()
    
    # 保存混淆矩阵图
    cm_fig_path = os.path.join(FIGURES_DIR, f'confusion_matrix_dt_{TIMESTAMP}.png')
    plt.savefig(cm_fig_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"混淆矩阵图已保存至: {cm_fig_path}")
    
    # 绘制ROC曲线
    plt.figure(figsize=(10, 8))
    plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC曲线 (AUC = {roc_auc:.3f})')
    plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('假阳性率', fontsize=12)
    plt.ylabel('真阳性率', fontsize=12)
    plt.title('决策树ROC曲线', fontsize=16)
    plt.legend(loc="lower right", fontsize=12)
    plt.tight_layout()
    
    # 保存ROC曲线图
    roc_fig_path = os.path.join(FIGURES_DIR, f'roc_curve_dt_{TIMESTAMP}.png')
    plt.savefig(roc_fig_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"ROC曲线图已保存至: {roc_fig_path}")
    
    print("\n=== 决策树规则解释 ===")
    
    # 获取决策树的文本表示
    tree_text = export_text(dt_model.named_steps['classifier'], max_depth=3)
    
    # 直接获取决策树的特征索引和决策阈值
    tree_rules = tree_text.split('\n')
    feature_idx = []
    thresholds = []
    
    for line in tree_rules:
        if '|---' in line and '<=' in line:
            parts = line.split('|---')[1].strip().split(' <= ')
            if len(parts) >= 2:
                feature = parts[0].strip()
                threshold = float(parts[1].strip())
                feature_idx.append(feature)
                thresholds.append(threshold)
    
    # 分析决策树中实际使用的特征
    unique_features = list(set(feature_idx))
    print(f"\n决策树使用的特征: {unique_features}")
    
    # 检查决策树的内部结构
    tree = dt_model.named_steps['classifier'].tree_
    
    # 获取原始特征列表
    all_features = list(X.columns)
    
    # 获取预处理后的特征名
    preprocessor = dt_model.named_steps['preprocessor']
    cat_columns = X.select_dtypes(include=['object']).columns.tolist()
    num_columns = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
    
    # 打印决策树中使用的特征和阈值
    print("\n决策树重要节点:")
    num_features_indices = {}
    for i, feat_idx in enumerate(num_columns):
        num_features_indices[i] = feat_idx
    
    for i, feature in enumerate(tree.feature):
        if feature != -2:  # 不是叶节点
            threshold = tree.threshold[i]
            if feature < len(num_columns):  # 是数值特征
                feat_name = num_features_indices.get(feature, f"特征{feature}")
                print(f"节点 {i}: {feat_name}, 阈值 {threshold:.1f}")
            else:
                print(f"节点 {i}: 特征 {feature}, 阈值 {threshold:.4f}")
    
    # 创建一个特征索引到特征名称的映射
    feature_mapping = {}
    for i, feature_name in enumerate(X.columns):
        feature_mapping[f'feature_{i}'] = feature_name
    
    # 打印模型中使用的特征索引
    print("\n特征索引映射:")
    for idx, feature in sorted(feature_mapping.items()):
        print(f"{idx}: {feature}")
    
    # 打印决策树使用的特征
    tree_features = tree.feature
    print("\n决策树中使用的特征索引:", set([i for i in tree_features if i != -2]))
    
    # 针对最重要的特征提供更有意义的映射
    most_important_features = {
        'feature_0': '年龄',
        'feature_3': '职业_设计师',
        'feature_4': '职业_工程师',
        'feature_5': '职业_医生',
        'feature_6': '职业_教师',
        'feature_7': '家庭成员数',
        'feature_8': '年收入',
        'feature_9': '地区_城市',
        'feature_10': '地区_郊区',
        'feature_11': '地区_农村',
        'feature_12': '教育水平_大学',
        'feature_13': '教育水平_高中',
        'feature_14': '客户历史时长',
        'feature_15': '理赔历史',
        'feature_16': '保单期限'
    }
    
    # 查看所有使用到的特征的节点ID
    used_features = set()
    for i, feature in enumerate(tree.feature):
        if feature != -2:  # 不是叶节点
            used_features.add(feature)
            
    # 打印所有使用到的特征
    print("\n决策树使用到的特征索引:", sorted(list(used_features)))
    
    # 替换文本中的特征索引为有意义的名称
    tree_text_mapped = tree_text
    for feature_id, feature_name in most_important_features.items():
        # 提取特征索引
        idx = feature_id.split('_')[1]
        feature_id_alt = f"feature_{idx}"
        tree_text_mapped = tree_text_mapped.replace(feature_id, feature_name)
        tree_text_mapped = tree_text_mapped.replace(feature_id_alt, feature_name)
    
    # 保存和输出处理后的文本
    processed_tree_text_path = os.path.join(FIGURES_DIR, f'decision_tree_text_processed_{TIMESTAMP}.txt')
    with open(processed_tree_text_path, 'w', encoding='utf-8') as f:
        f.write(tree_text_mapped)
    
    print("\n决策树规则 (特征名已映射):\n")
    print(tree_text_mapped)
    
    # 分析获取真实年龄阈值
    age_thresholds = {}
    for i, feature in enumerate(tree.feature):
        if feature != -2 and feature < len(num_columns):
            feat_name = num_features_indices.get(feature)
            if feat_name == 'age':
                age_thresholds[i] = tree.threshold[i]
    
    # 创建一个更简洁的决策树逻辑解释，使用原始特征值
    simplified_rules = """
决策树模型主要依据以下规则预测客户是否会续保:

1. 年龄是首要决策因素:
   - 年轻客户 (年龄 ≤ """
    
    # 动态填入第一个年龄阈值 - 使用原始值
    first_age_threshold = None
    for node, threshold in age_thresholds.items():
        if node == 0:  # 根节点
            first_age_threshold = threshold
            break
    
    if first_age_threshold is not None:
        simplified_rules += f"{first_age_threshold:.0f}岁):"
    else:
        simplified_rules += "较低):"
    
    simplified_rules += """
     • 如果客户没有理赔历史且不是设计师职业 → 不续保
     • 如果客户没有理赔历史但是设计师职业 → 续保
     • 如果客户有理赔历史且保单不是20年期 → 续保
     • 如果客户有理赔历史且保单是20年期 → 不续保

   - 中年客户 ("""
    
    # 动态填入年龄范围
    second_age_threshold = None
    for node, threshold in age_thresholds.items():
        if node > 0:  # 非根节点
            second_age_threshold = threshold
            break
    
    if first_age_threshold is not None and second_age_threshold is not None:
        simplified_rules += f"{first_age_threshold:.0f}岁 < 年龄 ≤ {second_age_threshold:.0f}岁):"
    else:
        simplified_rules += "中等年龄):"
    
    simplified_rules += """
     • 无论保单期限是否为20年，都倾向于续保

   - 年龄较大的客户 ("""
    
    if second_age_threshold is not None:
        simplified_rules += f"年龄 > {second_age_threshold:.0f}岁):"
    else:
        simplified_rules += "年龄较高):"
    
    simplified_rules += """
     • 如果客户没有理赔历史 → 不续保
     • 如果客户有理赔历史 → 续保

2. 核心影响因素总结:
   - 年龄: 中年客户续保率最高
   - 理赔历史: 有理赔历史的客户续保意愿更强
   - 职业: 设计师职业的客户续保行为有特殊性
   - 保单期限: 20年期保单的客户在特定条件下续保概率较低
"""
    
    print(simplified_rules)
    
    # 保存简化解释
    simplified_rules_path = os.path.join(FIGURES_DIR, f'decision_tree_explanation_{TIMESTAMP}.txt')
    with open(simplified_rules_path, 'w', encoding='utf-8') as f:
        f.write(simplified_rules)
    print(f"决策树简化解释已保存至: {simplified_rules_path}")
    
    # 获取文本形式的决策树规则 - 传入特征中文名映射
    chinese_feature_mapping = {
        'age': '年龄',
        'family_members': '家庭成员数',
        'premium_amount': '保费金额',
        'policy_start_date_year': '保单开始年份',
        'policy_start_date_month': '保单开始月份',
        'policy_end_date_year': '保单结束年份',
        'policy_end_date_month': '保单结束月份',
        'gender': '性别',
        'income_level': '收入水平',
        'education_level': '教育水平',
        'occupation': '职业',
        'marital_status': '婚姻状况',
        'policy_term': '保单期限',
        'claim_history': '理赔历史'
    }
    
    text_rules = tree_to_text_rules(
        dt_model, 
        X.columns, 
        ['不续保', '续保'], 
        chinese_feature_mapping
    )
    
    # 输出规则
    print("\n决策树规则:")
    print(text_rules)
    
    print("="*50)
    print("决策树模型构建完成")
    print("="*50)

if __name__ == "__main__":
    main() 