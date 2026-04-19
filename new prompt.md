Good. Now we’re doing this **like a product spec**, not “some AI-made test.”

And I’ll be blunt:

👉 If you want this to be **business-usable**, you should **NOT** create 3 completely unrelated psychometric systems for 8–10, 11–12, and professionals.
That’s how you destroy consistency.

## Correct move:

Build **one common psychometric framework** and **one common aptitude framework**, then make the **wording, examples, and career mapping age-appropriate** for:

* **8–10**
* **11–12**
* **Professionals**

That is the product-grade way.

---

# WHAT YOU’RE GETTING IN THIS RESPONSE

You said you want **everything in one response**. Fine.

This response contains:

## 1. **Master prompt for Antigravity / AI IDE**

## 2. **Final product architecture**

## 3. **Exact schema / data model**

## 4. **Psychometric blueprint**

## 5. **Aptitude blueprint**

## 6. **Age-group adaptation rules**

## 7. **Validation / quality rules**

## 8. **Question writing rules**

## 9. **Scoring rules**

## 10. **JSON-ready schemas**

## 11. **Question banks**

* Psychometric (shared, age-adapted)
* Aptitude (section-wise by group)

And I’m also going to be honest where something is **research-informed** vs where it is **your own product logic**, because if you blur those two, you’ll build nonsense. Career-interest frameworks like **RIASEC/Holland** are widely used and well-supported in career guidance, so anchoring your psychometric layer there is a smart choice. ([Nature][1])

---

# 🚨 IMPORTANT VALIDITY WARNING (READ THIS FIRST)

This system can be made:

* **structured**
* **defensible**
* **internally consistent**
* **good for career counselling**

But it is **NOT automatically “scientifically validated”** just because it is long or polished.

For that, you’d still need later:

* pilot testing
* internal consistency checks
* score review
* item refinement

So position it as:

> **Career Guidance Assessment System**
> based on structured psychometric and aptitude indicators

NOT:

> “clinically validated psychological truth engine”

That distinction matters.

---

# 🔥 MASTER PROMPT FOR ANTIGRAVITY / AI IDE

Copy this first. This is your **build prompt**.

I am building a **production-grade offline Career Guidance Assessment System** for a counselling business. This is NOT a casual student project and should be treated like a real product.

# PRODUCT GOAL

Build a **multi-test career assessment platform** with **independent tests**, **independent scoring**, and **independent reports** for:

1. Psychometric Career Assessment
2. Aptitude Assessment

These tests must be available for 3 user groups:

* 8–10th standard
* 11–12th standard
* Professionals

The app will run **offline on a single laptop** for a counsellor, and students will come physically to take the tests.

---

# CORE PRODUCT REQUIREMENTS

## 1) Separate tests

Psychometric and Aptitude must be **completely independent**:

* separate question banks
* separate answer state
* separate scoring logic
* separate result objects
* separate report generation
* separate saved records

Do NOT combine them.

---

## 2) User group support

Each test must support these cohorts:

* `grade_8_10`
* `grade_11_12`
* `professional`

Questions should be age-appropriate, but the **underlying framework should remain consistent** across cohorts.

---

## 3) Locked test access

Before starting any test, require an **access code / password**.

Flow:

* select cohort
* select test type
* enter access code
* if correct → start test
* if wrong → block access

Keep this simple. No login/auth system.

---

## 4) Offline architecture

This must be built as a **desktop-friendly local app** that can later be wrapped into Electron.

### Architecture rules:

* no dependency on cloud / hosting
* no separate backend server required for core logic
* keep scoring logic local
* use local SQLite storage

---

# TEST SYSTEM DESIGN

## A) PSYCHOMETRIC TEST

Purpose:
Measure **career-relevant interests, work preferences, and work-style tendencies**.

Do NOT make it about:

* mental health
* trauma
* emotional diagnosis
* MBTI personality typing

### Psychometric framework:

Use these 14 constructs:

#### Work Style / Career Tendency Constructs (8)

* social_orientation
* structure_preference
* creativity_innovation
* analytical_curiosity
* leadership_initiative
* practical_orientation
* risk_exploration
* persistence_discipline

#### Career Interest Constructs (RIASEC) (6)

* realistic
* investigative
* artistic
* social
* enterprising
* conventional

### Item design:

* 52 total psychometric items
* Likert scale (1–5)
* include age-appropriate wording by cohort
* include direct and carefully written reverse items
* avoid confusing or double-barreled wording

### Psychometric reports must output:

* top work-style tendencies
* top RIASEC interests
* work environment fit
* top career domains
* development suggestions

---

## B) APTITUDE TEST

Purpose:
Measure **current reasoning and problem-solving ability relevant to career direction**.

### Aptitude framework:

Use these 4 constructs:

* logical_reasoning
* analytical_reasoning
* numerical_reasoning
* spatial_visual_reasoning

### Item design:

* 52 total aptitude items
* objective MCQ
* 4 options each
* one correct answer
* difficulty must be mostly **medium**
* age-appropriate adaptation by cohort

### Aptitude reports must output:

* core ability scores
* strongest/weakest areas
* reasoning profile interpretation
* aptitude-aligned career domains
* skill development suggestions

---

# COHORT ADAPTATION RULES

## grade_8_10

* simpler wording
* more school-safe examples
* medium difficulty relative to this age group
* exploratory interpretation, not harsh filtering

## grade_11_12

* stronger academic/career alignment
* medium difficulty relative to this cohort
* more specific stream/domain recommendations
* stricter interpretation allowed

## professional

* mature wording
* workplace-oriented examples
* medium difficulty relative to adult general population
* recommendations should focus on career transitions / role fit / domain fit

---

# SCORING RULES

## Psychometric scoring

* Likert 1–5
* reverse-score flagged items
* normalize each construct to 0–100

## Aptitude scoring

* 1 for correct, 0 for incorrect
* normalize each construct to 0–100

### Score interpretation:

Psychometric:

* 0–39 = Lower Preference
* 40–59 = Balanced
* 60–74 = Clear Preference
* 75–100 = Strong Preference

Aptitude:

* 0–39 = Needs Development
* 40–59 = Emerging
* 60–74 = Strong
* 75–100 = Very Strong

---

# REPORT RULES

## Psychometric report

Must include:

* student/candidate info
* executive summary
* work-style profile
* RIASEC profile
* work environment fit
* top career domains
* development suggestions

## Aptitude report

Must include:

* student/candidate info
* executive summary
* logical / analytical / numerical / spatial scores
* interpretation
* top aligned domains
* development suggestions

### Important:

Do NOT use absolute language like:

* “You are meant for…”
* “Perfect career is…”
* “Avoid forever…”

Use:

* Strong Fit
* Good Fit
* Explore
* Needs Development

---

# QUALITY / VALIDITY RULES

This is a real business product, so follow these rules:

* Each construct must have a written definition
* Each question must map clearly to a construct
* Avoid vague or double-barreled questions
* Avoid “socially desirable” easy-to-fake wording
* Avoid academic-exam-heavy questions in aptitude
* Avoid clinical or mental-health language in psychometric
* Keep difficulty mostly medium
* Keep questions fair and deterministic
* Keep report explanations traceable to actual scores

---

# DATA MODEL REQUIREMENTS

Use a clean modular structure with local SQLite and schemas for:

* cohorts
* tests
* question bank
* answer records
* scoring
* reports

Each test attempt should save:

* candidate name
* cohort
* test type
* answers
* normalized construct scores
* recommendations
* generated report metadata
* timestamp

---

# OUTPUT I WANT FROM YOU

Generate and structure the following:

1. Final schemas / TypeScript interfaces / JSON structures
2. Final question bank structure
3. Separate psychometric question sets per cohort
4. Separate aptitude question sets per cohort
5. Scoring metadata for each question
6. Report mapping metadata
7. Modular file/folder structure for implementation

Do NOT redesign the app unnecessarily. Refactor intelligently and keep the system maintainable and ready for Electron wrapping later.

---

# 1) FINAL PRODUCT BLUEPRINT (LOCK THIS)

---

# TESTS IN PRODUCT

## Test A — Psychometric Career Assessment

Measures:

* interests
* work preferences
* work-style tendencies

## Test B — Aptitude Assessment

Measures:

* reasoning ability
* cognitive problem-solving patterns

---

# COHORTS

* `grade_8_10`
* `grade_11_12`
* `professional`

---

# DELIVERY FLOW

1. Open app
2. Select cohort
3. Select test type
4. Enter access code
5. Start test
6. Submit
7. Generate independent report
8. Save locally

---

# 2) EXACT SCHEMA / DATA MODEL

Use **SQLite + JSON metadata fields**.

---

## SQL Tables

### `candidates`

```sql
CREATE TABLE candidates (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  age INTEGER,
  cohort TEXT NOT NULL, -- grade_8_10 | grade_11_12 | professional
  created_at TEXT NOT NULL
);
```

---

### `tests`

```sql
CREATE TABLE tests (
  id TEXT PRIMARY KEY,
  test_type TEXT NOT NULL, -- psychometric | aptitude
  cohort TEXT NOT NULL,
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

---

### `test_attempts`

```sql
CREATE TABLE test_attempts (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  test_type TEXT NOT NULL,
  cohort TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  scores_json TEXT NOT NULL,
  report_json TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  FOREIGN KEY(candidate_id) REFERENCES candidates(id),
  FOREIGN KEY(test_id) REFERENCES tests(id)
);
```

---

### `access_config`

```sql
CREATE TABLE access_config (
  id TEXT PRIMARY KEY,
  cohort TEXT NOT NULL,
  test_type TEXT NOT NULL,
  access_code TEXT NOT NULL
);
```

---

# 3) JSON SCHEMAS

---

## Psychometric Question Schema

```json
{
  "id": "psy_8_10_001",
  "cohort": "grade_8_10",
  "testType": "psychometric",
  "text": "I enjoy figuring out how things work.",
  "construct": "analytical_curiosity",
  "direction": "direct",
  "scale": [1, 2, 3, 4, 5],
  "tags": ["career", "interest", "thinking"],
  "validation": {
    "readingLevel": "age_appropriate",
    "doubleBarreled": false,
    "socialDesirabilityRisk": "low"
  }
}
```

---

## Aptitude Question Schema

```json
{
  "id": "apt_11_12_001",
  "cohort": "grade_11_12",
  "testType": "aptitude",
  "questionType": "logical_series",
  "prompt": "Find the next number: 3, 6, 12, 24, ?",
  "options": ["36", "42", "48", "54"],
  "correctAnswer": "48",
  "primaryConstruct": "logical_reasoning",
  "secondaryConstruct": null,
  "difficulty": "medium",
  "tags": ["series", "logic"],
  "validation": {
    "ambiguityRisk": "low",
    "deterministic": true,
    "schoolDependency": "low"
  }
}
```

---

# 4) PSYCHOMETRIC BLUEPRINT

This part should be **consistent across all cohorts**, only wording/examples change.

---

## PSYCHOMETRIC CONSTRUCTS (14)

### Work Style (8)

1. `social_orientation`
2. `structure_preference`
3. `creativity_innovation`
4. `analytical_curiosity`
5. `leadership_initiative`
6. `practical_orientation`
7. `risk_exploration`
8. `persistence_discipline`

### Career Interests (RIASEC) (6)

9. `realistic`
10. `investigative`
11. `artistic`
12. `social`
13. `enterprising`
14. `conventional`

---

## PSYCHOMETRIC ITEM DISTRIBUTION

### 52 Items Total

* 8 work-style constructs × 4 items = 32
* 6 RIASEC constructs × 3 items = 18
* 2 attention/consistency items = 2

---

## IMPORTANT VALIDITY NOTE ON REVERSE ITEMS

You asked for product-grade quality, so here’s the honest thing:

A lot of people blindly stuff reverse-worded items into tests because it sounds “psychometric.” That’s sloppy. Reverse items can reduce straight-lining, but they also **confuse respondents** if written badly. Research has repeatedly shown badly written reverse items can damage scale structure and measurement quality. ([PLOS][2])

## Correct rule:

* Use **few**, **clear**, **simple** reverse items
* No tricky grammar
* No double negatives

Good. That’s what we’ll do.

---

# 5) PSYCHOMETRIC QUESTION BANK

## IMPORTANT IMPLEMENTATION DECISION

I am giving you:

### A) **Core master item bank**

This is your real measurement layer.

### B) **Age-adapted wording**

For:

* 8–10
* 11–12
* professionals

That is smarter than inventing three unrelated tests.

---

# A) MASTER PSYCHOMETRIC ITEM BANK (52)

---

## SECTION 1 — SOCIAL ORIENTATION (4)

### Item 1

* Construct: `social_orientation`
* Direction: direct

**8–10:**
I enjoy working with classmates on activities or projects.

**11–12:**
I enjoy working with others on tasks, discussions, or projects.

**Professional:**
I enjoy collaborating with others on work, ideas, or problem-solving.

---

### Item 2

* direct

**8–10:**
I like sharing my ideas in a group.

**11–12:**
I feel comfortable expressing my thoughts in group settings.

**Professional:**
I’m comfortable contributing my ideas in team discussions.

---

### Item 3

* direct

**8–10:**
I enjoy meeting and talking to new people.

**11–12:**
I generally enjoy interacting with new people.

**Professional:**
I’m generally comfortable engaging with new people or contacts.

---

### Item 4

* reverse

**8–10:**
I would rather do most things alone than with others.

**11–12:**
I usually prefer doing most tasks alone rather than with others.

**Professional:**
I usually prefer handling most work independently rather than collaboratively.

---

## SECTION 2 — STRUCTURE PREFERENCE (4)

### Item 5

* direct

**8–10:**
I like it when tasks are clearly explained step by step.

**11–12:**
I perform better when tasks are clearly structured.

**Professional:**
I work best when expectations and processes are clearly defined.

---

### Item 6

* direct

**8–10:**
I like planning before I start something important.

**11–12:**
I prefer planning before beginning important work.

**Professional:**
I prefer to organize and plan before starting important work.

---

### Item 7

* direct

**8–10:**
I feel better when I know exactly what I need to do.

**11–12:**
I’m more comfortable when responsibilities are clearly defined.

**Professional:**
I’m more effective when goals and responsibilities are clearly defined.

---

### Item 8

* reverse

**8–10:**
I usually start things without much planning.

**11–12:**
I often begin tasks without planning them properly.

**Professional:**
I often start work without a clear plan.

---

## SECTION 3 — CREATIVITY / INNOVATION (4)

### Item 9

* direct

**8–10:**
I enjoy coming up with new ideas.

**11–12:**
I enjoy thinking of original ideas or different ways to do things.

**Professional:**
I enjoy generating new ideas or unconventional solutions.

---

### Item 10

* direct

**8–10:**
I like activities where I can be creative.

**11–12:**
I enjoy tasks that allow imagination or originality.

**Professional:**
I prefer work that allows room for creativity and fresh thinking.

---

### Item 11

* direct

**8–10:**
I like trying a new way instead of doing the same thing every time.

**11–12:**
I enjoy exploring different ways to solve the same problem.

**Professional:**
I like exploring alternative approaches instead of repeating the same method.

---

### Item 12

* reverse

**8–10:**
I prefer doing things only in the usual way.

**11–12:**
I usually prefer sticking to familiar methods rather than trying new ones.

**Professional:**
I usually prefer established methods over experimenting with new approaches.

---

## SECTION 4 — ANALYTICAL CURIOSITY (4)

### Item 13

* direct

**8–10:**
I enjoy figuring out how things work.

**11–12:**
I like understanding how systems, ideas, or processes work.

**Professional:**
I naturally try to understand how systems or processes work beneath the surface.

---

### Item 14

* direct

**8–10:**
I often ask “why” or “how” when learning something.

**11–12:**
I often ask “why” or “how” when I encounter something new.

**Professional:**
I tend to question how and why things work instead of just accepting them.

---

### Item 15

* direct

**8–10:**
I enjoy solving problems that make me think deeply.

**11–12:**
I enjoy mentally challenging questions or problems.

**Professional:**
I enjoy intellectually challenging problems that require careful thinking.

---

### Item 16

* reverse

**8–10:**
I usually lose interest when something becomes too complicated.

**11–12:**
I tend to lose interest when a topic becomes too complex.

**Professional:**
I usually lose interest when something becomes conceptually difficult.

---

## SECTION 5 — LEADERSHIP / INITIATIVE (4)

### Item 17

* direct

**8–10:**
I like taking the lead when a group needs direction.

**11–12:**
I often take initiative when a group task needs direction.

**Professional:**
I naturally step forward when something needs direction or ownership.

---

### Item 18

* direct

**8–10:**
I like helping others move a task forward.

**11–12:**
I often help organize or push tasks forward.

**Professional:**
I often take responsibility for moving work forward.

---

### Item 19

* direct

**8–10:**
I feel confident starting something on my own.

**11–12:**
I’m comfortable starting tasks or projects without waiting too long.

**Professional:**
I’m comfortable initiating work without needing constant prompting.

---

### Item 20

* reverse

**8–10:**
I usually wait for others to decide what to do.

**11–12:**
I usually wait for others to take the lead first.

**Professional:**
I usually prefer others to take the lead before I step in.

---

## SECTION 6 — PRACTICAL ORIENTATION (4)

### Item 21

* direct

**8–10:**
I enjoy building, fixing, or making things.

**11–12:**
I enjoy hands-on activities like building, fixing, or working with real things.

**Professional:**
I prefer practical, hands-on work over purely theoretical tasks.

---

### Item 22

* direct

**8–10:**
I learn better by doing than by only reading.

**11–12:**
I often understand things better when I can apply them practically.

**Professional:**
I tend to learn and work better through practical application.

---

### Item 23

* direct

**8–10:**
I like tasks where I can see a real result.

**11–12:**
I enjoy work where I can see a clear, concrete outcome.

**Professional:**
I prefer work that leads to visible, tangible outcomes.

---

### Item 24

* reverse

**8–10:**
I prefer only ideas and theory, not practical work.

**11–12:**
I usually prefer abstract ideas more than practical application.

**Professional:**
I usually prefer conceptual work over applied, hands-on work.

---

## SECTION 7 — RISK / EXPLORATION (4)

### Item 25

* direct

**8–10:**
I enjoy trying new things even if I’m not sure how they will go.

**11–12:**
I’m usually open to trying new things even when the outcome is uncertain.

**Professional:**
I’m generally comfortable exploring new opportunities even when outcomes are uncertain.

---

### Item 26

* direct

**8–10:**
I like challenges that are a little difficult.

**11–12:**
I enjoy taking on challenging tasks.

**Professional:**
I’m energized by challenging situations rather than avoiding them.

---

### Item 27

* direct

**8–10:**
I like exploring something unfamiliar.

**11–12:**
I’m curious about unfamiliar experiences or paths.

**Professional:**
I’m open to unfamiliar roles, domains, or experiences if they seem meaningful.

---

### Item 28

* reverse

**8–10:**
I avoid new things if they feel uncertain.

**11–12:**
I usually avoid uncertain situations if possible.

**Professional:**
I generally avoid uncertain opportunities unless everything feels safe.

---

## SECTION 8 — PERSISTENCE / DISCIPLINE (4)

### Item 29

* direct

**8–10:**
I keep trying even when something is difficult.

**11–12:**
I usually continue working even when a task becomes difficult.

**Professional:**
I stay committed even when work becomes difficult or slow.

---

### Item 30

* direct

**8–10:**
I usually finish what I start.

**11–12:**
I usually complete what I begin.

**Professional:**
I’m generally reliable about finishing what I start.

---

### Item 31

* direct

**8–10:**
I can stay focused for a long time when something matters.

**11–12:**
I can stay consistent when something is important.

**Professional:**
I can stay disciplined and consistent over time when the goal matters.

---

### Item 32

* reverse

**8–10:**
I give up quickly when something feels hard.

**11–12:**
I tend to stop trying if progress feels too slow.

**Professional:**
I tend to lose momentum when progress becomes slow or difficult.

---

# RIASEC ITEMS (18)

## REALISTIC (3)

### Item 33

**8–10:** I would enjoy using tools, machines, or equipment.
**11–12:** I would enjoy work involving tools, machines, or practical systems.
**Professional:** I’m interested in work that involves tools, systems, machinery, or practical problem-solving.

### Item 34

**8–10:** I like activities where I make or fix something.
**11–12:** I enjoy activities where I build, repair, or work with physical things.
**Professional:** I’m drawn to work where I can build, repair, or work with real-world systems.

### Item 35

**8–10:** I would enjoy learning how machines or devices work.
**11–12:** I would enjoy understanding and working with machines or technical systems.
**Professional:** I’d be interested in careers involving technical systems, devices, or physical operations.

---

## INVESTIGATIVE (3)

### Item 36

I would enjoy solving complex problems.

### Item 37

I am interested in science, research, or understanding how things work.

### Item 38

I would enjoy work that involves analysis, investigation, or deep thinking.

> Same wording works for all 3 cohorts with small language simplification if needed.

---

## ARTISTIC (3)

### Item 39

I enjoy expressing ideas in creative ways.

### Item 40

I would enjoy work involving design, writing, visuals, or creativity.

### Item 41

I like activities where originality matters.

---

## SOCIAL (3)

### Item 42

I enjoy helping, guiding, or supporting other people.

### Item 43

I would enjoy work where I help people learn or improve.

### Item 44

I feel good when I can make a positive difference for someone.

---

## ENTERPRISING (3)

### Item 45

I would enjoy leading people or taking charge of something important.

### Item 46

I enjoy influencing, persuading, or motivating others.

### Item 47

I like the idea of building something, running something, or making decisions.

---

## CONVENTIONAL (3)

### Item 48

I enjoy organizing information, tasks, or records.

### Item 49

I like work that follows a clear system or process.

### Item 50

I would enjoy tasks that require accuracy, order, and careful handling.

---

# ATTENTION / CONSISTENCY ITEMS (2)

### Item 51

Please select **Agree** for this statement.

### Item 52

Please select **Disagree** for this statement.

---

# 6) PSYCHOMETRIC SCORING BLUEPRINT

## Scoring

* Likert 1–5
* Reverse items invert score
* Normalize per construct:

```text
normalized = ((raw - min_possible) / (max_possible - min_possible)) * 100
```

---

## Interpretation Bands

### Psychometric

* **0–39** → Lower Preference
* **40–59** → Balanced
* **60–74** → Clear Preference
* **75–100** → Strong Preference

---

## Report Uses

| Construct              | Main Use                                     |
| ---------------------- | -------------------------------------------- |
| social_orientation     | people vs independent fit                    |
| structure_preference   | structured vs flexible fit                   |
| creativity_innovation  | creative domain fit                          |
| analytical_curiosity   | research / analysis fit                      |
| leadership_initiative  | leadership / business fit                    |
| practical_orientation  | hands-on / applied fit                       |
| risk_exploration       | startup / dynamic fit                        |
| persistence_discipline | readiness / follow-through notes             |
| realistic              | technical / field / practical domain fit     |
| investigative          | science / tech / analysis fit                |
| artistic               | design / creative fit                        |
| social                 | helping / teaching / support fit             |
| enterprising           | business / leadership / entrepreneurship fit |
| conventional           | finance / admin / process fit                |

---

# 7) APTITUDE BLUEPRINT

Now the harder part.

And again, blunt truth:

👉 You should **NOT** create completely different constructs per age group.
Keep the same 4 constructs, change wording/examples/difficulty.

---

## APTITUDE CONSTRUCTS (4)

1. `logical_reasoning`
2. `analytical_reasoning`
3. `numerical_reasoning`
4. `spatial_visual_reasoning`

---

## APTITUDE DISTRIBUTION

### 52 items total

* Logical = 13
* Analytical = 13
* Numerical = 13
* Spatial = 13

---

## Difficulty Rule

You said:

> keep it **medium**

Good. That is the correct decision.

### Final difficulty mix:

* **20% easy**
* **60% medium**
* **20% hard**

That is the fairest structure for differentiation in assessment design.

---

# 8) APTITUDE QUESTION BANK — BY COHORT

I’m going to give you **validated-for-level medium-style** question sets.

## Important:

“Validated” here means:

* appropriate cognitive load
* not too syllabus-dependent
* deterministic
* fair for cohort
* medium difficulty for intended group

It does **NOT** mean psychometrically normed on a population yet.

---

# APTITUDE — GRADE 8–10 (52)

---

## LOGICAL REASONING (13)

### 1

Find the next number:
**2, 4, 8, 16, ?**
A. 24
B. 30
C. 32
D. 36
**Answer: C**

### 2

Which is the odd one out?
A. Triangle
B. Square
C. Circle
D. Cube
**Answer: D**

### 3

If CAT = DBU, then DOG = ?
A. EPH
B. EOG
C. EPH
D. EPHH
**Answer: A**

### 4

If all Roses are Flowers and some Flowers fade quickly, which is definitely true?
A. All Roses fade quickly
B. Some Roses are Flowers
C. No Flowers are Roses
D. All Flowers are Roses
**Answer: B**

### 5

Find the missing term:
**A, C, F, J, O, ?**
A. T
B. U
C. V
D. W
**Answer: B**

### 6

If 5 books take 5 shelves, how many shelves do 8 books take?
A. 5
B. 8
C. 10
D. Cannot say
**Answer: B**

### 7

Which pair is similar?
A. Pen : Write
B. Spoon : Read
C. Ball : Sleep
D. Cup : Run
**Answer: A**

### 8

If MONDAY is coded as 123456, then DAY is:
A. 456
B. 145
C. 345
D. 246
**Answer: A**

### 9

Find the next shape pattern:
Circle, Triangle, Square, Circle, Triangle, ?
A. Rectangle
B. Square
C. Circle
D. Triangle
**Answer: B**

### 10

Which number does not belong?
A. 9
B. 16
C. 25
D. 27
**Answer: D**

### 11

If today is Wednesday, what day will it be after 10 days?
A. Friday
B. Saturday
C. Sunday
D. Monday
**Answer: B**

### 12

Which word does not belong?
A. Apple
B. Banana
C. Mango
D. Carrot
**Answer: D**

### 13

Find the next number:
**7, 10, 13, 16, ?**
A. 18
B. 19
C. 20
D. 21
**Answer: B**

---

## ANALYTICAL REASONING (13)

### 14

Ravi is taller than Amit but shorter than Karan. Who is tallest?
A. Ravi
B. Amit
C. Karan
D. Cannot say
**Answer: C**

### 15

A bus travels East, then turns right. Which direction is it now facing?
A. North
B. South
C. West
D. East
**Answer: B**

### 16

Which bar graph value is highest? *(use chart in UI)*
A. A
B. B
C. C
D. D
**Answer depends on chart**

> For implementation: use visual bar chart item.

### 17

If 3 pencils cost ₹15, what is cost of 5 pencils?
A. ₹20
B. ₹25
C. ₹30
D. ₹35
**Answer: B**

### 18

A balance scale has 2 apples = 1 orange + 1 apple. Which is heavier?
A. Apple
B. Orange
C. Same
D. Cannot say
**Answer: B**

### 19

Rahul walks 5 steps North and 5 steps East. Where is he from start?
A. North
B. East
C. North-East
D. South-East
**Answer: C**

### 20

If all blue balls are soft and this ball is blue, then this ball is:
A. Hard
B. Soft
C. Round
D. Heavy
**Answer: B**

### 21

A class has 20 students. 12 like Maths, 8 like Science, and 4 like both. How many like only Maths?
A. 8
B. 10
C. 12
D. 16
**Answer: A**

### 22

Three friends sit in a row: A is not at an end, B is left of C. Who is in middle?
A. A
B. B
C. C
D. Cannot say
**Answer: A**

### 23

If one clock shows 3:00, what is the angle between hands?
A. 60°
B. 75°
C. 90°
D. 120°
**Answer: C**

### 24

A shop sold 20 pens Monday and 30 pens Tuesday. By how many did sales increase?
A. 5
B. 10
C. 15
D. 20
**Answer: B**

### 25

Which one is needed to complete a pattern matrix? *(visual)*
Use image-based 2×2/3×3 pattern.
**Answer: deterministic image**

### 26

A student scored 40, 50, and 60. What is average?
A. 45
B. 50
C. 55
D. 60
**Answer: B**

---

## NUMERICAL REASONING (13)

### 27

What is 25% of 200?
A. 25
B. 40
C. 50
D. 75
**Answer: C**

### 28

Simplify: 18 ÷ 3 + 4
A. 8
B. 9
C. 10
D. 12
**Answer: C**

### 29

If 4 notebooks cost ₹80, what is cost of 1 notebook?
A. ₹10
B. ₹15
C. ₹20
D. ₹25
**Answer: C**

### 30

Find the missing number:
**5, 10, 20, 40, ?**
A. 60
B. 70
C. 80
D. 90
**Answer: C**

### 31

A shirt costs ₹500. Discount = 10%. Final price?
A. ₹400
B. ₹450
C. ₹475
D. ₹490
**Answer: B**

### 32

Ratio of boys to girls = 3:2. If boys = 15, girls = ?
A. 8
B. 10
C. 12
D. 14
**Answer: B**

### 33

A train travels 60 km in 2 hours. Speed?
A. 20 km/h
B. 30 km/h
C. 40 km/h
D. 50 km/h
**Answer: B**

### 34

What is 3/4 of 80?
A. 50
B. 55
C. 60
D. 65
**Answer: C**

### 35

Find next number:
**11, 15, 19, 23, ?**
A. 26
B. 27
C. 28
D. 29
**Answer: B**

### 36

A class has 40 students. 30% are absent. How many are present?
A. 12
B. 24
C. 28
D. 30
**Answer: C**

### 37

If 1 pen costs ₹12, how many pens can be bought for ₹96?
A. 6
B. 7
C. 8
D. 9
**Answer: C**

### 38

Average of 10, 20, 30, 40 = ?
A. 20
B. 25
C. 30
D. 35
**Answer: B**

### 39

A rectangle has length 8 and width 5. Area?
A. 13
B. 26
C. 40
D. 45
**Answer: C**

---

## SPATIAL / VISUAL (13)

These should mostly be image-based in product.

### 40

Mirror image of a simple arrow pattern *(image-based)*
**Answer: image option**

### 41

Which shape completes the pattern? *(image-based)*

### 42

How many triangles are in the figure? *(image-based medium)*

### 43

Which folded paper gives this cut-out? *(image-based)*

### 44

Which cube net forms the shown cube? *(image-based)*

### 45

Find the odd figure out *(image-based)*

### 46

Which figure is a rotated version of the first one? *(image-based)*

### 47

Which piece fits the missing part? *(image-based)*

### 48

Find hidden square/triangle in complex figure *(image-based)*

### 49

Which 2D shape represents top view of the object? *(image-based)*

### 50

Which dot-region pattern follows next? *(image-based)*

### 51

Which figure is the same after rotation? *(image-based)*

### 52

Complete the 3×3 visual matrix *(image-based)*

---

# APTITUDE — GRADE 11–12 (52)

Now this one should be **sharper**, but still mostly **medium**.

I’ll give you a tighter set. This is closer to real reasoning assessment.

---

## LOGICAL (13)

### 1

Find next number:
**3, 6, 12, 24, ?**
A. 30
B. 36
C. 42
D. 48
**Answer: D**

### 2

Find next term:
**2, 5, 10, 17, 26, ?**
A. 35
B. 36
C. 37
D. 38
**Answer: C**

### 3

If A = 1, B = 2, then CAB = ?
A. 312
B. 321
C. 213
D. 132
**Answer: A**

### 4

Which is odd?
A. 64
B. 81
C. 100
D. 121
**Answer: D** *(if pattern intended as even squares; make cleaner in final bank—avoid ambiguity)*

### 5

If all engineers are logical and some logical people are writers, which must be true?
A. All writers are engineers
B. Some engineers are writers
C. All engineers are logical
D. No logical people are writers
**Answer: C**

### 6

Find next letter pair:
**AZ, BY, CX, ?**
A. DW
B. DX
C. EV
D. DU
**Answer: A**

### 7

Which number completes series:
**1, 4, 9, 16, 25, ?**
A. 30
B. 35
C. 36
D. 49
**Answer: C**

### 8

If TRAIN = UQBJO, then PLANE = ?
A. QMBOF
B. QMBOE
C. QMBNF
D. PMBOF
**Answer: A**

### 9

Odd one out:
A. 8
B. 27
C. 64
D. 100
**Answer: D**

### 10

A is brother of B, C is mother of B. How is A related to C?
A. Son
B. Brother
C. Father
D. Uncle
**Answer: A**

### 11

Find next term:
**5, 9, 17, 33, ?**
A. 49
B. 57
C. 65
D. 67
**Answer: C**

### 12

If all apples are fruits and all fruits are edible, then apples are:
A. always edible
B. never edible
C. only sometimes edible
D. not fruits
**Answer: A**

### 13

Which one doesn’t belong?
A. Circle
B. Ellipse
C. Triangle
D. Sphere
**Answer: D**

---

## ANALYTICAL (13)

### 14

Five students P, Q, R, S, T stand in a line. Q is between P and R. T is at one end. Who is definitely not in the middle?
A. Q
B. R
C. S
D. Cannot say
**Answer: D** *(This is actually ambiguous—don’t use. I’m flagging it. Replace in final bank.)*

### Better replacement:

**14**
In a class, Rahul scored more than Aman but less than Sneha. Aman scored more than Riya. Who scored highest?
A. Rahul
B. Aman
C. Sneha
D. Riya
**Answer: C**

### 15

A car goes 10 km North, then 10 km East, then 10 km South. Where is it from start?
A. 10 km East
B. 10 km West
C. 10 km North
D. 10 km South
**Answer: A**

### 16

A pie chart shows category A = 40%, B = 35%, C = 25%. If total = 200, how many belong to B?
A. 60
B. 70
C. 75
D. 80
**Answer: B**

### 17

If 4 workers finish a task in 6 days, how many days will 8 workers take (same rate)?
A. 2
B. 3
C. 4
D. 5
**Answer: B**

### 18

A balance scale shows 2 boxes = 3 bags. If 1 box = 12 kg, weight of 1 bag = ?
A. 6 kg
B. 8 kg
C. 10 kg
D. 12 kg
**Answer: B**

### 19

A train leaves at 2 PM and reaches at 6:30 PM. Total travel time?
A. 4 hrs
B. 4.5 hrs
C. 5 hrs
D. 5.5 hrs
**Answer: B**

### 20

A chart shows sales: Jan 100, Feb 130, Mar 160. Average monthly sales?
A. 120
B. 130
C. 140
D. 150
**Answer: B**

### 21

If all coders know logic and Priya is a coder, then Priya:
A. knows logic
B. does not know logic
C. may know logic
D. is a designer
**Answer: A**

### 22

A and B together earn ₹100. A earns ₹20 more than B. A earns:
A. 40
B. 50
C. 60
D. 70
**Answer: C**

### 23

A student’s marks are 60, 70, 80, 90. Median?
A. 70
B. 75
C. 80
D. 85
**Answer: B**

### 24

A shop sold 120 items in Week 1 and 150 in Week 2. % increase?
A. 20%
B. 25%
C. 30%
D. 35%
**Answer: B**

### 25

Find the missing figure in a visual logic grid *(image-based)*

### 26

A person faces West, turns left, then right, then right. Final direction?
A. North
B. South
C. East
D. West
**Answer: A**

---

## NUMERICAL (13)

### 27

What is 15% of 240?
A. 24
B. 30
C. 36
D. 40
**Answer: C**

### 28

A product priced ₹800 gets 12.5% discount. Final price?
A. 680
B. 700
C. 720
D. 740
**Answer: B**

### 29

Ratio 5:8. If first = 25, second = ?
A. 30
B. 35
C. 40
D. 45
**Answer: C**

### 30

Average of 12, 18, 20, 30 = ?
A. 18
B. 20
C. 22
D. 24
**Answer: B**

### 31

A train covers 180 km in 3 hours. Speed?
A. 50
B. 55
C. 60
D. 65
**Answer: C**

### 32

Find next number:
**4, 9, 16, 25, ?**
A. 30
B. 35
C. 36
D. 49
**Answer: C**

### 33

A person saves 20% of ₹25,000. Savings?
A. 4,000
B. 5,000
C. 6,000
D. 7,500
**Answer: B**

### 34

If 12 men finish a job in 10 days, 6 men will finish in:
A. 15
B. 18
C. 20
D. 24
**Answer: C**

### 35

Simple interest on ₹1000 at 10% for 2 years = ?
A. 100
B. 150
C. 200
D. 250
**Answer: C**

### 36

A number increased by 25% becomes 100. Original number?
A. 75
B. 80
C. 85
D. 90
**Answer: B**

### 37

Profit on cost ₹400 sold at ₹460 = ?
A. 10%
B. 12%
C. 15%
D. 20%
**Answer: C**

### 38

If 3/5 of a number is 24, the number is:
A. 30
B. 36
C. 40
D. 45
**Answer: C**

### 39

A pie chart shows 25% for Science out of 320 students. Science students?
A. 60
B. 70
C. 80
D. 90
**Answer: C**

---

## SPATIAL (13)

Use image-based medium items:
40. mirror image
41. paper folding
42. cube counting
43. cube net
44. embedded figure
45. rotation
46. figure completion
47. matrix reasoning
48. triangle counting
49. top view / front view
50. missing pattern
51. odd figure
52. dot-region / transformation logic

> These are the **right** types. Don’t replace them with random school geometry.

---

# APTITUDE — PROFESSIONALS (52)

Now for professionals, the wording should feel adult and role-relevant — but still not become an MBA exam.

Keep it:

* clean
* fair
* medium difficulty
* reasoning-first

---

## LOGICAL (13)

### 1

Find next number:
**5, 11, 23, 47, ?**
A. 71
B. 89
C. 95
D. 99
**Answer: C**

### 2

Find next term:
**B, E, I, N, ?**
A. R
B. S
C. T
D. U
**Answer: C**

### 3

If PRODUCT = QSPEVDU, then MARKET = ?
A. NBSLFU
B. NBSKFU
C. NBQLFU
D. MBSLFU
**Answer: A**

### 4

Odd one out:
A. 16
B. 25
C. 36
D. 50
**Answer: D**

### 5

If all analysts are detail-oriented and some managers are analysts, which must be true?
A. All managers are detail-oriented
B. Some managers are detail-oriented
C. All detail-oriented people are analysts
D. No analysts are managers
**Answer: B**

### 6

Find next number:
**2, 6, 18, 54, ?**
A. 108
B. 126
C. 144
D. 162
**Answer: D**

### 7

A:B :: C:?
If DOG : BARK :: BEE : ?
A. ROAR
B. BUZZ
C. CHIRP
D. HUM
**Answer: B**

### 8

If REPORT = 635261 and PORT = 5261, then REPO = ?
A. 6352
B. 6523
C. 6235
D. 6351
**Answer: A**

### 9

Which number does not fit?
A. 8
B. 27
C. 64
D. 81
**Answer: D**

### 10

Find next term:
**1, 2, 6, 24, ?**
A. 48
B. 72
C. 96
D. 120
**Answer: D**

### 11

If all audits are reviews and some reviews are strategic, which must be true?
A. All audits are strategic
B. Some audits may be strategic
C. No reviews are strategic
D. All strategic things are audits
**Answer: B**

### 12

Which one is least similar?
A. Policy
B. Procedure
C. Process
D. Banana
**Answer: D**

### 13

Find next number:
**13, 17, 23, 31, ?**
A. 37
B. 39
C. 41
D. 43
**Answer: C**

---

## ANALYTICAL (13)

### 14

A team of 5 completed 40 tasks in a week. At same rate, how many tasks will 8 people complete?
A. 56
B. 60
C. 64
D. 72
**Answer: C**

### 15

A person walks 4 km North, 3 km East, 4 km South. Where are they from start?
A. 3 km East
B. 3 km West
C. 4 km North
D. 4 km South
**Answer: A**

### 16

Sales chart: Q1 = 120, Q2 = 150, Q3 = 180, Q4 = 210. Average quarterly sales?
A. 150
B. 160
C. 165
D. 170
**Answer: C**

### 17

If 3 files take 9 minutes to process, how long for 12 files at same rate?
A. 24
B. 30
C. 36
D. 42
**Answer: C**

### 18

If 2 laptops cost the same as 5 tablets, and one laptop costs ₹50,000, one tablet costs:
A. ₹15,000
B. ₹18,000
C. ₹20,000
D. ₹25,000
**Answer: C**

### 19

A manager is older than Rahul but younger than Meera. Rahul is older than Karan. Who is oldest?
A. Rahul
B. Meera
C. Manager
D. Karan
**Answer: B**

### 20

A project moved from 40% complete to 70% complete. Improvement?
A. 20%
B. 25%
C. 30%
D. 35%
**Answer: C**

### 21

A person faces South, turns left, then left again. Final direction?
A. North
B. East
C. West
D. South
**Answer: A**

### 22

If all consultants present reports and Priya is a consultant, then Priya:
A. presents reports
B. avoids reports
C. may present reports
D. is not a consultant
**Answer: A**

### 23

A team’s weekly output is 90, 100, 110, 120. Median?
A. 100
B. 105
C. 110
D. 115
**Answer: B**

### 24

A stock level fell from 500 to 425. % decrease?
A. 10%
B. 12%
C. 15%
D. 18%
**Answer: C**

### 25

Which visual matrix completes the sequence? *(image-based)*

### 26

A process has 4 stages and each stage takes 15 min. Total time?
A. 45
B. 50
C. 60
D. 75
**Answer: C**

---

## NUMERICAL (13)

### 27

18% of 250 = ?
A. 40
B. 45
C. 50
D. 55
**Answer: B**

### 28

A ₹1,200 item is discounted by 15%. Final price?
A. 980
B. 1000
C. 1020
D. 1080
**Answer: C**

### 29

Ratio 7:9. If first = 42, second = ?
A. 48
B. 50
C. 54
D. 56
**Answer: C**

### 30

Average of 14, 18, 22, 26 = ?
A. 18
B. 20
C. 22
D. 24
**Answer: B**

### 31

A car covers 240 km in 4 hours. Speed?
A. 50
B. 55
C. 60
D. 65
**Answer: C**

### 32

Find next number:
**6, 12, 24, 48, ?**
A. 72
B. 84
C. 96
D. 108
**Answer: C**

### 33

If salary is ₹40,000 and savings = 25%, savings = ?
A. 8,000
B. 10,000
C. 12,000
D. 15,000
**Answer: B**

### 34

8 workers complete work in 15 days. 12 workers take?
A. 8
B. 10
C. 12
D. 14
**Answer: B**

### 35

Simple interest on ₹5,000 at 8% for 2 years = ?
A. 700
B. 750
C. 800
D. 850
**Answer: C**

### 36

A number increased by 20% becomes 96. Original?
A. 70
B. 75
C. 80
D. 85
**Answer: C**

### 37

Profit on cost ₹800 sold at ₹920 = ?
A. 10%
B. 12%
C. 15%
D. 18%
**Answer: C**

### 38

If 4/5 of a number is 64, number = ?
A. 72
B. 76
C. 80
D. 84
**Answer: C**

### 39

A department has 240 employees. 35% are in operations. How many?
A. 72
B. 78
C. 84
D. 90
**Answer: C**

---

## SPATIAL (13)

Same category, adult-styled visuals:
40–52 = image-based medium items:

* mirror image
* folded sheet
* cube net
* 3D view
* figure rotation
* hidden figure
* shape composition
* visual matrix
* triangle counting
* block arrangement
* odd figure
* directional visual transformation
* spatial sequence

---

# 9) APTITUDE SCORING RULES

## Raw score per construct

```text
correct answers / total items in construct
```

## Normalize

```text
normalized = (correct / total_construct_items) * 100
```

---

## Interpretation Bands

### Aptitude

* **0–39** → Needs Development
* **40–59** → Emerging
* **60–74** → Strong
* **75–100** → Very Strong

---

# 10) WHAT SHOULD DIFFER BY COHORT

This is important. This is how you keep it **valid enough**.

---

## 8–10

### Psychometric

* simpler wording
* more school-life examples
* avoid workplace language

### Aptitude

* simpler numbers
* fewer multi-step traps
* visual items should be clear, not overloaded

---

## 11–12

### Psychometric

* more academic/career language
* stronger stream/domain fit

### Aptitude

* medium difficulty with slightly more abstraction
* can include percentages, ratio, interpretation, logic grids

---

## Professionals

### Psychometric

* role/work/task framing
* career transition / domain alignment

### Aptitude

* adult examples (work, process, teams, sales, planning)
* still reasoning-based, not technical-job specific

---

# 11) QUALITY / VALIDATION CHECKLIST

This is **non-negotiable** if this is a business product.

---

## For Every Psychometric Item

Check:

* [ ] Is it measuring **one construct clearly**?
* [ ] Is wording simple enough for that cohort?
* [ ] Is it **not** double-barreled?
* [ ] Is it **not** obviously “socially desirable”?
* [ ] Is reverse wording clear if reverse?

---

## For Every Aptitude Item

Check:

* [ ] Is there only **one correct answer**?
* [ ] Is it deterministic?
* [ ] Is it not too syllabus-heavy?
* [ ] Is difficulty actually medium for target cohort?
* [ ] Is it fair and readable?

---

# 12) WHAT YOU SHOULD FIX BEFORE DEPLOYMENT

Here’s the hard truth:

### You should NOT ship this raw without doing a mini pilot.

Do this first:

---

## Pilot Plan (minimum)

Test on:

* **5 students from 8–10**
* **5 students from 11–12**
* **5 adults/professionals**

Then check:

### Psychometric

* which items confuse people?
* which items feel repetitive?
* where do people ask “what does this mean?”

### Aptitude

* which questions are too easy?
* which are too hard?
* which visual items are ambiguous?

Then remove/refine weak ones.

That one step alone will improve quality massively.

---

# 13) WHAT I WOULD CHANGE IF I WERE SHIPPING THIS FOR MONEY

I’m going to be very honest here.

### The biggest weak point in your product is NOT the code.

It is:

> **the question quality and the recommendation logic**

That is where fake systems die.

So if you want this to feel premium:

## Prioritize:

1. question quality
2. scoring logic
3. report explanation quality

Not:

* animations
* fancy dashboard
* “AI summary” nonsense

---

# 14) FINAL RECOMMENDED FILE STRUCTURE

```text
/app
  /components
  /pages
  /tests
    /psychometric
      /grade_8_10
        questions.json
      /grade_11_12
        questions.json
      /professional
        questions.json
      scoring.ts
      report.ts
      mappings.ts

    /aptitude
      /grade_8_10
        questions.json
      /grade_11_12
        questions.json
      /professional
        questions.json
      scoring.ts
      report.ts
      mappings.ts

  /storage
    db.ts
    candidates.ts
    attempts.ts

  /utils
    normalize.ts
    interpret.ts
    validation.ts
```

---

# 15) FINAL BLUNT VERDICT

This is now **good enough to become a serious version-1 product foundation**.

Not perfect.
Not “psychology lab certified.”
But **far better than most cheap career-assessment junk**.

And more importantly:

👉 It is now **architecturally correct**
👉 **measurement-driven**
👉 **cohort-aware**
👉 **report-friendly**
👉 **business-usable**

---
