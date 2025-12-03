import {
  HealingStep,
  TimelineStep,
  Verdict,
} from "@/types/court";

type RightColumnProps = {
  stage: number;
  helperTip: string;
  selectedRitualsCount: number;
  timelineSteps: TimelineStep[];
  verdict: Verdict | null;
  verdictOrigin: "cloud" | "soothe" | null;
  partnerA: string;
  partnerB: string;
  analysisSummary: string[];
  keywordTags: string[];
  healingSteps: HealingStep[];
  empathyLines: string[];
  futurePromise: string;
  ritualIdea: string;
};

export function RightColumn({
  stage,
  helperTip,
  selectedRitualsCount,
  timelineSteps,
  verdict,
  verdictOrigin,
  partnerA,
  partnerB,
  analysisSummary,
  keywordTags,
  healingSteps,
  empathyLines,
  futurePromise,
  ritualIdea,
}: RightColumnProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/60 bg-white/85 p-6 shadow-[0_20px_60px_rgba(214,234,255,0.5)] backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-[#4b2b39]">调停进度</h3>
        <div className="mt-4 space-y-4">
          {timelineSteps.map((step, index) => {
            const active = stage >= index + 1;
            return (
              <div
                key={step.title}
                className={`flex items-start gap-3 rounded-3xl border px-4 py-3 ${
                  active
                    ? "border-rose-200 bg-rose-50/70 text-[#4b2b39]"
                    : "border-white/70 bg-white/50 text-[#a07b8c]"
                }`}
              >
                <div className="text-xl">{step.emoji}</div>
                <div>
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-xs">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-[0_20px_60px_rgba(255,236,210,0.6)] backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-[#4b2b39]">喵官即时提醒</h3>
        <p className="mt-3 text-sm text-[#7f5565]">{helperTip}</p>
        <div className="mt-4 rounded-3xl bg-rose-50/80 px-4 py-3 text-xs text-rose-400">
          ⚡ 仪式激励：已点亮 {selectedRitualsCount} 项贴贴动作
        </div>
      </div>

      <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-white/90 to-[#fff8f0]/90 p-7 shadow-[0_25px_75px_rgba(255,201,214,0.55)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-[#4b2b39]">今日判决</h3>
            {verdictOrigin && (
              <span
                className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${
                  verdictOrigin === "cloud"
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-amber-50 text-amber-500"
                }`}
              >
                {verdictOrigin === "cloud" ? "云端猫猫判定" : "离线柔软判定"}
              </span>
            )}
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-rose-300">
            percent
          </span>
        </div>
        {verdict ? (
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-[#b17a90]">{partnerA || "猫甲"} 的错率</p>
              <div className="mt-1 flex items-center gap-3">
                <div className="h-3 flex-1 rounded-full bg-rose-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-300 to-rose-500"
                    style={{ width: `${verdict.aPercent}%` }}
                  />
                </div>
                <span className="w-12 text-right text-sm font-semibold text-rose-500">
                  {verdict.aPercent}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#b17a90]">{partnerB || "猫乙"} 的错率</p>
              <div className="mt-1 flex items-center gap-3">
                <div className="h-3 flex-1 rounded-full bg-emerald-50">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-200 to-emerald-400"
                    style={{ width: `${verdict.bPercent}%` }}
                  />
                </div>
                <span className="w-12 text-right text-sm font-semibold text-emerald-500">
                  {verdict.bPercent}%
                </span>
              </div>
            </div>
            <div className="rounded-3xl bg-white/90 px-5 py-4 text-sm text-[#6f485a] shadow-inner">
              <p className="font-semibold text-rose-500">{verdict.catComment}</p>
              <p className="mt-2 text-xs text-[#835363]">{verdict.suggestion}</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-rose-200/70 px-4 py-8 text-center text-sm text-[#a88393]">
            输入完毕后点击「召唤猫猫判决」，喵官会把分析结果回传到这里。
          </div>
        )}
      </div>

      <div className="rounded-[32px] border border-white/60 bg-white/95 p-6 shadow-[0_25px_70px_rgba(197,220,255,0.45)] backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl	font-semibold text-[#4b2b39]">猫猫吵架分析</h3>
          {analysisSummary.length > 0 && (
            <p className="text-xs text-emerald-400">喵官已回传洞察</p>
          )}
        </div>
        {analysisSummary.length ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#6f4c5c]">
            {analysisSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-[#a88393]">
            还没有分析内容。提交诉求后，喵官会总结争吵动因与情绪状态。
          </p>
        )}
        {keywordTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {keywordTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-rose-100/80 px-3 py-1 text-xs text-rose-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {healingSteps.length > 0 && (
          <div className="mt-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300">
              HEALING STEPS
            </p>
            {healingSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/80 bg-white/70 px-4 py-3 text-sm text-[#6b3f54]"
              >
                <p className="font-semibold text-[#eb769f]">{step.title}</p>
                <p className="mt-1 text-xs text-[#875869]">{step.detail}</p>
              </div>
            ))}
          </div>
        )}
        {empathyLines.length > 0 && (
          <div className="mt-5 space-y-2 rounded-3xl bg-[#fff2f8] px-4 py-4 text-left text-sm text-[#7b4c60]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300">
              猫猫话术
            </p>
            {empathyLines.map((line) => (
              <p key={line} className="text-sm">
                {line}
              </p>
            ))}
          </div>
        )}
        {futurePromise && (
          <div className="mt-4 rounded-3xl border border-dashed border-rose-200/80 px-4 py-3 text-xs text-[#a25a72]">
            🌈 下一次的约定：{futurePromise}
          </div>
        )}
        {ritualIdea && (
          <div className="mt-4 rounded-3xl bg-rose-50/90 px-4 py-3 text-xs text-[#a25a72]">
            💡 仪式灵感：{ritualIdea}
          </div>
        )}
      </div>
    </div>
  );
}
