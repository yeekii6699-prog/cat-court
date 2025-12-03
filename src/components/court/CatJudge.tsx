import { MoodOption } from "@/types/court";

type CatJudgeProps = {
  mood: MoodOption;
  snackOffer: number;
};

export function CatJudge({ mood, snackOffer }: CatJudgeProps) {
  const eyeOffset = (snackOffer - 50) / 18;

  return (
    <div className="relative rounded-[36px] border border-white/40 bg-white/70 px-6 py-8 shadow-[0_25px_70px_rgba(255,192,203,0.45)] backdrop-blur-xl">
      <div className="mx-auto w-48">
        <svg viewBox="0 0 220 220" className="h-48 w-48">
          <defs>
            <linearGradient id="catFace" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#fff5fb" />
              <stop offset="100%" stopColor="#ffe3f2" />
            </linearGradient>
            <linearGradient id="catEar" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#ffc9dd" />
              <stop offset="100%" stopColor="#ffe8f3" />
            </linearGradient>
          </defs>
          <polygon
            points="65,40 95,15 110,60"
            fill="url(#catEar)"
            opacity="0.9"
          />
          <polygon
            points="125,60 145,15 175,40"
            fill="url(#catEar)"
            opacity="0.9"
          />
          <circle cx="110" cy="120" r="80" fill="url(#catFace)" />
          <ellipse
            cx="80"
            cy={120 + eyeOffset}
            rx="16"
            ry="22"
            fill="#fff"
          />
          <ellipse
            cx="140"
            cy={120 - eyeOffset}
            rx="16"
            ry="22"
            fill="#fff"
          />
          <circle cx={80 + eyeOffset} cy={120 + eyeOffset / 2} r="7" fill="#2f2f2f" />
          <circle cx={140 + eyeOffset} cy={120 - eyeOffset / 2} r="7" fill="#2f2f2f" />
          <path
            d="M95 140 Q110 150 125 140"
            stroke="#ff7fa2"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M108 132 Q110 138 112 132"
            stroke="#ff9ab8"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="65" cy="140" r="7" fill="#ffd1de" opacity="0.8" />
          <circle cx="155" cy="140" r="7" fill="#ffd1de" opacity="0.8" />
        </svg>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm font-semibold text-rose-400">今日执喵官</p>
        <p className="mt-1 text-2xl font-semibold text-rose-500">暖法官 糖糖</p>
        <p className="mt-2 text-sm text-rose-500/80">
          当前情绪：{mood.label} · 猫薄荷舒缓指数 {snackOffer}%
        </p>
      </div>
    </div>
  );
}
