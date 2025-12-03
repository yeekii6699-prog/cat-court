import { CatJudge } from "./CatJudge";
import { MoodOption } from "@/types/court";
import { usageSteps } from "@/lib/courtData";

type HeroSectionProps = {
  activeMood: MoodOption;
  snackOffer: number;
};

export function HeroSection({ activeMood, snackOffer }: HeroSectionProps) {
  return (
    <section className="grid gap-10 rounded-[44px] border border-white/60 bg-white/70 px-8 py-10 shadow-[0_35px_120px_rgba(255,179,188,0.45)] backdrop-blur-2xl lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p className="inline-flex items-center rounded-full bg-rose-100/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
          猫猫法官局 Meow Harmony Court
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#512c3e] sm:text-5xl">
          调和情侣的小宇宙
          <br />
          <span className="text-rose-400">让猫猫判决变得软糯可爱</span>
        </h1>
        <p className="mt-4 text-base text-[#7f5565] sm:text-lg">
          填写双方诉求，喵法官会根据表达力度、态度柔软度与仪式感指数，生成错率百分比、吵架分析与暖心建议。所有输出都由云端猫猫脑海合成，帮助你们愈合争吵的小抓痕。
        </p>
        <div className="mt-8 grid gap-4 rounded-[30px] border border-white/70 bg-white/80 p-5 text-sm text-[#714759] shadow-[0_12px_40px_rgba(255,182,193,0.35)] sm:grid-cols-3">
          {usageSteps.map((step) => (
            <div key={step.title} className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-300">
                {step.title}
              </p>
              <p className="text-[13px] text-[#825866]">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <CatJudge mood={activeMood} snackOffer={snackOffer} />
    </section>
  );
}
