export interface Story {
  id: string;
  chinese: {
    text: string;
    pinyin: string;
  };
  english: {
    text: string;
    ipa: string;
  };
  japanese: {
    text: string;
    hiragana: string;
    katakana: string;
  };
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface AudioState {
  isPlaying: boolean;
  isRecording: boolean;
  duration: number;
  position: number;
}

export interface RecordingResult {
  uri: string;
  duration: number;
}

export interface PronunciationScore {
  accuracy: number;
  fluency: number;
  completeness: number;
  overall: number;
}