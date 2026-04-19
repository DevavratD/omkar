# Psychometric & Aptitude Scoring Logic (90% Counselling-Grade)

Production scoring engine — full specification. No legacy sections.

---

## 1. Aptitude Scoring (`aptitudeEngine.ts`)

**Formula**: `normalized = Math.round((correct / total) * 100)`

**Bands**:
- `< 40` → Needs Development
- `< 60` → Emerging
- `< 75` → Strong
- `>= 75` → Very Strong

**Strengths**: Constructs scoring `>= 60`, top 3 descending.
**Improvement Areas**: Constructs scoring `< 40`, top 3 ascending (worst first).

---

## 2. Psychometric Scoring (`psychometricEngine.ts`)

**Likert Scale**: 5-point, direction-aware.
- Standard: `raw = value`
- Reverse: `raw = 6 - value`

**Normalization**:
- Work-Style (4 items): `((raw - 4) / 16) × 100`
- RIASEC (3 items): `((raw - 3) / 12) × 100`

**Reliability Check** — Polarity test (replaces old "count correct"):
```
(agreeVal >= 4 && disagreeVal <= 2) ? "OK" : "LOW"
```

---

## 3. Career Domain Mapping (`domainMapping.ts`)

Maps construct scores to 6 domains via weighted construct matrix.
Psychometric scores receive core skill penalties; aptitude scores do not.

### Scaled Proportional Penalty
```
penalty = (40 - constructScore) * 0.6 * cohortMultiplier
```
- `constructScore = 38` → penalty ~1.2
- `constructScore = 20` → penalty ~12
- `constructScore = 5`  → penalty ~21

### Core Skill Matrix
| Domain | Required Constructs |
| :--- | :--- |
| Engineering & Technology | `analytical_curiosity`, `investigative` |
| Business & Management | `enterprising`, `leadership_initiative` |
| Creative Design & Arts | `artistic`, `creativity_innovation` |

### Cohort Multipliers
| Cohort | Multiplier | Rationale |
| :--- | :--- | :--- |
| `grade_8_10` | `0.6` | Developing baseline, lenient |
| `grade_11_12` | `1.0` | Standard |
| `professional` | `1.2` | Strict professional expectations |

### Fit Labels
| Score | Label |
| :--- | :--- |
| `>= 70` | Strong Fit |
| `>= 50` | Good Fit |
| `>= 35` | Possible Fit |
| `< 35` | Low Fit |

### Dynamic Score-Referenced Explanation
Generated per domain using actual construct scores — not generic text:
```
score >= 75 → "strong alignment"
score >= 50 → "moderate alignment"
else        → "limited alignment"

→ "This domain shows [level], particularly due to your performance in
   [trait A] ([score1]) and [trait B] ([score2])."
```

---

## 4. Gap Analysis (`gapAnalysis.ts`)

Intersects psychometric interest (`p`) vs aptitude capability (`a`):

| Condition | Type | Message |
| :--- | :--- | :--- |
| `p >= 60 && a >= 60` | `aligned` | Strong alignment between interest and ability. |
| `p >= 60 && a < 50` | `interest_high_ability_low` | Interest is strong, but ability needs development. |
| `p < 50 && a >= 60` | `ability_high_interest_low` | Ability is strong, but not a preferred domain. |
| Else | `low_fit` | Currently not a strong fit. |

### Primary Gap Insight
Extracted and injected directly into the career summary (most memorable line):
- **Priority 1** — `interest_high_ability_low`: "A key observation is that your interest in [Domain] is stronger than your current ability, indicating an opportunity for development."
- **Priority 2** — `ability_high_interest_low`: "Your ability in [Domain] is notably higher than your current interest, which may be worth exploring further."

---

## 5. Report Generation (`reportGenerator.ts`)

### Multi-Trait Summary
Accumulates all dominant traits (`>= 65`) independently — no single-pattern forcing:
```
analytical_curiosity >= 65   → "analytical thinking"
structure_preference >= 65   → "structured approach to work"
creativity_innovation >= 65  → "creative problem-solving"
risk_exploration >= 65       → "openness to exploration and new challenges"
social_orientation >= 65     → "people-oriented work style"
leadership_initiative >= 65  → "initiative and leadership tendency"
practical_orientation >= 65  → "hands-on practical orientation"
persistence_discipline >= 65 → "strong persistence and discipline"
```
→ `"The candidate demonstrates [T1], [T2], [T3]. [PrimaryGapInsight]."`
→ No traits: `"The candidate shows a balanced profile without a dominant work style tendency."`

### Contradiction Detection
Surfaces rare nuanced dual-trait patterns as counselling observations:
| Trait Combination | Insight |
| :--- | :--- |
| `creativity_innovation >= 65` AND `structure_preference >= 65` | Flexibility across structured and creative environments |
| `leadership_initiative >= 65` AND `practical_orientation >= 65` | Effective in both directing and hands-on execution |
| `risk_exploration >= 65` AND `persistence_discipline >= 65` | Rare: exploratory appetite + disciplined follow-through |
| `social_orientation >= 65` AND `analytical_curiosity >= 65` | Versatile across people-facing and research-oriented roles |

### Confidence Score
```
reliability === "LOW"      → "Low"
unique raw answers <= 2    → "Low"  (straight-lining / lazy answering)
score variance < 10        → "Low"  (flat, disengaged response pattern)
score variance < 25        → "Moderate"
else                       → "High"
```

### Report Schema

| Field | Type | Description |
| :--- | :--- | :--- |
| `career_orientation_summary` | `string` | Multi-trait synthesis + embedded gap insight |
| `confidence_level` | `Low\|Moderate\|High` | Engagement and response quality signal |
| `primary_gap_insight` | `string \| null` | Most critical gap narrative |
| `contradiction_note` | `string \| null` | Dual-trait counselling observation |
| `development_suggestions` | `string[]` | Per-construct advice for traits below 40 |
| `work_environment_fit` | `object` | Structured/Flexible + Team-Oriented/Independent |
| `reliability_flag` | `OK\|LOW` | Attention check polarity result |
