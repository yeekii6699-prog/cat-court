import { RitualOption } from "@/types/court";

type RitualPanelProps = {
  ritualOptions: RitualOption[];
  selectedRituals: string[];
  ritualScore: number;
  verdictLoading: boolean;
  verdictError: string | null;
  onToggleRitual: (id: string) => void;
  onSummonVerdict: () => void;
  onRandomizeSoftness: () => void;
};

export function RitualPanel({
  ritualOptions,
  selectedRituals,
  ritualScore,
  verdictLoading,
  verdictError,
  onToggleRitual,
  onSummonVerdict,
  onRandomizeSoftness,
}: RitualPanelProps) {
  return (
    <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_25px_60px_rgba(253,214,176,0.3)] backdrop-blur-xl">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-semibold text-[#4b2b39]">可爱停战仪式</h3>
          <span className="text-xs text-[#b17a90]">
            calm score {ritualScore.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-[#906978]">
          仪式越多，喵官越相信你们会好好拥抱。
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {ritualOptions.map((ritual) => {
            const active = selectedRituals.includes(ritual.id);
            return (
              <button
                key={ritual.id}
                onClick={() => onToggleRitual(ritual.id)}
                className={`flex min-w-[180px] flex-1 flex-col rounded-3xl border px-4 py-3 text-left transition ${
                  active
                    ? "border-rose-300 bg-white text-rose-500 shadow-[0_12px_32px_rgba(255,168,198,0.35)]"
                    : "border-white/70 bg-white/60 text-[#714759] hover:border-rose-200"
                }`}
              >
                <span className="text-lg">{ritual.icon}</span>
                <p className="text-sm font-semibold">{ritual.label}</p>
                <p className="text-xs text-[#b17a90]">{ritual.desc}</p>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="flex-1 rounded-3xl bg-gradient-to-r from-rose-300 to-rose-400 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(253,129,178,0.45)] transition hover:-translate-y-0.5 disabled:opacity-60"
            onClick={onSummonVerdict}
            disabled={verdictLoading}
          >
            {verdictLoading ? "喵官连线中..." : "召唤猫猫判决"}
          </button>
          <button
            className="flex-1 rounded-3xl border border-rose-200/70 bg-white/60 py-3 text-sm font-semibold text-rose-400 transition hover:-translate-y-0.5"
            onClick={onRandomizeSoftness}
          >
            撒一把猫薄荷
          </button>
        </div>
        {verdictLoading && (
          <div className="flex items-center gap-2 text-xs text-rose-400">
            <span className="h-2.5 w-2.5 animate-ping rounded-full bg-rose-400" />
            正在连接云端猫猫脑海，请稍候片刻。
          </div>
        )}
        {verdictError && (
          <div className="rounded-2xl border border-rose-200/70 bg-rose-50/80 px-3 py-2 text-xs text-rose-400">
            {verdictError}
          </div>
        )}
      </div>
    </div>
  );
}
