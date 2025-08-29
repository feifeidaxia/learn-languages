# 多语言学习应用

![App Screenshot](assets/screenshot.png)

一个帮助用户学习多种语言发音的React Native应用，支持英语、中文和日语。

## 功能特性

- 🌍 多语言支持（英语、中文、日语）
- 🎙️ 发音练习与录音功能
- 📊 学习进度跟踪
- 🌙 深色/浅色主题切换
- 🔄 实时语言切换

## 技术栈

- React Native (Expo)
- TypeScript
- 国际化 (i18n)
- Expo Router
- Lucide图标库

## 项目结构

```
project/
├── app/
│   └── (tabs)/
│       ├── index.tsx       # 首页
│       ├── practice.tsx    # 练习页
│       ├── progress.tsx    # 进度页
│       └── settings.tsx   # 设置页
├── components/
│   ├── AudioControls.tsx   # 音频控制组件
│   ├── ScoreItem.tsx      # 分数项组件
│   └── StoryCard.tsx     # 故事卡片组件
├── hooks/
│   ├── useAudio.ts        # 音频处理逻辑
│   ├── useLanguage.tsx    # 国际化逻辑
│   └── useTheme.ts        # 主题管理
└── utils/
    └── ...                # 工具函数
```

## 安装与运行

1. 克隆仓库：
```bash
git clone [仓库地址]
cd project
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm start
```

## 配置

在`hooks/useLanguage.tsx`中添加或修改翻译内容：
```typescript
export const translations = {
  en: {
    // 英文翻译
  },
  zh: {
    // 中文翻译
  },
  ja: {
    // 日文翻译
  }
};
```

## 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

MIT License

## 联系方式

如有问题请联系：18738327026@163.com