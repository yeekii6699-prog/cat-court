import { MoodOption } from "@/types/court";

type EmotionFormProps = {
  partnerA: string;
  partnerB: string;
  aStory: string;
  bStory: string;
  mood: string;
  snackOffer: number;
  apologySpark: number;
  stage: number;
  apologyLabel: string;
  moodOptions: MoodOption[];
  onPartnerAChange: (value: string) => void;
  onPartnerBChange: (value: string) => void;
  onAStoryChange: (value: string) => void;
  onBStoryChange: (value: string) => void;
  onMoodChange: (id: string) => void;
  onSnackOfferChange: (value: number) => void;
  onApologySparkChange: (value: number) => void;
};

export function EmotionForm({
  partnerA,
  partnerB,
  aStory,
  bStory,
  mood,
  snackOffer,
  apologySpark,
  stage,
  apologyLabel,
  moodOptions,
  onPartnerAChange,
  onPartnerBChange,
  onAStoryChange,
  onBStoryChange,
  onMoodChange,
  onSnackOfferChange,
  onApologySparkChange,
}: EmotionFormProps) {
  return (
    <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_25px_60px_rgba(255,182,193,0.28)] backdrop-blur-xl">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-[#4b2b39]">情绪笔录</h2>
            <span className="rounded-full bg-rose-50 px-4 py-1 text-sm font-medium text-rose-400">
              阶段 {stage}/3
            </span>
          </div>
          <p className="mt-2 text-sm text-[#906978]">
            喵官偏爱真诚与细节，小字也请写得甜一点。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-[#865a6e]">
              {partnerA ? "当事猫甲" : "填写昵称"}
            </label>
            <input
              value={partnerA}
              onChange={(event) => onPartnerAChange(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-rose-100/60 bg-white/80 px-4 py-3 text-[#501e2b] placeholder:text-rose-200 focus:border-rose-300 focus:outline-none"
              placeholder="比如：小太阳"
            />
          </div>
          <div>
            <label className="text-sm text-[#865a6e]">
              {partnerB ? "当事猫乙" : "填写昵称"}
            </label>
            <input
              value={partnerB}
              onChange={(event) => onPartnerBChange(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-rose-100/60 bg-white/80 px-4 py-3 text-[#501e2b] placeholder:text-rose-200 focus:border-rose-300 focus:outline-none"
              placeholder="比如：星星骑士"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-sm text-[#865a6e]">
              {partnerA || "猫甲"} 的诉求
            </label>
            <textarea
              value={aStory}
              onChange={(event) => onAStoryChange(event.target.value)}
              rows={4}
              className="mt-1 min-h-[140px] w-full rounded-3xl border border-rose-100/60 bg-white/70 px-4 py-3 text-sm text-[#4b2b39] placeholder:text-rose-200 focus:border-rose-300 focus:outline-none"
              placeholder="例：期待多一些主动联系，也想听听你今天的心事。"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-[#865a6e]">
              {partnerB || "猫乙"} 的诉求
            </label>
            <textarea
              value={bStory}
              onChange={(event) => onBStoryChange(event.target.value)}
              rows={4}
              className="mt-1 min-h-[140px] w-full rounded-3xl border border-rose-100/60 bg-white/70 px-4 py-3 text-sm text-[#4b2b39] placeholder:text-rose-200 focus:border-rose-300 focus:outline-none"
              placeholder="例：我只是想被认真的听完，再一起找办法。"
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#754759]">今日吵架氛围</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {moodOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => onMoodChange(item.id)}
                className={`rounded-3xl border px-5 py-3 text-left text-sm transition hover:-translate-y-0.5 ${
                  mood === item.id
                    ? "border-rose-300 bg-gradient-to-br from-rose-50 to-white text-rose-500 shadow-[0_10px_30px_rgba(255,182,193,0.4)]"
                    : "border-white/70 bg-white/60 text-[#7b5161]"
                }`}
              >
                <p className="font-semibold">{item.label}</p>
                <p className="text-xs text-[#b17a90]">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-4">
            <p className="text-sm font-semibold text-[#754759]">猫薄荷供给</p>
            <p className="text-xs text-[#b17a90]">
              {snackOffer < 35
                ? "喵官有点馋，可以多点甜品。"
                : snackOffer > 70
                  ? "猫薄荷充足，判决会更温柔。"
                  : "适量猫薄荷，刚好保持理智。"}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="range"
                min={10}
                max={100}
                value={snackOffer}
                onChange={(event) =>
                  onSnackOfferChange(Number(event.target.value))
                }
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-rose-100 accent-rose-400"
              />
              <span className="w-12 text-right text-sm font-semibold text-rose-400">
                {snackOffer}%
              </span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-4">
            <p className="text-sm font-semibold text-[#754759]">道歉雷达</p>
            <p className="text-xs text-[#b17a90]">{apologyLabel}</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-[#c89aa9]">{partnerA || "猫甲"}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={apologySpark}
                onChange={(event) =>
                  onApologySparkChange(Number(event.target.value))
                }
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-rose-100 accent-rose-400"
              />
              <span className="text-xs text-[#c89aa9]">{partnerB || "猫乙"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
