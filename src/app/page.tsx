"use client";

import { useEffect, useMemo, useState } from "react";
import {
  catTips,
  moodOptions,
  ritualOptions,
  timelineSteps,
} from "@/lib/courtData";
import {
  HealingStep,
  LocalBundle,
  MoodOption,
  Verdict,
} from "@/types/court";
import { HeroSection } from "@/components/court/HeroSection";
import { EmotionForm } from "@/components/court/EmotionForm";
import { RitualPanel } from "@/components/court/RitualPanel";
import { RightColumn } from "@/components/court/RightColumn";
import { GateCover } from "@/components/court/GateCover";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function Home() {
  const requiredKey = process.env.NEXT_PUBLIC_COURT_KEY;
  const [gatePassed, setGatePassed] = useState(() => !requiredKey);
  const [gateInput, setGateInput] = useState("");
  const [gateError, setGateError] = useState("");

  useEffect(() => {
    if (!requiredKey) return;
    const cached = window.localStorage.getItem("catCourtKey");
    if (cached && cached === requiredKey) {
      setGatePassed(true);
    }
  }, [requiredKey]);

  const handleGateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requiredKey) {
      setGatePassed(true);
      return;
    }
    if (gateInput.trim() === requiredKey) {
      window.localStorage.setItem("catCourtKey", requiredKey);
      setGatePassed(true);
      setGateError("");
    } else {
      setGateError("口令对不上哦，再和同伴确认一下共享密钥。");
    }
  };

  const [partnerA, setPartnerA] = useState("猫甲");
  const [partnerB, setPartnerB] = useState("猫乙");
  const [aStory, setAStory] = useState("");
  const [bStory, setBStory] = useState("");
  const [mood, setMood] = useState<MoodOption["id"]>("purr");
  const [snackOffer, setSnackOffer] = useState(45);
  const [apologySpark, setApologySpark] = useState(55);
  const [selectedRituals, setSelectedRituals] = useState<string[]>(["milk"]);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [analysisSummary, setAnalysisSummary] = useState<string[]>([]);
  const [healingSteps, setHealingSteps] = useState<HealingStep[]>([]);
  const [ritualIdea, setRitualIdea] = useState<string>("");
  const [keywordTags, setKeywordTags] = useState<string[]>([]);
  const [empathyLines, setEmpathyLines] = useState<string[]>([]);
  const [futurePromise, setFuturePromise] = useState("");
  const [verdictOrigin, setVerdictOrigin] = useState<"cloud" | "soothe" | null>(
    null,
  );
  const [verdictLoading, setVerdictLoading] = useState(false);
  const [verdictError, setVerdictError] = useState<string | null>(null);

  const activeMood = useMemo(
    () => moodOptions.find((item) => item.id === mood) ?? moodOptions[0],
    [mood],
  );

  const ritualScore = useMemo(
    () =>
      selectedRituals.reduce((acc, id) => {
        const ritual = ritualOptions.find((item) => item.id === id);
        return acc + (ritual?.effect ?? 0);
      }, 0),
    [selectedRituals],
  );

  const stage = verdict ? 3 : aStory || bStory ? 2 : 1;

  const apologyLabel = useMemo(() => {
    if (apologySpark < 35) {
      return `${partnerA || "猫甲"} 已经准备好先伸爪`;
    }
    if (apologySpark > 65) {
      return `${partnerB || "猫乙"} 看起来更柔软`;
    }
    return "两边都在试着放下姿态";
  }, [apologySpark, partnerA, partnerB]);

  const helperTip = useMemo(
    () =>
      catTips[
        (selectedRituals.length * 2 + mood.length + stage) % catTips.length
      ],
    [selectedRituals.length, mood.length, stage],
  );

  const toggleRitual = (id: string) => {
    setSelectedRituals((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const randomizeSoftness = () => {
    setSnackOffer(Math.round(30 + Math.random() * 50));
    setApologySpark(Math.round(40 + Math.random() * 30));
  };

  const buildLocalVerdict = (): LocalBundle => {
    const expressShift = (aStory.length - bStory.length) / 9;
    const apologyShift = (apologySpark - 50) / 3;
    const rawShift =
      expressShift + apologyShift + (activeMood?.tilt ?? 0) + (Math.random() - 0.5) * 4;
    const catnipFactor = 1 - snackOffer / 180;
    const finalShift = rawShift * catnipFactor + ritualScore;

    const aPercent = clamp(Math.round(50 + finalShift), 7, 93);
    const bPercent = 100 - aPercent;

    const lead =
      aPercent > bPercent
        ? `${partnerA || "猫甲"} 要记得先拥抱哦`
        : `${partnerB || "猫乙"} 需率先给出示好信号`;

    const suggestion =
      helperTip ||
      "多花 7 秒回应对方的感受，猫猫法庭永远偏向真诚。";

    const analysis = [
      aStory.length === bStory.length
        ? "双方表达长度接近，说明仍在努力倾听彼此。"
        : `${aStory.length > bStory.length ? partnerA || "猫甲" : partnerB || "猫乙"} 表达得更多，另一方需要多一点安全感。`,
      apologySpark === 50
        ? "主动道歉意愿平衡，谁先迈出一步都可以。"
        : `${apologySpark < 50 ? partnerA || "猫甲" : partnerB || "猫乙"} 的态度更柔软，可率先示好。`,
      selectedRituals.length
        ? `已点亮 ${selectedRituals.length} 项贴贴仪式，愈合速度更快。`
        : "尚未选择停战仪式，可以补充一个可爱的动作。",
    ];

    const steps: HealingStep[] = [
      {
        title: "慢半拍回应",
        detail:
          "先复述对方一句话，再表达自己需求，让猫猫法官看到共情证据。",
      },
      {
        title: "固定贴贴动作",
        detail:
          selectedRituals.length
            ? "保持已选仪式，把温柔变成约定动作。"
            : "挑一个共同行动，比如同步喝水或看剧作为停战口令。",
      },
      {
        title: "写下下一次期待",
        detail: helperTip,
      },
    ];

    return {
      verdict: {
        aPercent,
        bPercent,
        catComment: lead,
        suggestion,
      },
      analysisSummary: analysis,
      healingSteps: steps,
      ritualIdea:
        helperTip ||
        "准备一杯热饮和一段真诚夸奖，能迅速熄灭炸毛情绪。",
      keywordTags: ["沟通节奏", "道歉姿态", "仪式感"],
      empathyLines: [
        `${partnerA || "猫甲"}：我不是要指责你，只是好想被你看见。`,
        `${partnerB || "猫乙"}：我知道了，谢谢你提醒我情绪的份量。`,
      ],
      futurePromise: "今晚共同记录一件感谢彼此的小事，提醒这段关系的甜。",
    };
  };

  const handleVerdict = async () => {
    setVerdictLoading(true);
    setVerdictError(null);
    setVerdictOrigin(null);
    setVerdict(null);
    setAnalysisSummary([]);
    setHealingSteps([]);
    setRitualIdea("");
    setKeywordTags([]);
    setEmpathyLines([]);
    setFuturePromise("");

    const payload = {
      partnerA: partnerA || "猫甲",
      partnerB: partnerB || "猫乙",
      aStory,
      bStory,
      mood,
      snackOffer,
      apologySpark,
      selectedRituals,
    };

    try {
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("猫猫判决请求失败");
      }

      const data = await response.json();

      setVerdict({
        aPercent: data.aPercent,
        bPercent: data.bPercent,
        catComment: data.catComment,
        suggestion: data.suggestion,
      });
      setAnalysisSummary(data.analysisSummary ?? []);
      setHealingSteps(data.healingSteps ?? []);
      setRitualIdea(
        data.ritualIdea ||
          "准备一杯热饮和一段真诚夸奖，能迅速熄灭炸毛情绪。",
      );
      setKeywordTags(data.keywordTags ?? []);
      setEmpathyLines(data.empathyLines ?? []);
      setFuturePromise(
        data.futurePromise ||
          "今晚共同记录一件感谢彼此的小事，提醒这段关系的甜。",
      );
      setVerdictOrigin("cloud");
    } catch (error) {
      console.error(error);
      const fallback = buildLocalVerdict();
      setVerdict(fallback.verdict);
      setAnalysisSummary(fallback.analysisSummary);
      setHealingSteps(fallback.healingSteps);
      setRitualIdea(fallback.ritualIdea);
      setKeywordTags(fallback.keywordTags);
      setEmpathyLines(fallback.empathyLines);
      setFuturePromise(fallback.futurePromise);
      setVerdictOrigin("soothe");
      setVerdictError("喵官暂未连上线，已切换至离线柔软判定。");
    } finally {
      setVerdictLoading(false);
    }
  };

  if (requiredKey && !gatePassed) {
    return (
      <GateCover
        gateInput={gateInput}
        gateError={gateError}
        onGateInputChange={setGateInput}
        onSubmit={handleGateSubmit}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff6f9]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-10 left-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,#ffdce9,transparent)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,#d6f9ff,transparent)] blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.75),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,244,214,0.9),transparent_40%)]" />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-8">
        <HeroSection activeMood={activeMood} snackOffer={snackOffer} />
        <section className="mt-12 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6">
            <EmotionForm
              partnerA={partnerA}
              partnerB={partnerB}
              aStory={aStory}
              bStory={bStory}
              mood={mood}
              snackOffer={snackOffer}
              apologySpark={apologySpark}
              stage={stage}
              apologyLabel={apologyLabel}
              moodOptions={moodOptions}
              onPartnerAChange={setPartnerA}
              onPartnerBChange={setPartnerB}
              onAStoryChange={setAStory}
              onBStoryChange={setBStory}
              onMoodChange={setMood}
              onSnackOfferChange={setSnackOffer}
              onApologySparkChange={setApologySpark}
            />
            <RitualPanel
              ritualOptions={ritualOptions}
              selectedRituals={selectedRituals}
              ritualScore={ritualScore}
              verdictLoading={verdictLoading}
              verdictError={verdictError}
              onToggleRitual={toggleRitual}
              onSummonVerdict={handleVerdict}
              onRandomizeSoftness={randomizeSoftness}
            />
          </div>
          <RightColumn
            stage={stage}
            helperTip={helperTip}
            selectedRitualsCount={selectedRituals.length}
            timelineSteps={timelineSteps}
            verdict={verdict}
            verdictOrigin={verdictOrigin}
            partnerA={partnerA}
            partnerB={partnerB}
            analysisSummary={analysisSummary}
            keywordTags={keywordTags}
            healingSteps={healingSteps}
            empathyLines={empathyLines}
            futurePromise={futurePromise}
            ritualIdea={ritualIdea}
          />
        </section>
      </main>
    </div>
  );
}
