import pandas as pd
import os

# 获取当前脚本的绝对路径
current_dir = os.path.dirname(os.path.abspath(__file__))

# 构建文件的绝对路径
file_path = os.path.join(current_dir, 'data', 'raw', 'policy_data.xlsx')

print(f"尝试读取文件: {file_path}")
print(f"文件是否存在: {os.path.exists(file_path)}")

try:
    # 读取Excel文件
    df = pd.read_excel(file_path)
    
    # 显示前5行数据
    print('\n数据前5行：')
    print(df.head().to_string())
    
    # 显示基本信息
    print('\n数据基本信息：')
    print(f'行数: {df.shape[0]}, 列数: {df.shape[1]}')
    print('\n列名：')
    print(df.columns.tolist())
    
except FileNotFoundError:
    print(f'文件不存在: {file_path}')
except Exception as e:
    print(f'读取文件出错: {str(e)}') 