import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 支持的语言
export type LanguageCode = 'en' | 'zh' | 'ja';

// 语言文本映射
export const translations = {
  en: {
    tabs: {
      stories: 'Stories',
      practice: 'Practice',
      progress: 'Progress',
      settings: 'Settings'
    },
    settings: {
      title: 'Settings',
      audio: 'Audio',
      general: 'General',
      support: 'Support',
      soundEffects: 'Sound Effects',
      soundEffectsSubtitle: 'Play sounds for interactions',
      highQualityAudio: 'High Quality Audio',
      highQualityAudioSubtitle: 'Better audio quality, uses more data',
      autoPlay: 'Auto Play',
      autoPlaySubtitle: 'Automatically play audio when viewing stories',
      notifications: 'Notifications',
      notificationsSubtitle: 'Daily practice reminders',
      darkMode: 'Dark Mode',
      darkModeSubtitle: 'Current',
      languagePreferences: 'Language Preferences',
      languagePreferencesSubtitle: 'Set primary learning language',
      helpFAQ: 'Help & FAQ',
      helpFAQSubtitle: 'Get help and answers',
      rateApp: 'Rate the App',
      rateAppSubtitle: 'Help us improve',
      checkUpdate: 'Check for Updates',
      checkUpdateSubtitle: 'Check for the latest app version',
      version: 'Version',
      madeWith: 'Made with Hong for language learners',
      poweredBy: 'Powered by Cursor',
      light: 'Light',
      dark: 'Dark',
    },
    language: {
      title: 'Language Preferences',
    },
    home: {
      title: 'Multilingual Stories',
      howToUse: 'How to use',
      howToUseText: '• Tap the refresh button to generate a new random story\n• Tap the speaker icons to hear the pronunciation\n• Switch to Practice tab to record yourself\n• Compare your pronunciation with the original'
    },
    practice: {
      title: 'Practice',
      practiceSection: 'Practice Section',
      instructions: '1. Listen to the original pronunciation\n2. Press the record button and speak\n3. Stop recording to get feedback',
      recordingSaved: '✓ Recording saved - Press play to listen',
      recording: 'Recording:'
    },
    update: {
      updateAvailableTitle: 'Update Available',
      updateAvailableMessage: 'New version downloaded, restart the app to apply',
      upToDateTitle: 'Up to Date',
      upToDateMessage: 'You are using the latest version',
      updateErrorTitle: 'Update Error',
      updateErrorMessage: 'Failed to check for updates',
      checkUpdate: 'Check for Updates',
      checkUpdateDescription: 'Click the button below to check for the latest version',
      checkUpdateButton: 'Check for Updates'
    },
    progress: {
      title: 'Progress',
      storiesCompleted: 'Stories Completed',
      thisWeek: '+3 this week',
      averageScore: 'Average Score',
      improvement: '+5% improvement',
      pronunciationGoal: 'Pronunciation Goal',
      toReach: '3% to reach',
      practiceTime: 'Practice Time',
      thisWeekTime: 'This week',
      recentScores: 'Recent Scores',
      achievements: 'Achievements',
      firstPerfectScore: 'First Perfect Score!',
      practiceStreak: 'Practice Streak: 7 days',
      consistentImprovement: 'Consistent Improvement'
    }
  },
  zh: {
    languages: {
      english: '英语',
      chinese: '中文',
      japanese: '日语'
    },
    tabs: {
      stories: '故事',
      practice: '练习',
      progress: '进度',
      settings: '设置'
    },
    settings: {
      title: '设置',
      audio: '音频',
      general: '通用',
      support: '支持',
      soundEffects: '音效',
      soundEffectsSubtitle: '播放交互音效',
      highQualityAudio: '高质量音频',
      highQualityAudioSubtitle: '更好的音质，使用更多数据',
      autoPlay: '自动播放',
      autoPlaySubtitle: '查看故事时自动播放音频',
      notifications: '通知',
      notificationsSubtitle: '每日练习提醒',
      darkMode: '深色模式',
      darkModeSubtitle: '当前',
      languagePreferences: '语言偏好',
      languagePreferencesSubtitle: '设置主要学习语言',
      helpFAQ: '帮助与常见问题',
      helpFAQSubtitle: '获取帮助和解答',
      rateApp: '评价应用',
      rateAppSubtitle: '帮助我们改进',
      checkUpdate: '检查更新',
      checkUpdateSubtitle: '检查应用最新版本',
      version: '版本',
      madeWith: '由Hong为语言学习者精心打造',
      poweredBy: '由Cursor提供技术支持',
      light: '浅色',
      dark: '深色',
    },
    language: {
      title: '语言偏好',
    },
    home: {
      title: '多语言故事',
      howToUse: '使用方法',
      howToUseText: '• 点击刷新按钮生成新的随机故事\n• 点击扬声器图标听发音\n• 切换到练习标签页进行录音\n• 比较你的发音与原始发音'
    },
    practice: {
      title: '练习',
      practiceSection: '练习区域',
      instructions: '1. 听原始发音\n2. 按下录音按钮并说话\n3. 停止录音获取反馈',
      recordingSaved: '✓ 录音已保存 - 按播放键收听',
      recording: '录音中:'
    },
    update: {
      updateAvailableTitle: '更新可用',
      updateAvailableMessage: '新版本已下载，重启应用后生效',
      upToDateTitle: '已是最新',
      upToDateMessage: '当前已是最新版本',
      updateErrorTitle: '更新错误',
      updateErrorMessage: '检查更新失败',
      checkUpdate: '检查更新',
      checkUpdateDescription: '点击下方按钮检查应用最新版本',
      checkUpdateButton: '检查更新'
    },
    progress: {
      title: '进度',
      storiesCompleted: '已完成故事',
      thisWeek: '本周+3',
      averageScore: '平均分数',
      improvement: '+5%提升',
      pronunciationGoal: '发音目标',
      toReach: '还差3%达成',
      practiceTime: '练习时间',
      thisWeekTime: '本周',
      recentScores: '最近分数',
      achievements: '成就',
      firstPerfectScore: '首次满分!',
      practiceStreak: '练习连续: 7天',
      consistentImprovement: '持续进步'
    }
  },
  ja: {
    languages: {
      english: '英語',
      chinese: '中国語',
      japanese: '日本語'
    },
    tabs: {
      stories: 'ストーリー',
      practice: '練習',
      progress: '進捗',
      settings: '設定'
    },
    settings: {
      title: '設定',
      audio: 'オーディオ',
      general: '一般',
      support: 'サポート',
      soundEffects: '効果音',
      soundEffectsSubtitle: 'インタラクション時に音を再生',
      highQualityAudio: '高音質オーディオ',
      highQualityAudioSubtitle: '音質向上、データ使用量増加',
      autoPlay: '自動再生',
      autoPlaySubtitle: 'ストーリー閲覧時に自動再生',
      notifications: '通知',
      notificationsSubtitle: '毎日の練習リマインダー',
      darkMode: 'ダークモード',
      darkModeSubtitle: '現在',
      languagePreferences: '言語設定',
      languagePreferencesSubtitle: '主要学習言語を設定',
      helpFAQ: 'ヘルプとFAQ',
      helpFAQSubtitle: 'サポートと回答を得る',
      rateApp: 'アプリを評価',
      rateAppSubtitle: '改善にご協力ください',
      checkUpdate: 'アップデートを確認',
      checkUpdateSubtitle: '最新バージョンを確認',
      version: 'バージョン',
      madeWith: 'Hongが言語学習者のために作成',
      poweredBy: 'Cursorによる技術提供',
      light: 'ライト',
      dark: 'ダーク',
    },
    language: {
      title: '言語設定',
    },
    home: {
      title: '多言語ストーリー',
      howToUse: '使用方法',
      howToUseText: '• 更新ボタンをタップして新しいストーリーを生成\n• スピーカーアイコンをタップして発音を聞く\n• 練習タブに切り替えて録音する\n• あなたの発音とオリジナルを比較する'
    },
    practice: {
      title: '練習',
      practiceSection: '練習セクション',
      instructions: '1. オリジナルの発音を聞く\n2. 録音ボタンを押して話す\n3. 録音を停止してフィードバックを得る',
      recordingSaved: '✓ 録音が保存されました - 再生ボタンを押して聞く',
      recording: '録音中:'
    },
    update: {
      updateAvailableTitle: 'アップデート可能',
      updateAvailableMessage: '新しいバージョンがダウンロードされました。アプリを再起動してください',
      upToDateTitle: '最新版',
      upToDateMessage: '最新バージョンを使用中です',
      updateErrorTitle: 'アップデートエラー',
      updateErrorMessage: 'アップデートの確認に失敗しました',
      checkUpdate: 'アップデートを確認',
      checkUpdateDescription: '最新バージョンを確認するには下のボタンをクリックしてください',
      checkUpdateButton: 'アップデートを確認'
    },
    progress: {
      title: '進捗',
      storiesCompleted: '完了したストーリー',
      thisWeek: '今週+3',
      averageScore: '平均スコア',
      improvement: '+5%向上',
      pronunciationGoal: '発音目標',
      toReach: '達成まであと3%',
      practiceTime: '練習時間',
      thisWeekTime: '今週',
      recentScores: '最近のスコア',
      achievements: '実績',
      firstPerfectScore: '初めての満点!',
      practiceStreak: '練習連続: 7日間',
      consistentImprovement: '継続的な向上'
    }
  }
};

// 语言上下文类型
type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string, section?: string) => string;
};

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言存储键
const LANGUAGE_KEY = 'user-language';

// 提供者组件
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // 加载保存的语言设置
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'zh' || storedLanguage === 'ja')) {
          setLanguageState(storedLanguage as LanguageCode);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };

    loadLanguage();
  }, []);

  // 设置语言并保存
  const setLanguage = async (code: LanguageCode) => {
    setLanguageState(code);
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, code);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

   // 获取英文翻译作为后备
  const getEnglishTranslation = (key: string, section: string = 'settings') => {
    const keys = key.split('.');
    let result = translations.en;
    
    if (section && result[section]) {
      result = result[section];
    }
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return undefined;
      }
    }
    
    return result as string;
  };

  // 翻译函数
 const t = (key: string, section: string = 'settings') => {
  const keys = key.split('.');
  let result = translations[language];

  // 先按 section 查
  if (section && result[section]) {
    let sectionObj = result[section];
    for (const k of keys) {
      if (sectionObj && sectionObj[k]) {
        return sectionObj[k] as string;
      }
    }
  }

  // 如果没找到，遍历所有一级 section
  for (const sec of Object.keys(result)) {
    let obj: any = result[sec];
    for (const k of keys) {
      if (obj && obj[k]) {
        obj = obj[k];
      } else {
        obj = null;
        break;
      }
    }
    if (obj) return obj as string;
  }

  // 最后 fallback 英文
  return getEnglishTranslation(key, section) || key;
};

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义钩子
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};