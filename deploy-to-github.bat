@echo off
chcp 65001 >nul
echo ========================================
echo   LinguaFlow GitHub 推送脚本
echo ========================================
echo.

:: 检查是否安装了Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装 Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

:: 检查是否安装了Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Git 已安装
echo [✓] Node.js 已安装
echo.

:: 设置变量
set REPO_URL=https://github.com/YOUR_USERNAME/linguaflow.git
set PROJECT_PATH=%~dp0

cd /d "%PROJECT_PATH%"

echo 项目路径: %PROJECT_PATH%
echo.

:: 检查是否已是Git仓库
if exist ".git" (
    echo [提示] 已初始化Git仓库
) else (
    echo [1/6] 初始化Git仓库...
    git init
    if %errorlevel% neq 0 (
        echo [错误] Git初始化失败
        pause
        exit /b 1
    )
)

echo.
echo [2/6] 配置Git用户信息...
echo 请输入你的GitHub用户名和邮箱
set /p GH_USER= GitHub用户名: 
set /p GH_EMAIL= GitHub邮箱: 

git config user.name "%GH_USER%"
git config user.email "%GH_EMAIL%"

echo.
echo [3/6] 添加远程仓库...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo [4/6] 添加文件到暂存区...
git add .

echo.
echo [5/6] 提交代码...
git commit -m "feat: 初始提交 - LinguaFlow 多语种在线教育平台

- 实现首页和用户认证系统
- 开发单词记忆、语法练习、口语跟读、听力训练模块
- 添加学习进度追踪和成就系统
- 集成社区交流功能
- 使用 React + TypeScript + Vite + TailwindCSS"

echo.
echo [6/6] 推送到GitHub...
echo.
echo ========================================
echo   请确保已创建GitHub仓库
echo   仓库地址: %REPO_URL%
echo ========================================
echo.
echo 首次推送可能需要输入GitHub凭据
echo.
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✓ 推送成功！
    echo ========================================
    echo.
    echo 下一步：
    echo 1. 访问 https://vercel.com
    echo 2. 使用GitHub登录
    echo 3. 导入 linguaflow 仓库
    echo 4. 等待自动部署完成
    echo.
) else (
    echo.
    echo [错误] 推送失败，请检查：
    echo 1. GitHub仓库是否已创建
    echo 2. 仓库地址是否正确
    echo 3. GitHub凭据是否有效
    echo.
)

pause
