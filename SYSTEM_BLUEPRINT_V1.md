# 🧠 FINAL CAREER ASSESSMENT SYSTEM BLUEPRINT (V1)

## 🎯 1. SYSTEM PURPOSE
This system is designed for **career counselling only**.
It must answer:
1. What career domains align with the student’s **interests and work preferences**?
2. What career domains align with the student’s **current reasoning abilities**?
3. Where do **strengths and gaps** exist?

## 🚨 NON-GOALS (IMPORTANT)
This system does **NOT**:
* diagnose personality
* assess mental health
* determine “perfect career”
* predict future success

## 🧩 2. CORE ARCHITECTURE
**The system contains 2 completely independent tests**

### A) PSYCHOMETRIC TEST
**Purpose**: Measure career interests, work preferences, and behavioral tendencies.

### B) APTITUDE TEST
**Purpose**: Measure reasoning ability and cognitive problem-solving capacity.

### 🚨 CRITICAL RULE
These tests are:
* independently taken
* independently scored
* independently interpreted
* independently reported

## 🏗️ 3. SYSTEM FLOW
* **PSYCHOMETRIC FLOW**: questions → responses → construct scores → normalization → domain mapping → report
* **APTITUDE FLOW**: questions → correctness → construct scores → normalization → domain mapping → report

## 🧠 4. PSYCHOMETRIC MODEL
### 4.1 CONSTRUCT GROUPS
**A) Work-Style / Career Tendency (8)**
1. `social_orientation`
2. `structure_preference`
3. `creativity_innovation`
4. `analytical_curiosity`
5. `leadership_initiative`
6. `practical_orientation`
7. `risk_exploration`
8. `persistence_discipline`

**B) Career Interest (RIASEC) (6)**
9. `realistic`
10. `investigative`
11. `artistic`
12. `social`
13. `enterprising`
14. `conventional`

## 🧮 5. PSYCHOMETRIC SCORING
* **Input**: Likert scale (1–5)
* **Step 1 — Reverse Scoring**: `new_score = 6 - response` (if reverse item)
* **Step 2 — Aggregate**: `raw_construct_score = sum(item_scores)`
* **Step 3 — Normalize**: `normalized = ((raw - min) / (max - min)) × 100`
* **Step 4 — Interpretation Bands**:
  * 0–39 → Lower Preference
  * 40–59 → Balanced
  * 60–74 → Clear Preference
  * 75–100 → Strong Preference

## 🧠 6. PSYCHOMETRIC DOMAIN MAPPING ENGINE
**🚨 IMPORTANT**: Uses ONLY psychometric constructs.
**Method**: `domain_score = Σ (construct_score × weight)`
**Classification**: *(See Section 18 for updated hybrid classification rules)*

## 🧠 7. APTITUDE MODEL
### 7.1 CONSTRUCTS (4)
1. `logical_reasoning`
2. `analytical_reasoning`
3. `numerical_reasoning`
4. `spatial_visual_reasoning`

## 🧮 8. APTITUDE SCORING
* **Step 1**: `correct = count(correct_answers)`
* **Step 2**: `normalized = (correct / total_questions) × 100`
* **Step 3 — Interpretation Bands**:
  * 0–39 → Needs Development
  * 40–59 → Emerging
  * 60–74 → Strong
  * 75–100 → Very Strong

## 🧠 9. APTITUDE DOMAIN MAPPING ENGINE
Uses ONLY aptitude constructs.
**Classification**: *(See Section 18 for updated hybrid classification rules)*

## 🚨 10. NO CROSS-DEPENDENCY RULE
Psychometric and Aptitude DO NOT influence each other, DO NOT combine scores, and DO NOT share mapping.

## 🧾 11. REPORT SYSTEM
### A) PSYCHOMETRIC REPORT
Sections: Candidate Info, Career Orientation Summary, Work-Style Profile, Interest Profile (RIASEC), Work Environment Fit, Top Career Domains, Development Suggestions.
Output Style: "aligned with", "may perform better in", "shows preference toward". Avoid "you must become", "perfect career"

### B) APTITUDE REPORT
Sections: Candidate Info, Aptitude Summary, Ability Scores, Reasoning Profile, Strengths, Improvement Areas, Aptitude-Aligned Domains.

## 🧠 12. EXPLAINABILITY ENGINE
Every recommendation must be explainable. (e.g., "Engineering is recommended because: strong logical reasoning...")

## ⚠️ 13. CONFLICT HANDLING
* **Psychometric**: High creativity + high structure → "balanced profile"
* **Aptitude**: Strong logical + weak numerical → highlight mixed strengths

## 🚨 14. VALIDITY RULES
No overlapping scoring logic. No double-counting dominance. Add reliability flag (`LOW`) for inconsistent answers/failed attention checks. *(See Section 19)*

## 🧠 15. DATA STRUCTURE (LOGICAL)
```json
{
  "test_version": "v1.0",
  "question_bank_version": "v1.0",
  "candidate": {},
  "test_type": "psychometric | aptitude",
  "cohort": "",
  "answers": [],
  "construct_scores": {},
  "normalized_scores": {},
  "domain_scores": {},
  "top_domains": [],
  "report_summary": {},
  "timestamp": ""
}
```

---

# 16. ITEM DISTRIBUTION RULES

## Psychometric
* 8 work-style constructs × 4 items = 32
* 6 RIASEC constructs × 3 items = 18
* 2 attention/consistency items = 2
* **Total = 52 items**

## Aptitude
* logical_reasoning = 13
* analytical_reasoning = 13
* numerical_reasoning = 13
* spatial_visual_reasoning = 13
* **Total = 52 items**

---

# 17. COHORT ADAPTATION RULES

## grade_8_10
* simpler wording
* school-based examples
* exploratory interpretation

## grade_11_12
* sharper academic/career wording
* stronger stream/domain fit

## professional
* mature wording
* workplace/task-based framing
* career transition/domain fit orientation

---

# 18. DOMAIN CLASSIFICATION RULES

## Strong Fit
* top-ranked domain AND score ≥ 65

## Good Fit
* score between 50–64

## Explore
* score between 35–49

## Low Alignment / Needs Development
* score < 35

---

# 19. RELIABILITY RULES

## Psychometric
* failed attention check → LOW reliability
* repeated contradictory responses → LOW reliability

## Aptitude
* optional timing/randomness checks later
* V1 can use standard reliability only

---

# 20. QUESTION DESIGN RULES

## Psychometric
* one construct per item
* no double-barreled wording
* no clinical wording
* no obvious socially desirable phrasing

## Aptitude
* one correct answer only
* deterministic
* medium difficulty dominant
* low ambiguity

---

# 21. VERSIONING RULE

Each attempt must store:
```json
{
  "test_version": "v1.0",
  "question_bank_version": "v1.0"
}
```
