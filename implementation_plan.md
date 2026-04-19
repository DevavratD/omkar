# Counsellor-Friendly Report Redesign (Final Plan)

## Core Problem

The current reports have **two separate issues**. This plan fixes both:

1. **Text quality** — prose is generic, formulaic, and impersonal. A counsellor reading *"This domain shows moderate alignment, particularly due to your performance in analytical reasoning (73) and logical thinking (45)"* learns nothing useful. They need a narrative that synthesises, contextualises, and speaks specifically about the candidate.

2. **Visual structure** — report layout lacks the scaffolding a counsellor needs during a session: no at-a-glance summary, no score legend, no suggested questions, buried key insights.

---

## Design Principles

> [!IMPORTANT]
> **Every piece of text must pass this test:** Could this sentence apply to any other candidate, or is it specific to this person's actual scores and profile? If it could apply to anyone → rewrite.

- **Use the candidate's name** throughout the narrative (not "the candidate")
- **Cite actual numbers** in interpretive sentences: "scoring 73% in Analytical Reasoning"
- **Full paragraphs, not bullet lists** for narrative text
- **Hedged language** — "suggests", "may indicate", "this pattern is consistent with" — never absolute claims
- **One plain-language sentence** before every section of data
- **Strength-first framing** — always anchor with what's strong before discussing areas to grow
- **Counsellor-not-candidate** — discussion prompts are explicitly for the counsellor, not directives to the student

---

## Track 1: Text Quality (Scoring / Engine Layer)

### [MODIFY] `domainMapping.ts` — `explainDomain()`

Current output: *"This domain shows moderate alignment, particularly due to your performance in analytical reasoning (73) and logical thinking (45)."*

New output (2-sentence, domain-specific):
- **Sentence 1** — What the candidate's specific scores show for this domain
- **Sentence 2** — Why those traits matter specifically for that career domain

Example for Engineering & Technology (score 68, analytical_curiosity=73, investigative=52):
> *"Analytical curiosity scored 73 and investigative interest scored 52, both within the productive range for this domain. In Engineering and Technology, these traits directly support the systematic curiosity and problem-decomposition mindset required for design, debugging, and applied research."*

Example for Social & Helping Professions (score 71, social_orientation=78, social=65):
> *"Social orientation scored 78 and social interest scored 65, indicating a clear preference for people-centred work. These traits are foundational in counselling, education, social work, and healthcare settings where sustained human engagement is the core of the role."*

**Approach:** Replace `explainDomain()` with domain-specific templates that reference actual scores and link them to the career domain's cognitive demands.

---

### [MODIFY] `domainMapping.ts` — `detectContradictions()`

Current outputs read like assessment jargon. Rewrite to sound like a counsellor's observation, e.g.:

Before: *"The candidate shows both structured and creative tendencies, indicating flexibility across different work environments."*

After: *"There is an interesting combination of high structure preference and high creativity — this person may work best in environments that are organised but leave room for original thinking, such as product design, architecture, or research-led innovation."*

---

### [MODIFY] `reportGenerator.ts` — `buildPsychSummary()`

Current: 2-sentence formula with no personalization.

New: A **3-paragraph narrative** that:
- Paragraph 1 — Dominant RIASEC orientation + what that means for work preference (personalised with top construct scores)
- Paragraph 2 — Work-style summary: top 2 work-style traits and how they shape the candidate's work approach
- Paragraph 3 — One synthesising observation that a counsellor can use as a conversation starter

This function receives `result` (which has all scores) and `candidateInfo` (name). Use both.

---

### [MODIFY] `reportGenerator.ts` — `buildAptSummary()`

Current: *"The aptitude profile indicates exceptional pattern recognition (73% normalized score). Cognitive performance shows alignment toward Engineering & Technology fields."*

New: A **2-paragraph narrative**:
- Paragraph 1 — Overall cognitive picture: strongest and weakest construct with exact scores, honest characterisation of the profile
- Paragraph 2 — What this means for career readiness in the top-aligned domain

---

### [MODIFY] `reportGenerator.ts` — `APT_INTERPRETATION_TEXT`

Current per-construct interpretations are generic ("Demonstrates exceptional pattern recognition and abstract rule processing suitable for complex logic.")

New: Each interpretation is **score-range-aware and links the construct to real-world relevance**:

Example for `logical_reasoning` at "high" level:
> *"Performance in logical reasoning is strong, suggesting well-developed capacity for recognising patterns, working through abstract sequences, and identifying rules in novel situations. This is a core capability for fields requiring systematic problem-solving."*

For "mid" level:
> *"Logical reasoning is in an emerging range. The candidate can work through moderately complex patterns but may need more time or structured approaches in highly abstract or multi-step reasoning tasks. Targeted practice can meaningfully improve this."*

For "low" level:
> *"Logical reasoning currently scores in the developing range. This reflects difficulty with complex abstract patterns at this stage — not a fixed ceiling, but an area where foundational practice would benefit the candidate's overall cognitive readiness."*

---

## Track 2: Visual Structure (Template Layer)

### [MODIFY] `styles.ts` — New Components

Add CSS for:
- **`.glance-box`** — "Key Findings at a Glance" panel — teal/dark header strip + clean white content below
- **`.discussion-box`** — "For Counsellor Reference" — soft purple, clearly labelled, not mixed with candidate-facing content
- **`.score-legend`** — 4-item horizontal colour scale (colour swatch + band label + one-line meaning)
- **`.plain-intro`** — italic, muted grey, 12px — sits as first line below a section header
- **`.phase-block`** — for development plan phases: left-accent bar, clear heading, bullet content

---

### [MODIFY] `aptitudeTemplate.ts`

**Page 2 (Executive Summary):**
- Add **Key Findings at a Glance** panel (3–4 bullets, auto-generated from: strongest construct, weakest, top domain, overall aptitude tier)
- Add **Score Legend** below stats grid: Visual 4-step scale "Development Opportunity → Emerging → Strong → Very Strong" with colors

**Page 3 (Detailed Ability Profile):**
- Add `plain-intro` paragraph: *"The following profiles show how [Name] performed across each cognitive dimension. Scores reflect the percentage of questions answered correctly in that area."*
- Each card already shows `N of M correct` ✅

**Page 4 (Strengths & Development):**
- Rename section header to **"Strengths & Development Opportunities"**
- Show strengths section first (already usually ordered this way — enforce it)
- Add `plain-intro` before development section: *"The following areas scored below the strong threshold. With focused practice, these represent meaningful opportunities for growth."*

**Page on Development Plan:**
- Use `phase-block` styling for Short / Mid / Long term
- Add one counsellor prompt below each phase block (light, italicised, in `discussion-box` at bottom of the page)

**Final Page:**
- Add **"Suggested Session Questions"** box in `discussion-box` style
- 3 questions that open dialogue (not directives)

---

### [MODIFY] `psychometricTemplate.ts`

**Page 1 (Summary + Work-Style):**
- Add **Key Findings at a Glance** panel at top (3 bullets: dominant Holland Code, top work-style trait, any behavioral note)
- Add `plain-intro` before work-style section: *"The following dimensions reflect how [Name] tends to approach their work — these are preference patterns, not fixed personality traits."*

**Page 2 (RIASEC + Domains):**
- Add `plain-intro` before RIASEC bars: *"RIASEC is a widely-used framework for understanding vocational interests. The following scores indicate which types of activities [Name] finds most engaging."*
- Add `plain-intro` before domain cards: *"The following career domains are ranked by psychometric fit — how well [Name]'s interest and work-style profile aligns with what each domain typically demands."*

**Page 3 (Development + Confidence):**
- Add **"Suggested Session Questions"** box at bottom
- ⚠️ midpoint bias note already added ✅

---

## Files Changed Summary

| File | What changes |
|---|---|
| `domainMapping.ts` | `explainDomain()` full rewrite + contradiction rewording |
| `reportGenerator.ts` | `buildPsychSummary()`, `buildAptSummary()`, `APT_INTERPRETATION_TEXT` rewrites |
| `styles.ts` | 4 new CSS components |
| `aptitudeTemplate.ts` | Key Findings panel, score legend, plain intros, renamed sections, discussion questions |
| `psychometricTemplate.ts` | Key Findings panel, plain intros, discussion questions |

---

## Verification Plan

- `npx tsc --noEmit` — TypeScript clean
- Generate both PDFs, check visually:
  - Key Findings panel appears on executive summary pages
  - Score legend visible
  - Candidate's name appears in narrative text
  - Specific scores cited in domain explanations
  - Discussion questions box visible on last page
  - No overflow or layout breaks
