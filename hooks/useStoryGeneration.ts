import { useState, useCallback } from 'react';
import { Story } from '@/types/Story';
import { getRandomStory } from '@/data/stories';
import { generateStory } from '@/api/story';

export const useStoryGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNewStory = useCallback(async (): Promise<Story> => {
    setIsGenerating(true);
    setError(null);

    try {
      // 尝试使用后端API
      console.log('🔄 尝试使用后端API生成故事...');
      const newStory = await generateStory();
      console.log('📖 成功从后端获取故事:', newStory);
      setIsGenerating(false);
      return newStory;
    } catch (backendError) {
      // console.error('❌ 后端API失败，使用本地故事:', backendError);
      setIsGenerating(false);

      // 返回本地随机故事作为回退
      return getRandomStory();
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isGenerating,
    error,
    generateNewStory,
    clearError,
  };
};
