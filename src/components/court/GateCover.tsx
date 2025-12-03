type GateCoverProps = {
  gateInput: string;
  gateError: string;
  onGateInputChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function GateCover({
  gateInput,
  gateError,
  onGateInputChange,
  onSubmit,
}: GateCoverProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fff6f9] px-6 py-12 text-center">
      <div className="max-w-md rounded-[36px] border border-white/70 bg-white/90 px-8 py-10 shadow-[0_35px_90px_rgba(255,180,191,0.45)]">
        <p className="inline-flex items-center rounded-full bg-rose-100/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
          猫猫法庭共用口令
        </p>
        <h1 className="mt-5 text-3xl font-semibold text-[#4e2c3b]">
          输入共享密钥后即可进入
        </h1>
        <p className="mt-3 text-sm text-[#906372]">
          只要情侣双方输入同一串口令，就能同步抵达同一个猫猫法庭房间。
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            value={gateInput}
            onChange={(event) => onGateInputChange(event.target.value)}
            placeholder="输入猫猫口令"
            className="w-full rounded-3xl border border-rose-200/70 bg-white/80 px-4 py-3 text-center text-sm text-[#4b2b39] placeholder:text-rose-200 focus:border-rose-300 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-rose-300 to-rose-400 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(253,129,178,0.45)] transition hover:-translate-y-0.5"
          >
            解锁猫猫法庭
          </button>
          {gateError && (
            <p className="text-xs text-rose-400">{gateError}</p>
          )}
        </form>
      </div>
      <p className="mt-6 text-xs text-[#a77686]">
        （部署时在环境变量中配置 NEXT_PUBLIC_COURT_KEY，所有用户输入相同 key 即可入场）
      </p>
    </div>
  );
}
