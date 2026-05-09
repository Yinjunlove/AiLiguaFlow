# LinguaFlow 部署指南

## 第一步：安装必要的工具

### 1.1 安装 Git for Windows

1. 访问 Git 官网下载：https://git-scm.com/download/win
2. 下载后运行安装程序
3. 安装选项建议：
   - ✅ 添加 Git Bash 到 Windows Terminal
   - ✅ 使用 Nano 作为默认编辑器
   - ✅ 启用符号链接
   - ✅ 使用默认选项即可

### 1.2 安装 Node.js (如果还没安装)

1. 访问 Node.js 官网：https://nodejs.org/
2. 下载 LTS 版本（推荐 v22.x）
3. 安装时保持默认选项

### 1.3 验证安装

打开 PowerShell 或 Git Bash，运行：

```powershell
git --version
node --version
npm --version
```

应该能看到版本号输出。

---

## 第二步：在 GitHub 创建仓库

### 2.1 登录 GitHub

1. 访问 https://github.com
2. 登录你的账户（如果没有请注册）

### 2.2 创建新仓库

1. 点击右上角的 **+** 按钮，选择 **New repository**
2. 填写仓库信息：
   - **Repository name**: `linguaflow`
   - **Description**: `LinguaFlow - 多语种在线教育平台`
   - **选择 Public**（公开仓库才能免费部署）
   - ✅ 勾选 "Add a README file"（可选）
3. 点击 **Create repository**

### 2.3 复制仓库地址

创建成功后，复制仓库的 HTTPS 或 SSH 地址，格式类似：
```
https://github.com/你的用户名/linguaflow.git
```

---

## 第三步：本地配置并推送代码

### 3.1 打开终端

在项目文件夹中打开 PowerShell 或 Git Bash

### 3.2 初始化 Git 仓库

```powershell
cd e:\aiprojects\LinguaFlow
git init
```

### 3.3 配置 Git 用户信息

```powershell
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

### 3.4 添加远程仓库

```powershell
git remote add origin https://github.com/你的用户名/linguaflow.git
```

### 3.5 添加文件并提交

```powershell
git add .
git commit -m "feat: 初始提交 - LinguaFlow 多语种在线教育平台

- 实现首页和用户认证系统
- 开发单词记忆、语法练习、口语跟读、听力训练模块
- 添加学习进度追踪和成就系统
- 集成社区交流功能
- 使用 React + TypeScript + Vite + TailwindCSS"
```

### 3.6 推送到 GitHub

```powershell
git branch -M main
git push -u origin main
```

首次推送可能需要输入 GitHub 用户名和密码（或 Personal Access Token）。

---

## 第四步：部署到 Vercel（推荐，免费且快速）

### 4.1 创建 Vercel 账户

1. 访问 https://vercel.com
2. 使用 GitHub 账户登录（推荐）

### 4.2 导入项目

1. 点击 **Add New...** → **Project**
2. 选择 **Import Git Repository**
3. 在列表中找到 `linguaflow` 仓库
4. 点击 **Import**

### 4.3 配置项目

Vercel 会自动检测到这是 Vite 项目。确认以下配置：
- **Framework Preset**: Vite
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: dist

### 4.4 环境变量（如需要）

通常不需要额外配置，直接点击 **Deploy**

### 4.5 等待部署

部署通常需要 1-2 分钟。完成后，你会获得一个 `.vercel.app` 域名。

---

## 第五步：配置自定义域名（可选）

如果你有自己的域名，可以：

1. 在 Vercel 项目设置中添加域名
2. 在域名服务商处添加 DNS 记录
3. Vercel 会自动配置 SSL 证书

---

## 第六步：更新 GitHub 仓库（可选）

部署成功后，可以更新 README.md 添加徽章和部署链接：

```markdown
# LinguaFlow

多语种在线教育平台 | [在线演示](https://你的项目.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=你的仓库地址)
```

---

## 常用命令速查

```powershell
# 查看 Git 状态
git status

# 查看提交历史
git log --oneline

# 创建新分支
git checkout -b feature/新功能

# 切换分支
git checkout main

# 拉取最新代码
git pull origin main

# 推送代码
git push origin main

# 查看远程仓库
git remote -v
```

---

## 故障排除

### 问题 1：推送时被拒绝

如果提示 `! [rejected] main -> main (fetch first)`，先拉取再推送：

```powershell
git pull origin main --rebase
git push origin main
```

### 问题 2：需要 GitHub 令牌

2021年后 GitHub 需要使用 Personal Access Token 代替密码：
1. GitHub → Settings → Developer settings → Personal access tokens
2. 生成新令牌（classic），勾选 `repo` 权限
3. 使用令牌代替密码登录

### 问题 3：Vercel 部署失败

检查：
- package.json 中的脚本是否正确
- 是否安装了所有依赖（运行 `npm install`）
- 查看 Vercel 部署日志排查错误

---

## 项目已准备就绪

所有代码文件已创建完成，只需：
1. 安装 Git
2. 创建 GitHub 仓库
3. 执行推送命令
4. 在 Vercel 部署

祝你部署顺利！🚀
