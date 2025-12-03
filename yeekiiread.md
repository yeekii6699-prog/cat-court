# Yeekii Readme

## 1. 调用大模型的模块
- `src/app/api/judge/route.ts`：服务器端路由，封装了与 OpenAI Chat Completions 的交互，读取前端诉求后将 `prompts/cat-court-prompts.md` 中的 system prompt 传给模型，并返回结构化 JSON（错率、洞察、仪式灵感、关键词、暖心话术、未来约定等）。此处也是配置 `OPENAI_API_KEY` 与 `OPENAI_MODEL` 的唯一入口。
- `src/app/page.tsx`（`handleVerdict` 方法）：前端在用户点击“召唤猫猫判决”时向 `/api/judge` 发送请求，处理成功/失败的状态切换，失败时调用内置的柔软算法 `buildLocalVerdict` 兜底。

> 其它模块（组件、数据、类型）仅负责渲染与状态管理，不直接连接大模型。

## 2. 网站功能模块
- **共享口令入口（`GateCover`）**：读取 `NEXT_PUBLIC_COURT_KEY`，保证多人输入相同 key 才能进入猫猫法庭，实现“同房间”同步调解。
- **英雄区（`HeroSection` + `CatJudge`）**：展示站点故事、三步使用流程及可爱猫官 SVG 插画，营造亲和力。
- **情绪笔录（`EmotionForm`）**：包含昵称、双方便条、吵架氛围、猫薄荷供给与道歉雷达等输入控件，决定判决上下文。
- **可爱停战仪式（`RitualPanel`）**：列出五种贴贴动作、calm score 指示、召唤按钮与“撒猫薄荷”随机功能，负责触发判决流程。
- **右侧分析区（`RightColumn`）**：呈现调停进度、喵官即时提醒、判决错率、猫猫吵架分析、关键词、愈合步骤、暖心话术、下一次约定与仪式灵感等结果。
- **数据与类型（`src/lib/courtData.ts`、`src/types/court.ts`）**：集中维护氛围/仪式/提示等静态配置与类型定义，供所有组件复用。
- **柔软算法兜底（`buildLocalVerdict`）**：在前端计算基础判决，确保大模型不可用时仍有输出。

## 3. Prompt 存储规范
- 路径：`prompts/cat-court-prompts.md`
- 内容：按照 Markdown 文档记录每一个需要调用大模型的 prompt，目前存放 `/api/judge` 使用的 system prompt，并以代码块形式保留完整文本。
- 使用说明：在对应模块（如 `route.ts`）引用此文件的内容或保持同步更新，后续新增 prompt 也按「模块名 + prompt 文本 + 使用方式」格式追加。

## 4. 项目文件概览
- `src/app/page.tsx`：页面状态中心，负责 key 校验、表单状态、判决请求、兜底算法与组件组合。
- `src/app/api/judge/route.ts`：与 OpenAI 交互的服务端接口。
- `src/components/court/`：存放 UI 组件，包括 `HeroSection.tsx`、`CatJudge.tsx`、`EmotionForm.tsx`、`RitualPanel.tsx`、`RightColumn.tsx`、`GateCover.tsx` 等。
- `src/lib/courtData.ts`：静态配置（氛围、仪式、tips、流程步骤）。
- `src/types/court.ts`：所有与调停相关的类型定义。
- `prompts/cat-court-prompts.md`：大模型 prompt 仓库。
- `README.md`：运行、部署、环境变量说明。
- `yeekiiread.md`：当前文件，用于快速了解大模型模块、功能划分、prompt 仓库与整体目录结构。
