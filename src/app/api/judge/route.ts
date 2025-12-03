import OpenAI from "openai";
import { NextResponse } from "next/server";

const client =
  process.env.OPENAI_API_KEY &&
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const instructions = `
你是「猫猫法官局」的暖法官糖糖。请阅读双方诉求与情绪参数，分析争吵成因，再输出 JSON（不要添加多余文字）。
JSON 结构：
{
  "aPercent": number,
  "bPercent": number,
  "catComment": string,
  "suggestion": string,
  "analysisSummary": string[],
  "healingSteps": [
    { "title": string, "detail": string }
  ],
  "ritualIdea": string,
  "keywordTags": string[],
  "empathyLines": string[],
  "futurePromise": string
}
要求：
- 语气柔软，尊重输入昵称。
- 结论兼顾公平与安抚，可给出具体行动建议。
- keywordTags 2-4 个，突出情绪或行为关键词。
- empathyLines 提供可直接引用的暖心对话。
- futurePromise 给出下一步共同约定。
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      partnerA,
      partnerB,
      aStory,
      bStory,
      mood,
      snackOffer,
      apologySpark,
      selectedRituals,
    } = body;

    if (!aStory || !bStory) {
      return NextResponse.json(
        { error: "请先填写双方诉求，喵官才好工作。" },
        { status: 400 },
      );
    }

    if (!client) {
      return NextResponse.json(
        { error: "缺少 OpenAI API Key，请在环境变量中配置。" },
        { status: 503 },
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.35,
      messages: [
        {
          role: "system",
          content: instructions,
        },
        {
          role: "user",
          content: `调停请求：${JSON.stringify(
            {
              partnerA,
              partnerB,
              aStory,
              bStory,
              mood,
              snackOffer,
              apologySpark,
              selectedRituals,
            },
            null,
            2,
          )}`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content || "";
    const cleaned = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("猫猫判决失败", error);
    return NextResponse.json(
      { error: "猫猫判决异常，请稍后再试。" },
      { status: 500 },
    );
  }
}
