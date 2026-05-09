# LinguaFlow 多语种在线教育平台

<div align="center">

![LinguaFlow Logo](https://via.placeholder.com/150x150/1E3A5F/FFFFFF?text=LF)

**让语言学习成为一种流畅自然的体验**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)

[🌐 在线演示](https://linguaflow.vercel.app) | [📖 部署指南](./DEPLOY.md)

</div>

---

## ✨ 功能特性

### 📚 分级课程体系
- 支持英语、日语、韩语三大语种
- 基于 CEFR 标准（A1-C2）等级划分
- 智能学习路径推荐

### 🎮 互动式学习模块
| 模块 | 功能 |
|------|------|
| **单词记忆** | 3D 翻转卡片、艾宾浩斯遗忘曲线、语音朗读 |
| **语法练习** | 互动式填空、即时反馈、分数统计 |
| **口语跟读** | Web Speech API 语音识别、波形可视化、评分系统 |
| **听力训练** | 分级听力材料、语速调节、原文对照 |

### 📊 学习进度追踪
- 热力图日历展示
- 能力雷达图分析
- 周学习时长统计
- 连续学习天数记录

### 🏆 成就激励系统
- 徽章成就收集
- 积分商城兑换
- 学习排行榜

### 💬 社区交流
- 学习心得分享
- 评论互动
- 话题讨论

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **React 18** | 前端框架 |
| **TypeScript** | 类型安全 |
| **Vite 6** | 构建工具 |
| **TailwindCSS 3** | 样式方案 |
| **Zustand 5** | 状态管理 |
| **React Router 6** | 路由管理 |
| **Framer Motion 11** | 动画库 |
| **Recharts 2** | 数据可视化 |
| **Lucide React** | 图标库 |

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/你的用户名/linguaflow.git
cd linguaflow

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
npm run preview  # 预览构建结果
```

---

## 🌿 项目结构

```
src/
├── components/     # 通用组件
│   └── layout/    # 布局组件
├── pages/         # 页面组件
│   ├── Home/      # 首页
│   ├── Auth/      # 认证页面
│   ├── Learn/     # 学习模块
│   ├── Progress/  # 进度追踪
│   ├── Community/ # 社区
│   └── Profile/   # 个人中心
├── stores/        # 状态管理
├── types/         # 类型定义
├── data/          # 模拟数据
└── utils/         # 工具函数
```

---

## 📦 部署

### Vercel（推荐）

1. Fork 此仓库
2. 访问 [Vercel](https://vercel.com)
3. 使用 GitHub 登录并导入项目
4. 自动部署，无需额外配置

### Netlify

1. Fork 此仓库
2. 访问 [Netlify](https://netlify.com)
3. 导入仓库并配置：
   - Build command: `npm run build`
   - Publish directory: `dist`

### 手动部署

```bash
# 构建项目
npm run build

# 上传 dist 目录到服务器
```

---

## 🎨 设计规范

### 色彩系统
| 颜色 | 色值 | 用途 |
|------|------|------|
| Primary | `#1E3A5F` | 主色调、按钮 |
| Secondary | `#FF6B6B` | 辅助色、强调 |
| Accent | `#2ECC71` | 成功、进度 |
| Background | `#FAFBFC` | 背景色 |
| Text | `#2C3E50` | 正文文字 |

### 字体
- **标题**: Poppins
- **正文**: Noto Sans SC
- **代码**: Source Code Pro

---

## 📝 License

本项目基于 [MIT License](./LICENSE) 开源。

---

## 🙏 致谢

- [Unsplash](https://unsplash.com/) - 免费图片素材
- [Lucide](https://lucide.dev/) - 精美图标
- [Google Fonts](https://fonts.google.com/) - 开源字体

---

<div align="center">

**用 ❤️ 和 ☕ 制作**

</div>
