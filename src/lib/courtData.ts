import {
  HealingStep,
  MoodOption,
  RitualOption,
  TimelineStep,
  UsageStep,
} from "@/types/court";

export const moodOptions: MoodOption[] = [
  {
    id: "purr",
    label: "软萌撒娇",
    desc: "只想被抱紧一点",
    tint: "from-[#ffdbe7] to-[#fff4f9]",
    tilt: -4,
  },
  {
    id: "fire",
    label: "炸毛维权",
    desc: "需要被好好听见",
    tint: "from-[#ffe8c5] to-[#fff7e3]",
    tilt: 6,
  },
  {
    id: "mellow",
    label: "迷糊犯困",
    desc: "懒得吵想睡觉",
    tint: "from-[#e2f7ff] to-[#f3fffe]",
    tilt: -1,
  },
];

export const ritualOptions: RitualOption[] = [
  {
    id: "milk",
    label: "奶茶停战仪式",
    icon: "🧋",
    desc: "甜甜的才有话说",
    effect: -2.5,
  },
  {
    id: "walk",
    label: "月光散步",
    icon: "🌙",
    desc: "换个风景换个语气",
    effect: -1.5,
  },
  {
    id: "sticker",
    label: "10 条贴贴信息",
    icon: "💌",
    desc: "连发 emoji 诚意值 +1",
    effect: -3,
  },
  {
    id: "snack",
    label: "同吃一份甜品",
    icon: "🥧",
    desc: "共享糖份稀释怒气",
    effect: -2,
  },
  {
    id: "nap",
    label: "同步午睡",
    icon: "😴",
    desc: "睡醒谁都不记仇",
    effect: -4,
  },
];

export const catTips = [
  "先讲感受再讲事实，喵官最怕指责开局。",
  "把“你怎么”换成“我希望”，错率立刻下降。",
  "一杯热饮 + 三句感谢 = 最柔软的和解脚本。",
  "在同一个时间线回消息，比输赢更有安全感。",
  "列出下一次约会的小目标，很快就忘了为什么吵架。",
  "用照片回忆美好场景，提醒彼此为什么要在一起。",
];

export const timelineSteps: TimelineStep[] = [
  { title: "情绪接收室", desc: "填写双方诉求", emoji: "📜" },
  { title: "猫草调停台", desc: "猫薄荷 + 仪式筹备", emoji: "🌿" },
  { title: "喵判宣读", desc: "输出错率 & 愈合建议", emoji: "⚖️" },
];

export const usageSteps: UsageStep[] = [
  {
    title: "01 · 记录故事",
    detail: "尽可能描述当下感受与诉求，喵官才能读懂冲突脉络。",
  },
  {
    title: "02 · 调整氛围",
    detail: "选择吵架情绪、猫薄荷供给和贴贴仪式，让背景数据更完整。",
  },
  {
    title: "03 · 召唤猫猫判决",
    detail: "点击按钮呼叫猫猫法庭，判决与分析将由云端喵官合成。",
  },
];

export const soothingSteps: HealingStep[] = [
  {
    title: "慢半拍回应",
    detail:
      "先复述对方一句话，再表达自己需求，让猫猫法官看到共情证据。",
  },
  {
    title: "固定贴贴动作",
    detail: "挑一个共同行动，比如同步喝水或看剧作为停战口令。",
  },
  {
    title: "写下下一次期待",
    detail: "把下一次约定写下来，提醒彼此都在努力靠近。",
  },
];
