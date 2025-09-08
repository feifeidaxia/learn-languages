import request from '@/utils/request';

export type TTSRequest = {
  text: string;
  voice?: string;
};

/**
 * 调用后端 Gin TTS 接口
 * @param data { text: string, voice?: string }
 * @returns 二进制音频数据 (ArrayBuffer)
 */
export async function fetchTTS(data: TTSRequest): Promise<ArrayBuffer> {
  if (!data.text) {
    throw new Error('Text is required');
  }

  const response = await request.post('/tts', data, {
    responseType: 'arraybuffer', // 关键：要拿到二进制音频
  });

  return response.data;
}
