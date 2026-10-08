# HumanPlus Web Design System

> **Purpose:** Establish a unified visual and interaction system for the HumanPlus official website.
> The system takes inspiration from Apple's product-oriented, editorial, minimal design language, but uses HumanPlus's own brand colors, typography, spacing, components, and interaction principles.
>
> **This document is the design source of truth for the HumanPlus website.**
> Any future page, component, redesign, or visual adjustment should follow this specification unless a deliberate design exception is explicitly approved.

---

# 01. Design Philosophy

HumanPlus 的网站设计应该体现：

**Minimal · Premium · Technical · Human · Editorial**

核心设计原则：

### 1. Product First
产品、人体数据和真实应用场景应该成为视觉主体。不要让 UI 装饰、卡片、边框和复杂动画抢夺产品本身的注意力。

### 2. Visual Restraint
视觉元素应该克制。优先使用：White / Black / Neutral Gray / HumanPlus Brand Blue。不要随意增加新的颜色。

### 3. Large Visual Composition
主要页面采用大尺度视觉构图：大面积留白、大标题、大型产品图片、大型视频、完整屏幕 Section、清晰的视觉层级。避免把页面设计成传统后台、PPT 或密集卡片 Dashboard。

### 4. Editorial Layout
页面应该更接近高端科技产品的 editorial layout，而不是传统企业官网。文字和图片之间保持明确的空间关系。

### 5. Flat and Clean
优先使用：平面色块、细线、留白、大圆角、高质量图片 / 视频。尽量避免：厚重阴影、复杂渐变、霓虹效果、玻璃拟态滥用、大量边框、装饰性 UI。

---

# 02. Brand Colors

HumanPlus 的品牌核心颜色只有两个：

## Brand Blue

```text
#5A9CFC
```

Token:

```css
--color-brand-blue: #5A9CFC;
```

用途：品牌强调、重要链接、CTA、选中状态、交互状态、少量视觉强调、数据 / 产品相关重点信息。

### 使用原则
Brand Blue 是**强调色，不是页面主背景色**。
不要：大面积铺满整个 Hero、所有按钮都使用蓝色、所有文字都使用蓝色、所有卡片都使用蓝色、使用蓝色渐变作为默认背景。蓝色应该像视觉中的"标点"，而不是主角。

## Brand Gray

```text
#E5E5E5
```

Token:

```css
--color-brand-gray: #E5E5E5;
```

用途：大面积浅灰 Section、产品展示背景、Feature Section、参数区域背景、Footer 背景、页面之间的视觉分隔。Brand Gray 是 HumanPlus 网站的重要基础色。

---

# 03. Neutral Colors

除品牌蓝和品牌灰之外，网站只使用必要的黑、白和中性灰。

| Name   | Value     | Token            | Role                 |
| ------ | --------- | ---------------- | -------------------- |
| White  | `#FFFFFF` | `--color-white`  | 主页面背景、产品展示区域 |
| Black  | `#000000` | `--color-black`  | 深色 Section、强调文字  |
| Ink    | `#1D1D1F` | `--color-ink`    | 标题、正文、导航        |
| Gray 1 | `#666666` | `--color-gray-1` | 次级文字              |
| Gray 2 | `#999999` | `--color-gray-2` | 辅助信息              |
| Gray 3 | `#CCCCCC` | `--color-gray-3` | 分割线、弱边框          |

---

# 04. Color Hierarchy

网站默认采用以下颜色层级：

```text
White
↓
Brand Gray
↓
Black / Ink
↓
Neutral Gray
↓
Brand Blue
```

其中：**White / Brand Gray = 页面空间**；**Black / Ink = 信息**；**Brand Blue = 强调**。不要让蓝色承担大面积背景和主要视觉空间。

---

# 05. Typography

HumanPlus 使用网站当前已经确定的现代无衬线字体体系。

优先级：

```text
Inter → Helvetica Neue → Arial → system-ui → sans-serif
```

CSS：

```css
--font-sans:
  Inter,
  Helvetica Neue,
  Arial,
  system-ui,
  sans-serif;
```

---

# 06. Typography Scale

建立统一字体层级。

| Role            |    Size |  Weight | Line Height |
| --------------- | ------: | ------: | ----------: |
| Navigation      |    13px | 400–500 |         1.2 |
| Caption         |    13px |     400 |         1.4 |
| Body Small      |    14px |     400 |         1.5 |
| Body            | 16–17px |     400 |         1.5 |
| Body Large      | 18–20px |     400 |        1.45 |
| Section Kicker  | 20–24px | 500–600 |         1.2 |
| Section Heading | 36–48px |     600 |   1.05–1.15 |
| Display         | 56–80px |     600 |    1.0–1.08 |
| Hero Display    | 72–96px |     600 |   0.95–1.05 |

---

# 07. Typography Principles

### Headlines
标题应该：大、简洁、有视觉重量、不使用过度粗体。默认最高使用 `font-weight: 600`。不要默认使用 700 / 800 / 900。

### Body
正文应该：易读、留白充足、深灰或 Ink、不使用纯黑大段文字。

### Letter Spacing
大标题可以适当收紧字距。正文保持接近正常字距。不要为了模仿 Apple 而大量使用极端负字距。

---

# 08. Spacing System

基础单位：`4px`

Spacing Scale：

| Token           | Value |
| --------------- | ----: |
| `--spacing-4`   |   4px |
| `--spacing-8`   |   8px |
| `--spacing-12`  |  12px |
| `--spacing-16`  |  16px |
| `--spacing-20`  |  20px |
| `--spacing-24`  |  24px |
| `--spacing-32`  |  32px |
| `--spacing-40`  |  40px |
| `--spacing-48`  |  48px |
| `--spacing-64`  |  64px |
| `--spacing-80`  |  80px |
| `--spacing-96`  |  96px |
| `--spacing-120` | 120px |
| `--spacing-144` | 144px |

> **Implementation note:** These spacing tokens are exposed as CSS custom properties (`var(--spacing-24)`, etc.). They are **deliberately NOT** mapped onto Tailwind's numeric `spacing` scale, because Tailwind's default `spacing` uses a different unit convention (`4` = 1rem = 16px) and overriding it would break every existing `p-4` / `gap-4` / `m-4` on the site. Use `var(--spacing-*)` or arbitrary values (e.g. `p-[24px]`) when you need the canonical 4px-based scale.

---

# 09. Layout

HumanPlus 网站优先采用：**Full-width Section + Centered Content**。

内容最大宽度建议：`1200px–1440px`。大型产品视觉可以突破内容容器。普通文字内容不应该无限拉宽。

---

# 10. Full-screen Section

HumanPlus 网站采用统一的 **Apple-style Full-screen Section Transition**（内部称「苹果全屏滚动切换效果」）：

- 一个主要 Section = 一个完整视觉页面
- Section 默认占据 `100vh`
- 用户滚动时完整切换到下一 Section，向上滚动完整返回上一 Section
- 切换过程平滑、自然，不出现两个 Section 长时间同时停留
- 不允许普通连续网页滚动破坏主要产品页面的沉浸感

### Critical Rule
网站后续页面需要采用统一的 Full-page Scroll 机制。不要每个页面单独实现一套 wheel 事件。应使用全站统一的滚动系统。**首页当前已经验证有效的实现作为 Source of Truth**（见 `src/hooks/useSectionSnap.js`），后续页面优先复用首页的滚动机制。

---

# 11. Section Backgrounds

默认使用以下背景：

### Primary
```text
#FFFFFF
```
用于：Hero、Product Story、Editorial Section、Product Detail。

### Secondary
```text
#E5E5E5
```
用于：Feature Section、Performance Section、Specification Section、Content transition、Footer、Muted visual areas。

### Dark
```text
#000000
```
仅在需要形成明显视觉章节时使用。不要频繁黑白交替。

---

# 12. Border Radius

HumanPlus 使用大圆角，但不要把所有东西都做成圆角卡片。

| Element                | Radius |
| ---------------------- | -----: |
| Small control          |    8px |
| Link / compact control |   10px |
| Standard card          |   20px |
| Large media            |   28px |
| Feature card           |   28px |
| Pill                   | 9999px |

产品图片和大型媒体：`28px` 是默认推荐值。

---

# 13. Shadows

默认：**尽量不使用阴影。** 层级关系优先通过背景颜色、留白、尺寸、圆角、细分割线建立。

### Do
`White → E5E5E5`：通过颜色差异产生层次。

### Don't
不要给每个卡片添加 `box-shadow`。尤其避免：大范围阴影、模糊阴影、浮空卡片阴影、**蓝色发光阴影**。

---

# 14. Cards

卡片不是 HumanPlus 网站的默认布局方式。优先级：

```text
Large visual composition > Editorial layout > Open content block > Card
```

只有在信息确实需要分组时才使用 Card。Card：白色或 Brand Gray、20–28px radius、无明显阴影、内部留白充足、不使用复杂边框。不要把整个网页拆成几十个小卡片。

---

# 15. Buttons

按钮需要克制。

### Primary Button
可使用 `Brand Blue #5A9CFC` 搭配 `White text`，圆角 `9999px`。

### Secondary Button
优先：`transparent` + `border: 1px solid #CCCCCC` + `color: #1D1D1F`。不要让所有按钮都变成蓝色实心按钮。

---

# 16. Links

普通文字链接：`#5A9CFC`。不要给所有导航项默认使用蓝色。蓝色主要用于：可点击链接、CTA、当前状态、关键交互。

---

# 17. Navigation

Navigation 应该：简洁、轻量、低视觉干扰、保持较小字体、不使用厚重背景。默认 height `44–64px`，导航文字 `13–14px`。不要使用巨大导航字体。

---

# 18. Product Pages

产品页面应该遵循：`Hero → Product Story → Feature → Performance → Specification → Application / Demo`。产品本身始终是视觉重点。图片、视频可以比文字更大。避免：大量参数堆叠、PPT 式三栏布局、大量小卡片、复杂装饰。

---

# 19. Specification Tables

设备参数页面采用 **Open Table** 而不是传统 Card。推荐：White / Brand Gray background、细灰色分割线、两列或少量列、宽表格、清晰的 typography hierarchy、不使用厚重边框、不使用阴影。桌面端参数表可以占页面 `75%–85%`，保持左右留白。

---

# 20. Video

视频是 HumanPlus 网站的重要视觉媒介。优先：大尺寸、高质量、无多余边框、保持原始比例、大圆角、与页面背景融合。视频控制 UI 应该：简洁、低干扰、细线、与网站黑白灰体系一致。

---

# 21. Imagery

图片应该成为页面的视觉主体。推荐：大尺寸产品图、真实人体场景、真实采集场景、真实机器人应用、高质量视频、干净背景。避免：低质量装饰图片、大量 icon 堆叠、无意义插画、Stock-photo 风格素材。

---

# 22. Interaction & Motion

动画应该：**Subtle / Smooth / Purposeful**。推荐：Fade、Translate、Scale、Section transition、Image reveal、Hover micro-interaction。不应该：炫技、高频闪烁、大幅旋转、强烈弹跳、霓虹发光、过度粒子效果。

---

# 23. Hover

Hover 应该非常轻微（例如 opacity / scale / translateY / background），推荐 `150–300ms`。不要使用：强烈放大、大幅位移、闪光、发光、彩色扩散。

---

# 24. Do's

- 使用 `#FFFFFF` 作为主要页面背景
- 使用 `#E5E5E5` 作为主要浅灰 Section
- 使用 `#5A9CFC` 作为 HumanPlus 品牌强调色
- 保持大量留白
- 使用大型产品图和视频
- 使用 28px 左右的大圆角媒体
- 使用简洁的无衬线字体
- 保持页面视觉层级清晰
- 使用全屏 Section
- 使用统一的「苹果全屏滚动切换效果」
- 使用黑、白、灰建立主要视觉层次
- 让产品和真实场景成为视觉主体

---

# 25. Don'ts

- 不要随意增加新的品牌颜色
- 不要使用 Apple Blue `#0066CC`
- 不要使用 Apple Pricing Blue `#0071E3`
- 不要使用 Launch Orange
- 不要大量使用渐变
- 不要大量使用阴影
- 不要把页面做成 PPT
- 不要把页面拆成大量小卡片
- 不要让所有按钮都是蓝色
- 不要让所有文字都是蓝色
- 不要使用过粗的 700/800/900 字重
- 不要加入无意义的装饰
- 不要为了"科技感"加入霓虹效果
- 不要每个页面单独实现一套滚动逻辑
- 不要破坏首页已经验证有效的全屏滚动体验

---

# 26. HumanPlus CSS Tokens

请将以下 Design Tokens 写入项目的全局样式 / Design System 中：

```css
:root {
  /* Brand */
  --color-brand-blue: #5A9CFC;
  --color-brand-gray: #E5E5E5;

  /* Neutral */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-ink: #1D1D1F;
  --color-gray-1: #666666;
  --color-gray-2: #999999;
  --color-gray-3: #CCCCCC;

  /* Typography */
  --font-sans:
    Inter,
    Helvetica Neue,
    Arial,
    system-ui,
    sans-serif;

  --text-nav: 13px;
  --text-caption: 13px;
  --text-body-small: 14px;
  --text-body: 16px;
  --text-body-large: 18px;
  --text-section-kicker: 20px;
  --text-section-heading: 40px;
  --text-display: 64px;
  --text-hero: 80px;

  /* Font Weight */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-120: 120px;
  --spacing-144: 144px;

  /* Radius */
  --radius-control: 10px;
  --radius-card: 20px;
  --radius-media: 28px;
  --radius-pill: 9999px;

  /* Layout */
  --content-max-width: 1440px;
  --section-min-height: 100vh;

  /* Motion */
  --motion-fast: 150ms;
  --motion-normal: 250ms;
  --motion-slow: 500ms;
}
```

> **Status in this repo:** This `:root` block is already present in `src/styles/index.css` (merged into the existing `@layer base` `:root`, alongside the pre-existing `--brand-rgb`). Tailwind equivalents (`brandGray`, `gray1`–`gray3`, `inkAlt`, `rounded-control/card/media/pill`, `text-nav/caption/body-sm/body-lg/kicker/heading/display/hero`, `duration-fast/normal/slow`, updated `font-sans`) are added to `tailwind.config.js` as **additive** tokens — existing tokens are untouched.

---

# 27. Implementation Requirement

请将本设计规范作为项目的**长期设计约束**，而不是只生成一份文档。

### Step 1
在项目中建立设计规范文件（本文件）：`docs/HUMANPLUS_DESIGN_SYSTEM.md`。

### Step 2
将上述完整设计规范写入该文件。（✅ done）

### Step 3
将核心 Design Tokens 写入项目全局 CSS。（✅ done — `src/styles/index.css` `:root` + `tailwind.config.js` additive tokens）

### Step 4
检查现有网站，找出明显违反 Design System 的地方（不一致的品牌蓝 / 灰色、随意颜色、不一致字体、不一致圆角、过度阴影、过多卡片、不一致按钮、不一致 Section 间距）。**先记录问题，不要一次性大规模重构现有页面。**（✅ see Appendix B — recorded, NOT fixed）

### Step 5
以后所有网站修改都必须以 `HUMANPLUS_DESIGN_SYSTEM.md` 作为设计参考。如果新页面需要使用新颜色 / 新字体 / 新圆角 / 新组件 / 新动画，必须优先检查现有 Design System 是否已经有对应 Token；如果没有，应优先复用已有 Token，而不是随意创建新的视觉规则。

---

# 28. Design Decision Priority

当不同页面的视觉规则发生冲突时，按以下优先级处理：

```text
HumanPlus Design System
        ↓
Global Website Components
        ↓
Page-level Design
        ↓
Individual Section
        ↓
Individual Element
```

越上层的规则优先级越高。

---

# 29. Final Design Principle

HumanPlus 官网最终应该呈现：

> **A quiet, precise, product-led digital experience.**

不是通过复杂视觉效果制造"科技感"，而是通过：产品 + 数据 + 人体 + 大尺度视觉 + 留白 + 精确排版 + 克制的品牌蓝，建立 HumanPlus 独特的品牌体验。

最终视觉关键词：**Clean · Precise · Human · Technical · Premium**（而不是 Colorful · Decorative · Dashboard-like · Over-designed）。

---

# Appendix A — Token → Current Code Mapping

How the design system tokens map onto what already exists in `tailwind.config.js` / `src/styles/index.css`. Existing tokens are intentionally kept so current pages render identically; new work should prefer the system tokens.

| Design Token | CSS var | Tailwind utility (existing) | Tailwind utility (new) | Notes |
| --- | --- | --- | --- | --- |
| Brand Blue `#5A9CFC` | `--color-brand-blue` | `brand` | — | Already consistent ✓ |
| Brand Gray `#E5E5E5` | `--color-brand-gray` | — | `brandGray` | New |
| White `#FFFFFF` | `--color-white` | `paper` / `white` | — | Consistent ✓ |
| Black `#000000` | `--color-black` | `black` | — | Consistent ✓ |
| Ink `#1D1D1F` | `--color-ink` | `ink` (= `#111`, back-compat) | `inkAlt` | **Discrepancy:** system wants `#1D1D1F`; current `ink` is `#111`. Near-identical; converge `ink` → `#1D1D1F` in a future cleanup (low priority, recorded in Appendix B). |
| Gray 1 `#666666` | `--color-gray-1` | `mute` (= `#767676`) | `gray1` | `mute` is close but not exact; prefer `gray1` for new work |
| Gray 2 `#999999` | `--color-gray-2` | — | `gray2` | New |
| Gray 3 `#CCCCCC` | `--color-gray-3` | `lineStrong` (= `rgba(17,17,17,.14)`) | `gray3` | New |
| Font stack | `--font-sans` | `font-sans` (was `Inter, system-ui`) | `font-sans` (now full stack) | Updated ✓ |
| Radius 10/20/28/pill | `--radius-*` | arbitrary `rounded-[..]` | `rounded-control/card/media/pill` | New; see radius inconsistency in Appendix B |
| Spacing 4px scale | `--spacing-*` | Tailwind numeric (`4`=1rem) | — | **Not mapped** to Tailwind (conflict); use `var(--spacing-*)` |
| Motion 150/250/500ms | `--motion-*` | `duration-150/300/500` | `duration-fast/normal/slow` | New |

> **Extra neutrals currently in use but NOT in the design system palette:** `paper2 #FAFAFA`, `panel #F5F5F6`, `panel2 #ECEDEF` (Tailwind `colors`). These are additional near-grays used for media frames / alternate sections. Future work should converge to `White` + `Brand Gray #E5E5E5` (+ `gray-1/2/3` for text/lines) per §02–§04.

---

# Appendix B — Current Site Audit (recorded, NOT fixed)

> Snapshot: **2026-10-08**, repo `HumanPlus_merge`. Per §27 Step 4, these are **recorded only** — no large-scale refactor was performed. Each item lists representative `file:line` references. Address in targeted future cleanups, one component at a time, keeping the page visually identical where possible.

### B.1 Font weight 700 / 800 / 900 (system: max 600) — HIGH visibility
The system says headlines default to `font-weight: 600` and to avoid 700/800/900. Current code uses `font-bold` (700) and `font-black` (900) extensively:
- `src/components/sections/HeroSection.jsx:34` — white Slogan `font-bold` (set to 700 in a prior task; should be ~600)
- `src/pages/RecruitmentPage.jsx:16` — "Join us!" `font-black`
- `src/pages/ContactPage.jsx:79,103,133` — `font-black` headings
- `src/components/sections/ApplicationFlowSection.jsx:197,238` — `font-black`
- `src/components/contact/ContactForm.jsx:167` — `font-black`
- `src/components/layout/PageHeader.jsx:16` / `src/components/ui/SectionHeading.jsx:25` — `font-black`
- `src/components/products/GloveZeroHero.jsx:31` / `VisionZeroHero.jsx:30` — `font-black`
- `src/components/products/MotionZeroHero.jsx:28`, `MotionZeroStory.jsx` (many), `ProductCard.jsx:26`, `ProductShowcaseCard.jsx:32`, `NewsSection.jsx:62`, `HeroSection.jsx:113` — `font-bold`

### B.2 Blue gradient text (second/lighter blue not in palette) — clear violation
`bg-gradient-to-b from-[#5A9CFC] to-[#8BB9FF] bg-clip-text text-transparent` introduces `#8BB9FF`, a lighter blue outside the system (only `#5A9CFC` is allowed):
- `src/components/products/FeaturedProductCard.jsx:29`
- `src/components/products/ProductTrapezoidCard.jsx:85`

### B.3 Blue glow shadow + blue-fill hover (system §13 explicitly forbids 蓝色发光阴影) — clear violation
- `src/components/products/ProductShowcaseCard.jsx:19` — hover uses `shadow-[0_20px_46px_-14px_rgba(90,156,252,0.55)]` (brand-blue glow) and `hover:bg-brand hover:border-brand` (solid blue fill on a card).

### B.4 Inconsistent border radius (system scale: 10 / 20 / 28 / pill) — medium
Components scatter arbitrary radii instead of the canonical scale:
- `rounded-[12px]` — `src/components/layout/Nav.jsx:104` (dropdown; system standard card = 20)
- `rounded-[16px]` — `ArticleRow.jsx:35`, `MediaPlaceholder.jsx:26`, `ProductCard.jsx:20`
- `rounded-[18px]` — `FeaturedProductCard.jsx:49`, `ProductShowcaseCard.jsx:19`
- `rounded-[22px]` — `VisionZeroSpecs.jsx:14,44`
- `rounded-[24px]` — `GloveZeroHero.jsx:52`, `VisionZeroHero.jsx:56`, `GloveZeroFeatures.jsx:109`
- (OK / on-scale: `rounded-[20px]` ProductCard:12, FeaturedProductCard:26; `rounded-[28px]` NewsSection:42)
- About image uses `rounded-[14px]` (per project memory).

### B.5 Extra neutral grays beyond palette — low/medium
`paper2 #FAFAFA`, `panel #F5F5F6`, `panel2 #ECEDEF` are used for section / media-frame backgrounds and are not in the §02–§04 palette. Should converge to `White` + `Brand Gray #E5E5E5` over time.

### B.6 Off-palette hex values — low
- `text-[#252525]` — `ProductShowcaseCard.jsx:32` (should be `ink`/`inkAlt`)
- `bg-[#EDEDED]` — `VisionZeroSpecs.jsx:44` (should be `brandGray #E5E5E5`)
- `bg` `#E4E4E5` in `MotionZeroPerformanceTest.css` (should be `brandGray #E5E5E5`)

### B.7 Gradients as section backgrounds — watch
Several section backgrounds use gradients (`bg-gradient-to-b from-white to-[#F5E5E5]` in `ProductsSection.jsx:41` is on-palette and fine; `GloveZeroHero.jsx:17` / `VisionZeroHero.jsx:16` use `to-[#F5F5F5]` = `panel`). The Motion-0 hero uses subtle brand-blue radial glows (`.m0-hero-surface`, `.m0-roaming-glow` in `index.css`) as product atmosphere — acceptable as restrained brand emphasis, but any future expansion should stay subtle per §22.

### B.8 `ink` value discrepancy
Current Tailwind `ink` = `#111111`; system `--color-ink` = `#1D1D1F`. Visually indistinguishable; record for a future single-token convergence (no page change required).
