# 第一阶段：构建React应用
FROM node:18-alpine as build

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：部署到Nginx
FROM nginx:alpine

# 复制Nginx配置
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物
COPY --from=build /app/build /usr/share/nginx/html

# 容器启动时运行Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 