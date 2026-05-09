#!/bin/bash

# ========================================
#   LinguaFlow GitHub 推送脚本
# ========================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================"
echo "   LinguaFlow GitHub 推送脚本"
echo -e "========================================${NC}"
echo ""

# 检查Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}[错误] 未检测到 Git，请先安装${NC}"
    echo "下载地址: https://git-scm.com"
    exit 1
fi

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}[错误] 未检测到 Node.js，请先安装${NC}"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}[✓] Git 已安装${NC}"
echo -e "${GREEN}[✓] Node.js 已安装${NC}"
echo ""

# 设置仓库地址
REPO_URL="https://github.com/YOUR_USERNAME/linguaflow.git"
PROJECT_PATH="$(cd "$(dirname "$0")" && pwd)"

cd "$PROJECT_PATH" || exit

echo "项目路径: $PROJECT_PATH"
echo ""

# 初始化Git
if [ -d ".git" ]; then
    echo -e "${YELLOW}[提示] 已初始化Git仓库${NC}"
else
    echo "[1/6] 初始化Git仓库..."
    git init
fi

echo ""
echo "[2/6] 配置Git用户信息..."
read -p "请输入你的GitHub用户名: " GH_USER
read -p "请输入你的GitHub邮箱: " GH_EMAIL

git config user.name "$GH_USER"
git config user.email "$GH_EMAIL"

echo ""
echo "[3/6] 添加远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"

echo ""
echo "[4/6] 添加文件到暂存区..."
git add .

echo ""
echo "[5/6] 提交代码..."
git commit -m "feat: 初始提交 - LinguaFlow 多语种在线教育平台

- 实现首页和用户认证系统
- 开发单词记忆、语法练习、口语跟读、听力训练模块
- 添加学习进度追踪和成就系统
- 集成社区交流功能
- 使用 React + TypeScript + Vite + TailwindCSS"

echo ""
echo "[6/6] 推送到GitHub..."
echo ""
echo -e "${YELLOW}========================================"
echo "   请确保已创建GitHub仓库"
echo "   仓库地址: $REPO_URL"
echo -e "========================================${NC}"
echo ""
echo "首次推送可能需要输入GitHub凭据"
echo ""

git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}========================================"
    echo "   ✓ 推送成功！"
    echo -e "========================================${NC}"
    echo ""
    echo "下一步："
    echo "1. 访问 https://vercel.com"
    echo "2. 使用GitHub登录"
    echo "3. 导入 linguaflow 仓库"
    echo "4. 等待自动部署完成"
    echo ""
else
    echo ""
    echo -e "${RED}[错误] 推送失败，请检查：${NC}"
    echo "1. GitHub仓库是否已创建"
    echo "2. 仓库地址是否正确"
    echo "3. GitHub凭据是否有效"
    echo ""
fi
