"""
保险客户续保预测系统 - Web应用

该模块提供一个Web界面，允许用户:
1. 上传客户数据进行批量预测
2. 输入单个客户信息进行预测
3. 查看预测结果和模型解释
4. 查看数据洞察仪表盘
"""

import os
import logging
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from datetime import datetime
from flask import Flask, request, jsonify, render_template, redirect, url_for, flash, send_file
from werkzeug.utils import secure_filename
import shap

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# 创建Flask应用
app = Flask(__name__)
app.secret_key = "insurance_retention_predictor_secret_key"

# 项目根目录
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# 模型和数据路径
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")
UPLOAD_FOLDER = os.path.join(PROJECT_ROOT, "uploads")
DOWNLOAD_FOLDER = os.path.join(PROJECT_ROOT, "downloads")
ALLOWED_EXTENSIONS = {'csv', 'xlsx'}

# 确保目录存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# 模型加载
def load_model():
    """加载最新的预测模型"""
    try:
        # 查找最新的模型文件
        model_files = [f for f in os.listdir(MODELS_DIR) if f.endswith('.pkl')]
        if not model_files:
            logger.error("未找到模型文件")
            return None
        
        latest_model = max(model_files, key=lambda x: os.path.getmtime(os.path.join(MODELS_DIR, x)))
        model_path = os.path.join(MODELS_DIR, latest_model)
        
        logger.info(f"加载模型：{model_path}")
        model = joblib.load(model_path)
        return model
    
    except Exception as e:
        logger.error(f"加载模型失败: {str(e)}")
        return None

# 预处理器加载
def load_preprocessor():
    """加载数据预处理器"""
    try:
        preprocessor_path = os.path.join(PROJECT_ROOT, "data/processed/preprocessor.pkl")
        if not os.path.exists(preprocessor_path):
            logger.error(f"预处理器文件不存在: {preprocessor_path}")
            return None
        
        logger.info(f"加载预处理器：{preprocessor_path}")
        preprocessor = joblib.load(preprocessor_path)
        return preprocessor
    
    except Exception as e:
        logger.error(f"加载预处理器失败: {str(e)}")
        return None

# 全局变量
model = load_model()
preprocessor = load_preprocessor()

# 工具函数
def allowed_file(filename):
    """检查文件扩展名是否允许"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_data(data):
    """预处理输入数据"""
    if preprocessor is None:
        flash("预处理器加载失败，无法处理数据", "danger")
        return None
    
    try:
        # 应用预处理转换
        processed_data = preprocessor.transform(data)
        return processed_data
    
    except Exception as e:
        logger.error(f"数据预处理失败: {str(e)}")
        return None

def predict_renewal(data):
    """预测客户续保概率"""
    if model is None:
        flash("模型加载失败，无法进行预测", "danger")
        return None
    
    try:
        # 获取预测概率
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(data)[:, 1]  # 获取正类（续保）的概率
        else:
            # 如果模型不支持概率预测，则使用预测值
            probabilities = model.predict(data)
        
        return probabilities
    
    except Exception as e:
        logger.error(f"预测失败: {str(e)}")
        return None

def get_feature_importance(data=None):
    """获取特征重要性"""
    if model is None:
        flash("模型加载失败，无法获取特征重要性", "danger")
        return None
    
    try:
        # 尝试不同的方法获取特征重要性
        if hasattr(model, 'feature_importances_'):
            # 树模型
            importances = model.feature_importances_
            feature_names = model.feature_names_in_ if hasattr(model, 'feature_names_in_') else [f"feature_{i}" for i in range(len(importances))]
            
            # 创建特征重要性DataFrame
            importance_df = pd.DataFrame({
                'Feature': feature_names,
                'Importance': importances
            }).sort_values('Importance', ascending=False)
            
            return importance_df
        
        elif hasattr(model, 'coef_'):
            # 线性模型
            coefficients = model.coef_[0] if model.coef_.ndim > 1 else model.coef_
            feature_names = model.feature_names_in_ if hasattr(model, 'feature_names_in_') else [f"feature_{i}" for i in range(len(coefficients))]
            
            # 创建特征重要性DataFrame
            importance_df = pd.DataFrame({
                'Feature': feature_names,
                'Importance': np.abs(coefficients)  # 使用系数绝对值作为重要性
            }).sort_values('Importance', ascending=False)
            
            return importance_df
        
        else:
            # 使用SHAP值（如果数据可用）
            if data is not None and hasattr(shap, 'Explainer'):
                explainer = shap.Explainer(model)
                shap_values = explainer(data)
                
                # 获取平均绝对SHAP值作为特征重要性
                feature_names = data.columns if hasattr(data, 'columns') else [f"feature_{i}" for i in range(data.shape[1])]
                importances = np.abs(shap_values.values).mean(axis=0)
                
                # 创建特征重要性DataFrame
                importance_df = pd.DataFrame({
                    'Feature': feature_names,
                    'Importance': importances
                }).sort_values('Importance', ascending=False)
                
                return importance_df
        
        return None
    
    except Exception as e:
        logger.error(f"获取特征重要性失败: {str(e)}")
        return None

def plot_to_base64(plt_obj):
    """将Matplotlib图形转换为base64编码的字符串"""
    img = io.BytesIO()
    plt_obj.savefig(img, format='png', bbox_inches='tight')
    img.seek(0)
    encoded = base64.b64encode(img.getvalue()).decode('utf-8')
    plt.close()
    return encoded

# 路由定义
@app.route('/')
def index():
    """主页"""
    return render_template('index.html')

@app.route('/predict_form')
def predict_form():
    """单个客户预测表单页面"""
    return render_template('predict_form.html')

@app.route('/predict_single', methods=['POST'])
def predict_single():
    """处理单个客户预测"""
    if request.method == 'POST':
        try:
            # 收集表单数据
            form_data = {}
            for field in request.form:
                value = request.form[field]
                
                # 尝试转换为数值
                try:
                    if '.' in value:
                        form_data[field] = float(value)
                    else:
                        form_data[field] = int(value)
                except ValueError:
                    form_data[field] = value
            
            # 创建DataFrame
            input_data = pd.DataFrame([form_data])
            
            # 预处理数据
            processed_data = preprocess_data(input_data)
            if processed_data is None:
                flash("数据预处理失败", "danger")
                return redirect(url_for('predict_form'))
            
            # 预测
            probability = predict_renewal(processed_data)[0]
            
            # 获取特征重要性
            importance_df = get_feature_importance(processed_data)
            
            # 生成特征重要性图
            importance_plot = None
            if importance_df is not None:
                plt.figure(figsize=(10, 6))
                sns.barplot(data=importance_df.head(10), x='Importance', y='Feature')
                plt.title('Top 10 特征重要性')
                plt.tight_layout()
                importance_plot = plot_to_base64(plt)
            
            # 渲染结果页面
            return render_template(
                'prediction_result.html',
                customer_data=form_data,
                probability=probability,
                importance_plot=importance_plot
            )
        
        except Exception as e:
            logger.error(f"单个客户预测失败: {str(e)}")
            flash(f"预测过程中发生错误: {str(e)}", "danger")
            return redirect(url_for('predict_form'))

@app.route('/batch_upload')
def batch_upload():
    """批量预测上传页面"""
    return render_template('batch_upload.html')

@app.route('/predict_batch', methods=['POST'])
def predict_batch():
    """处理批量客户预测"""
    if request.method == 'POST':
        # 检查是否有上传文件
        if 'file' not in request.files:
            flash('未找到文件', 'danger')
            return redirect(url_for('batch_upload'))
        
        file = request.files['file']
        
        # 如果用户未选择文件
        if file.filename == '':
            flash('未选择文件', 'danger')
            return redirect(url_for('batch_upload'))
        
        # 检查文件扩展名
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)
            
            try:
                # 根据文件类型加载数据
                if filename.endswith('.csv'):
                    data = pd.read_csv(file_path)
                else:  # xlsx
                    data = pd.read_excel(file_path)
                
                # 预处理数据
                processed_data = preprocess_data(data)
                if processed_data is None:
                    flash("数据预处理失败", "danger")
                    return redirect(url_for('batch_upload'))
                
                # 预测
                probabilities = predict_renewal(processed_data)
                
                # 添加预测结果
                data['RenewalProbability'] = probabilities
                data['PredictedRenewal'] = (probabilities >= 0.5).astype(int)
                
                # 保存结果文件
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                result_filename = f"prediction_results_{timestamp}.csv"
                result_path = os.path.join(DOWNLOAD_FOLDER, result_filename)
                data.to_csv(result_path, index=False)
                
                # 重定向到结果页面
                return redirect(url_for('prediction_results', filename=result_filename))
            
            except Exception as e:
                logger.error(f"批量预测失败: {str(e)}")
                flash(f"预测过程中发生错误: {str(e)}", "danger")
                return redirect(url_for('batch_upload'))
        
        else:
            flash('不支持的文件类型，请上传CSV或Excel文件', 'danger')
            return redirect(url_for('batch_upload'))

@app.route('/prediction_results/<filename>')
def prediction_results(filename):
    """显示批量预测结果"""
    try:
        result_path = os.path.join(DOWNLOAD_FOLDER, filename)
        if not os.path.exists(result_path):
            flash("结果文件不存在", "danger")
            return redirect(url_for('batch_upload'))
        
        # 读取预测结果
        results = pd.read_csv(result_path)
        
        # 计算基本统计信息
        total_count = len(results)
        predicted_renewal_count = results['PredictedRenewal'].sum()
        predicted_renewal_rate = predicted_renewal_count / total_count * 100
        
        # 生成预测分布图
        plt.figure(figsize=(10, 6))
        sns.histplot(results['RenewalProbability'], bins=20, kde=True)
        plt.title('续保概率分布')
        plt.xlabel('续保概率')
        plt.ylabel('客户数量')
        plt.axvline(x=0.5, color='red', linestyle='--', label='决策阈值 (0.5)')
        plt.legend()
        probability_dist_plot = plot_to_base64(plt)
        
        # 如果数据中有实际的续保标签，计算模型性能
        model_performance = None
        if 'Renewed' in results.columns:
            from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
            
            actual = results['Renewed']
            predicted = results['PredictedRenewal']
            probabilities = results['RenewalProbability']
            
            performance = {
                'accuracy': accuracy_score(actual, predicted),
                'precision': precision_score(actual, predicted),
                'recall': recall_score(actual, predicted),
                'f1': f1_score(actual, predicted),
                'roc_auc': roc_auc_score(actual, probabilities)
            }
            
            model_performance = {k: f"{v:.4f}" for k, v in performance.items()}
        
        return render_template(
            'batch_results.html',
            filename=filename,
            total_count=total_count,
            predicted_renewal_count=predicted_renewal_count,
            predicted_renewal_rate=predicted_renewal_rate,
            probability_dist_plot=probability_dist_plot,
            model_performance=model_performance
        )
    
    except Exception as e:
        logger.error(f"显示批量预测结果失败: {str(e)}")
        flash(f"显示结果时发生错误: {str(e)}", "danger")
        return redirect(url_for('batch_upload'))

@app.route('/download_results/<filename>')
def download_results(filename):
    """下载预测结果文件"""
    try:
        return send_file(
            os.path.join(DOWNLOAD_FOLDER, filename),
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        logger.error(f"下载结果文件失败: {str(e)}")
        flash(f"下载文件时发生错误: {str(e)}", "danger")
        return redirect(url_for('prediction_results', filename=filename))

@app.route('/dashboard')
def dashboard():
    """数据洞察仪表盘"""
    return render_template('dashboard.html')

@app.route('/about')
def about():
    """关于页面"""
    return render_template('about.html')

# 运行应用
if __name__ == '__main__':
    app.run(debug=True, port=5000) 