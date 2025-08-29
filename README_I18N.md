# 国际化(i18n)实现指南

## 核心架构

![国际化架构图](assets/i18n-architecture.png)

项目采用分层国际化方案：
1. **翻译层**：集中管理所有翻译文本
2. **上下文层**：提供语言切换功能
3. **组件层**：消费翻译内容的UI组件

## 核心文件

- `hooks/useLanguage.tsx` - 国际化核心逻辑
- `app/language.tsx` - 语言选择界面
- `components/LocaleSwitcher.tsx` - 语言切换组件(可选)

## 快速开始

### 1. 添加新翻译

在`useLanguage.tsx`中添加翻译内容：

```typescript
export const translations = {
  en: {
    newSection: {
      title: 'New Title',
      subtitle: 'Description here'
    }
  },
  zh: {
    newSection: {
      title: '新标题',
      subtitle: '描述内容'
    }
  },
  ja: {
    newSection: {
      title: '新しいタイトル',
      subtitle: '説明文'
    }
  }
};
```

### 2. 在组件中使用

```typescript
import { useLanguage } from '@/hooks/useLanguage';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <View>
      <Text>{t('title', 'newSection')}</Text>
      <Text>{t('subtitle', 'newSection')}</Text>
    </View>
  );
}
```

## 最佳实践

### 翻译键命名规范
- 使用`camelCase`命名
- 按功能模块分组
- 保持一致性

### 文本组织建议
```typescript
// 推荐 - 按模块组织
const translations = {
  en: {
    login: {
      title: 'Login',
      button: 'Sign In'
    },
    dashboard: {
      title: 'Dashboard'
    }
  }
};

// 不推荐 - 扁平结构
const translations = {
  en: {
    loginTitle: 'Login',
    loginButton: 'Sign In',
    dashboardTitle: 'Dashboard'
  }
};
```

## 高级功能

### 动态参数

```typescript
// 定义
const translations = {
  en: {
    welcome: 'Hello, {name}!'
  }
};

// 使用
t('welcome', '', { name: 'John' });
```

### 复数处理

```typescript
// 定义
const translations = {
  en: {
    itemCount: `{count, plural,
      =0 {No items}
      =1 {1 item}
      other {# items}
    }`
  }
};

// 使用
t('itemCount', '', { count: 5 });
```

## 添加新语言

1. 在`LanguageCode`类型中添加语言代码：
```typescript
export type LanguageCode = 'en' | 'zh' | 'ja' | 'es';
```

2. 添加完整的翻译对象：
```typescript
export const translations = {
  es: {
    // 西班牙语翻译
  }
};
```

3. 在语言选择器中添加选项：
```typescript
const LANGUAGES = [
  // ...
  { code: 'es', name: 'Spanish', localName: 'Español' }
];
```

## 调试技巧

### 常见问题排查
1. **翻译不显示**：
   - 检查键名拼写
   - 验证是否在正确的section中
   - 确保语言已添加到LanguageCode

2. **类型错误**：
   - 检查翻译对象的类型结构
   - 确保所有语言版本结构一致

3. **性能优化**：
   - 使用React.memo避免不必要的重新渲染
   - 对静态文本使用useMemo缓存翻译结果

## 测试指南

### 单元测试示例
```typescript
describe('useLanguage', () => {
  it('should return correct translation', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.t('title', 'settings')).toBe('Settings');
  });
});
```

### 集成测试要点
1. 验证语言切换功能
2. 检查所有界面文本响应语言变化
3. 测试回退机制(缺少翻译时)

## 更新日志

### v1.2.0
- 添加动态参数支持
- 改进类型安全性
- 优化翻译加载性能

### v1.1.0
- 添加日语支持
- 实现自动语言检测
- 优化翻译查找算法

### v1.0.0
- 初始版本
- 支持中英文切换
- 基本翻译功能