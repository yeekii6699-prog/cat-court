export type MoodOption = {
  id: string;
  label: string;
  desc: string;
  tint: string;
  tilt: number;
};

export type RitualOption = {
  id: string;
  label: string;
  icon: string;
  desc: string;
  effect: number;
};

export type Verdict = {
  aPercent: number;
  bPercent: number;
  catComment: string;
  suggestion: string;
};

export type HealingStep = {
  title: string;
  detail: string;
};

export type LocalBundle = {
  verdict: Verdict;
  analysisSummary: string[];
  healingSteps: HealingStep[];
  ritualIdea: string;
  keywordTags: string[];
  empathyLines: string[];
  futurePromise: string;
};

export type TimelineStep = {
  title: string;
  desc: string;
  emoji: string;
};

export type UsageStep = {
  title: string;
  detail: string;
};
