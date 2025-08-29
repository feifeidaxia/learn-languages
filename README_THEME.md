# Dark Mode 黑夜模式功能说明

## 功能概述

本应用已经集成了完整的Dark Mode黑夜模式功能，支持以下特性：

- 🌓 **两种主题模式**：
  - Light（浅色模式）
  - Dark（深色模式）

- 💾 **主题持久化**：用户的主题选择会自动保存到本地存储
- 🎨 **完整主题覆盖**：所有主要页面和组件都支持主题切换
- 🔄 **实时切换**：无需重启应用，主题切换立即生效

## 使用方法

### 1. 切换主题

1. 进入 **Settings** 标签页
2. 在 **General** 部分找到 **Dark Mode** 设置项
3. 点击开关按钮切换主题：
   - 第一次点击：切换到 Dark 模式
   - 第二次点击：切换回 Light 模式

### 2. 主题状态显示

在 Dark Mode 设置项下方会显示当前主题状态：
- `Current: Light` - 当前使用浅色主题
- `Current: Dark` - 当前使用深色主题

## 技术实现

### 核心文件

- `hooks/useTheme.ts` - 主题管理核心逻辑
- `components/ThemeProvider.tsx` - 主题上下文提供者
- `components/SettingItem.tsx` - 支持主题的设置项组件

### 主题颜色系统

应用使用了一套完整的颜色变量系统：

```typescript
interface ThemeColors {
  background: string;        // 主背景色
  surface: string;          // 卡片/组件背景色
  surfaceVariant: string;   // 次要背景色
  text: string;             // 主要文字色
  textSecondary: string;    // 次要文字色
  textTertiary: string;     // 第三级文字色
  border: string;           // 边框色
  divider: string;          // 分割线色
  primary: string;          // 主色调
  success: string;          // 成功色
  warning: string;          // 警告色
  error: string;            // 错误色
  // ... 更多颜色
}
```

### 支持的页面和组件

以下页面已经完全支持主题切换：

- ✅ **Settings** - 设置页面
- ✅ **Stories** - 故事列表页面
- ✅ **Practice** - 练习页面
- ✅ **Progress** - 进度页面
- ✅ **Language** - 语言选择页面
- ✅ **StoryCard** - 故事卡片组件
- ✅ **AudioControls** - 音频控制组件
- ✅ **PronunciationFeedback** - 发音反馈组件
- ✅ **SettingItem** - 设置项组件
- ✅ **TabLayout** - 底部标签栏
- ✅ **ScoreItem** - 分数项组件

## 自定义主题

### 添加新的主题颜色

在 `hooks/useTheme.ts` 中修改 `lightColors` 和 `darkColors` 对象：

```typescript
const lightColors: ThemeColors = {
  // 添加新的颜色变量
  customColor: '#your-color',
  // ... 其他颜色
};
```

### 在组件中使用主题

```typescript
import { useTheme } from '@/hooks/useTheme';

const MyComponent = () => {
  const { colors, isDark } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Hello World
      </Text>
    </View>
  );
};
```

## 注意事项

1. **性能优化**：主题切换使用 `useCallback` 和 `React.memo` 优化性能
2. **存储安全**：主题设置使用 AsyncStorage 安全存储
3. **实时响应**：主题切换立即生效，无需刷新页面
4. **错误处理**：包含完整的错误处理和回退机制

## 故障排除

### 主题不生效

1. 检查是否正确导入了 `useTheme` hook
2. 确认组件被 `ThemeProvider` 包装
3. 验证颜色变量是否正确使用
4. 检查控制台是否有主题相关的日志输出

### 主题切换卡顿

1. 检查是否有不必要的重新渲染
2. 确认使用了 `useMemo` 优化样式对象
3. 验证 `useCallback` 依赖项设置

### 其他页面主题不更新

1. **已修复**：使用 `useMemo` 优化所有页面的 `dynamicStyles`
2. **已修复**：改进 `useTheme` hook 的全局状态管理
3. **已修复**：添加主题变化监听器，确保所有组件同步更新

## 最新修复 (v2.1.0)

### 🔧 性能优化
- 使用 `useMemo` 优化所有页面的动态样式创建
- 避免每次渲染都重新创建 StyleSheet 对象
- 减少不必要的重新渲染

### 🎯 主题同步修复
- 修复了主题状态在不同组件间不同步的问题
- 实现了全局主题状态管理
- 添加了主题变化监听器系统

### 🐛 调试增强
- 添加了详细的控制台日志
- 便于诊断主题切换问题
- 显示当前主题状态和颜色值

### 📱 组件更新
- 所有主要页面都已优化：Settings, Stories, Practice, Progress
- 所有组件都已优化：StoryCard, SettingItem, AudioControls, PronunciationFeedback
- 确保主题切换时所有UI元素都能正确更新

## 更新日志

### v2.1.0 (最新) - 主题同步修复
- 🔧 修复了主题状态在不同组件间不同步的问题
- 🚀 实现了全局主题状态管理和监听器系统
- ⚡ 使用 `useMemo` 优化所有页面的动态样式创建
- 🐛 添加了详细的控制台日志，便于调试
- ✅ 确保所有页面和组件都能正确响应主题切换

### v2.0.0 - 简化主题系统
- 🎯 简化主题系统，只保留 Light 和 Dark 两种模式
- 🚀 移除 System 模式，提高性能和稳定性
- ✨ 所有页面和组件完全支持主题切换
- 🔧 优化主题切换逻辑，减少不必要的重新渲染

### v1.0.0 - 初始版本
- 🌟 初始版本，支持 Light、Dark、System 三种模式
- 📱 基础页面主题支持
- 💾 主题设置持久化存储

## 未来扩展

- 🌈 支持自定义主题色
- 🎨 支持主题预设包
- 📱 支持动态主题切换动画
- 🌍 支持基于时间的自动主题切换
