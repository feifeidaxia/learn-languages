import request from '@/utils/request';
import { Story } from '@/types/Story';

interface BackendRawResponse {
  reply: string;
}

export async function generateStory(): Promise<Story> {
  const prompt = `请生成一个多语言短句或故事，包含以下要求：

1. 内容必须生动有趣，适合语言学习，避免和之前生成的内容重复。
2 禁止固定使用相同的开头或模板，风格可以变化（例如对话、格言、故事片段、叙述）。
3 需要包含中文、英文、日文三种语言
4 中文需要提供拼音
5 英文需要提供IPA音标
6 日文只需提供平假名（hiragana），不需要片假名
7 每次随机选择一个类别：daily_life, education, philosophy, relationships, motivation, travel, food, nature, technology, culture
8 每次随机选择一个难度级别：beginner, intermediate, advanced

请以JSON格式返回，格式如下：
{
  "id": "随机ID",
  "chinese": { "text": "中文短句或故事", "pinyin": "拼音" },
  "english": { "text": "英文短句或故事", "ipa": "IPA音标" },
  "japanese": { "text": "日文短句或故事", "hiragana": "平假名" },
  "category": "故事类别",
  "difficulty": "难度级别"
}

只返回JSON格式，不要其他内容。`;

  try {
    const response = await request.post(
      '/chat',
      {
        messages: [
          {
            role: 'system',
            content:
              '你是一个多语言故事生成专家。请生成符合要求的多语言故事，确保内容有趣、教育性强，适合成年人语言学习。',
          },
          { role: 'user', content: prompt },
        ],
        model: 'gpt-4o-mini',
        max_tokens: 1000,
        temperature: 0.9,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const rawData: BackendRawResponse = response.data;

    let story: Story;
    try {
      story = JSON.parse(rawData.reply);
    } catch (e) {
      console.error('Failed to parse story JSON:', e);
      throw new Error('Failed to parse story JSON from backend');
    }

    validateStoryData(story);

    return story;
  } catch (error) {
    console.error('Backend API request failed:', error);
    throw error;
  }
}

function validateStoryData(data: any): asserts data is Story {
  if (
    !data.id ||
    !data.chinese ||
    !data.english ||
    !data.japanese ||
    !data.category ||
    !data.difficulty
  ) {
    throw new Error('Invalid story data structure from backend');
  }
  if (!data.chinese.text || !data.chinese.pinyin)
    throw new Error('Invalid chinese fields');
  if (!data.english.text || !data.english.ipa)
    throw new Error('Invalid english fields');
  if (!data.japanese.text || !data.japanese.hiragana)
    throw new Error('Invalid japanese fields');
}
