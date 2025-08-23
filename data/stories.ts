import { Story } from '@/types/Story';

export const stories: Story[] = [
  {
    id: '1',
    chinese: {
      text: '今天天气真好，我想去公园散步。',
      pinyin: 'Jīntiān tiānqì zhēn hǎo, wǒ xiǎng qù gōngyuán sànbù.',
    },
    english: {
      text: 'The weather is really nice today, I want to go for a walk in the park.',
      ipa: 'ðə ˈwɛðər ɪz ˈrɪli naɪs təˈdeɪ, aɪ wɑnt tu goʊ fɔr ə wɔk ɪn ðə pɑrk.',
    },
    japanese: {
      text: '今日は本当にいい天気ですね。公園を散歩したいです。',
      hiragana:
        'きょうはほんとうにいいてんきですね。こうえんをさんぽしたいです。',
      katakana:
        'キョウハホントウニイイテンキデスネ。コウエンヲサンポシタイデス。',
    },
    category: 'daily_life',
    difficulty: 'beginner',
  },
  {
    id: '2',
    chinese: {
      text: '学习语言需要耐心和坚持。',
      pinyin: 'Xuéxí yǔyán xūyào nàixīn hé jiānchí.',
    },
    english: {
      text: 'Learning languages requires patience and persistence.',
      ipa: 'ˈlɜrnɪŋ ˈlæŋgwɪʤɪz rɪˈkwaɪərz ˈpeɪʃəns ænd pərˈsɪstəns.',
    },
    japanese: {
      text: '言語を学ぶには忍耐力と継続が必要です。',
      hiragana: 'げんごをまなぶにはにんたいりょくとけいぞくがひつようです。',
      katakana: 'ゲンゴヲマナブニハニンタイリョクトケイゾクガヒツヨウデス。',
    },
    category: 'education',
    difficulty: 'intermediate',
  },
  {
    id: '3',
    chinese: {
      text: '音乐能够治愈心灵，带来内心的平静。',
      pinyin: 'Yīnyuè nénggòu zhìyù xīnlíng, dàilái nèixīn de píngjìng.',
    },
    english: {
      text: 'Music can heal the soul and bring inner peace.',
      ipa: 'ˈmjuzɪk kæn hil ðə soʊl ænd brɪŋ ˈɪnər pis.',
    },
    japanese: {
      text: '音楽は心を癒し、内なる平和をもたらします。',
      hiragana: 'おんがくはこころをいやし、うちなるへいわをもたらします。',
      katakana: 'オンガクハココロヲイヤシ、ウチナルヘイワヲモタラシマス。',
    },
    category: 'philosophy',
    difficulty: 'advanced',
  },
  {
    id: '4',
    chinese: {
      text: '朋友之间的友谊是珍贵的财富。',
      pinyin: 'Péngyǒu zhījiān de yǒuyì shì zhēnguì de cáifù.',
    },
    english: {
      text: 'Friendship between friends is a precious treasure.',
      ipa: 'ˈfrɛndʃɪp bɪˈtwin frɛndz ɪz ə ˈprɛʃəs ˈtrɛʒər.',
    },
    japanese: {
      text: '友達同士の友情は貴重な宝物です。',
      hiragana: 'ともだちどうしのゆうじょうはきちょうなたからものです。',
      katakana: 'トモダチドウシノユウジョウハキチョウナタカラモノデス。',
    },
    category: 'relationships',
    difficulty: 'beginner',
  },
  {
    id: '5',
    chinese: {
      text: '努力工作的人终将获得成功。',
      pinyin: 'Nǔlì gōngzuò de rén zhōng jiāng huòdé chénggōng.',
    },
    english: {
      text: 'People who work hard will eventually achieve success.',
      ipa: 'ˈpipəl hu wɜrk hɑrd wɪl ɪˈvɛnʧuəli əˈʧiv səkˈsɛs.',
    },
    japanese: {
      text: '一生懸命働く人はいずれ成功を手にします。',
      hiragana: 'いっしょうけんめいはたらくひとはいずれせいこうをてにします。',
      katakana: 'イッショウケンメイハタラクヒトハイズレセイコウヲテニシマス。',
    },
    category: 'motivation',
    difficulty: 'intermediate',
  },
];

export const getRandomStory = (): Story => {
  const randomIndex = Math.floor(Math.random() * stories.length);
  return stories[randomIndex];
};
