Good.
Now this one needs the **most maturity in tone**.

Because if a working adult sees childish or school-style questions, the product instantly loses credibility.

So this bank must feel:

> **adult, neutral, structured, and intelligent**

Not:

* school aptitude worksheet
* CAT coaching sheet
* random IQ puzzle website

---

# 🧠 **PROFESSIONAL APTITUDE BANK — FINAL PRODUCTION VERSION**

This is designed for:

* college graduates
* early professionals
* working adults
* career switch / counselling use

---

# 📌 DESIGN STANDARD FOR THIS BANK

This bank should feel like:

* reasoning-based
* workplace-neutral
* adult in language
* not domain-specific
* not too academic

---

# 📦 FORMAT

Use this structure later in DB / JSON:

```json
{
  "id": "",
  "cohort": "professional",
  "construct": "",
  "difficulty": "easy | medium | hard",
  "mode": "text | visual_recommended",
  "question": "",
  "options": ["", "", "", ""],
  "correct_answer": "",
  "explanation": ""
}
```

---

# =========================

# 1) LOGICAL REASONING (13)

# =========================

## Difficulty split:

* Easy = 2
* Medium = 8
* Hard = 3

---

### EASY (2)

```json
{
  "id": "PRO_L_001",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Find the next term: 12, 24, 48, 96, ?",
  "options": ["144", "168", "192", "200"],
  "correct_answer": "192",
  "explanation": "Each term is multiplied by 2."
}
```

```json
{
  "id": "PRO_L_002",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "If REPORT is coded as SFQPSU, then DATA is coded as:",
  "options": ["EBUB", "EBVA", "FAVA", "EBTA"],
  "correct_answer": "EBUB",
  "explanation": "Each letter shifts forward by 1."
}
```

---

### MEDIUM (8)

```json
{
  "id": "PRO_L_003",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next number: 3, 8, 15, 24, 35, ?",
  "options": ["44", "46", "48", "50"],
  "correct_answer": "48",
  "explanation": "Pattern: +5, +7, +9, +11, so next is +13."
}
```

```json
{
  "id": "PRO_L_004",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Complete the pattern: ZA, YB, XC, ?",
  "options": ["WD", "VC", "WE", "XD"],
  "correct_answer": "WD",
  "explanation": "First letters move backward, second letters move forward."
}
```

```json
{
  "id": "PRO_L_005",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Which number does not belong? 16, 25, 36, 45, 49",
  "options": ["25", "36", "45", "49"],
  "correct_answer": "45",
  "explanation": "All others are perfect squares."
}
```

```json
{
  "id": "PRO_L_006",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If A = 1, B = 2, ..., Z = 26, then the value of TEAM is:",
  "options": ["35", "37", "39", "41"],
  "correct_answer": "39",
  "explanation": "T=20, E=5, A=1, M=13 → total = 39."
}
```

```json
{
  "id": "PRO_L_007",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If all FINS are ROPS and all ROPS are MELS, which statement is definitely true?",
  "options": [
    "All FINS are MELS",
    "Some FINS are MELS",
    "No FINS are MELS",
    "All MELS are FINS"
  ],
  "correct_answer": "All FINS are MELS",
  "explanation": "If FINS ⊂ ROPS and ROPS ⊂ MELS, then FINS ⊂ MELS."
}
```

```json
{
  "id": "PRO_L_008",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next term: 2, 5, 11, 23, 47, ?",
  "options": ["91", "95", "97", "99"],
  "correct_answer": "95",
  "explanation": "Pattern: multiply by 2 and add 1."
}
```

```json
{
  "id": "PRO_L_009",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Which pair best matches the relationship? Policy : Organization",
  "options": [
    "Curriculum : School",
    "Battery : Phone",
    "Fuel : Vehicle",
    "Contract : Signature"
  ],
  "correct_answer": "Curriculum : School",
  "explanation": "A policy belongs to / governs an organization; a curriculum belongs to / governs a school."
}
```

```json
{
  "id": "PRO_L_010",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "In a 3×3 symbol matrix, each row increases the number of shapes by one while alternating between circle and square. Which option completes the final cell?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "The final cell must follow both count and alternation rules."
}
```

---

### HARD (3)

```json
{
  "id": "PRO_L_011",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "Find the next number: 1, 3, 12, 60, 360, ?",
  "options": ["1440", "2160", "2520", "2880"],
  "correct_answer": "2520",
  "explanation": "Pattern: ×3, ×4, ×5, ×6, so next is ×7."
}
```

```json
{
  "id": "PRO_L_012",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "Which pair best completes the analogy? Blueprint : Building :: Strategy : ?",
  "options": ["Goal", "Execution", "Manager", "Meeting"],
  "correct_answer": "Execution",
  "explanation": "A blueprint guides a building; a strategy guides execution."
}
```

```json
{
  "id": "PRO_L_013",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A sequence follows this rule: multiply by 3, then subtract 2. Starting from 2, what is the 5th term?",
  "options": ["22", "34", "46", "58"],
  "correct_answer": "58",
  "explanation": "Sequence: 2 → 4 → 10 → 28 → 82. NOTE: The options are wrong; fix below."
}
```

🚨 **Fixing properly**:

```json
{
  "id": "PRO_L_013",
  "cohort": "professional",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A sequence follows this rule: multiply by 3, then subtract 2. Starting from 2, what is the 5th term?",
  "options": ["28", "46", "58", "82"],
  "correct_answer": "82",
  "explanation": "Sequence: 2 → 4 → 10 → 28 → 82."
}
```

---

# =========================

# 2) ANALYTICAL REASONING (13)

# =========================

## Difficulty split:

* Easy = 2
* Medium = 8
* Hard = 3

---

### EASY (2)

```json
{
  "id": "PRO_A_001",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "A report is submitted after review. Review happens after drafting. Which step comes first?",
  "options": ["Drafting", "Review", "Submission", "Approval"],
  "correct_answer": "Drafting",
  "explanation": "Drafting must happen before review and submission."
}
```

```json
{
  "id": "PRO_A_002",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "A person starts facing North, turns left, then turns right. Which direction are they facing now?",
  "options": ["North", "South", "East", "West"],
  "correct_answer": "North",
  "explanation": "North → West → North."
}
```

---

### MEDIUM (8)

```json
{
  "id": "PRO_A_003",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Five tasks — A, B, C, D, and E — must be completed. B must be after A. D must be before E. Which statement must be true?",
  "options": [
    "B is before A",
    "D is before E",
    "E is before D",
    "C is after B"
  ],
  "correct_answer": "D is before E",
  "explanation": "This is directly stated as a fixed condition."
}
```

```json
{
  "id": "PRO_A_004",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A project team has 4 members: one handles design, one handles testing, one handles documentation, and one handles deployment. If Riya does not do testing and Arjun does deployment, which statement is definitely true?",
  "options": [
    "Riya does design",
    "Arjun does not do testing",
    "Riya does documentation",
    "Testing is done by Riya"
  ],
  "correct_answer": "Arjun does not do testing",
  "explanation": "If Arjun does deployment, he cannot also do testing."
}
```

```json
{
  "id": "PRO_A_005",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A person walks 8 m east, then 6 m north. How far are they from the starting point?",
  "options": ["10 m", "12 m", "14 m", "8 m"],
  "correct_answer": "10 m",
  "explanation": "Forms a 6-8-10 right triangle."
}
```

```json
{
  "id": "PRO_A_006",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A dashboard shows quarterly performance: Q1 = 72, Q2 = 81, Q3 = 77, Q4 = 88. Which quarter performed second best?",
  "options": ["Q1", "Q2", "Q3", "Q4"],
  "correct_answer": "Q2",
  "explanation": "Q4 = 88 is highest, Q2 = 81 is second highest."
}
```

```json
{
  "id": "PRO_A_007",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If all consultants are professionals and some professionals are trainers, which statement is logically possible?",
  "options": [
    "All consultants are trainers",
    "Some consultants may be trainers",
    "No consultants are professionals",
    "All trainers are consultants"
  ],
  "correct_answer": "Some consultants may be trainers",
  "explanation": "Overlap is possible but not guaranteed."
}
```

```json
{
  "id": "PRO_A_008",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Three candidates scored 68, 74, and 82. Mehul did not score the lowest. Priya scored more than Mehul. Who scored 74?",
  "options": ["Mehul", "Priya", "Third candidate", "Cannot say"],
  "correct_answer": "Mehul",
  "explanation": "Priya > Mehul and Mehul is not lowest, so Mehul = 74 and Priya = 82."
}
```

```json
{
  "id": "PRO_A_009",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A team meeting is held every 3 days starting Monday. On which day will the 4th meeting occur?",
  "options": ["Thursday", "Friday", "Saturday", "Sunday"],
  "correct_answer": "Thursday",
  "explanation": "Meetings: Monday, Thursday, Sunday, Wednesday — wait, that’s wrong. Fix below."
}
```

🚨 **Correcting this properly**:

```json
{
  "id": "PRO_A_009",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A team meeting is held every 2 days starting Monday. On which day will the 4th meeting occur?",
  "options": ["Thursday", "Friday", "Saturday", "Sunday"],
  "correct_answer": "Sunday",
  "explanation": "Meetings: Monday (1st), Wednesday (2nd), Friday (3rd), Sunday (4th)."
}
```

```json
{
  "id": "PRO_A_010",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If all reports need approval before publishing, and this document is published, what must be true?",
  "options": [
    "It was approved",
    "It was rejected",
    "It was edited",
    "It was drafted today"
  ],
  "correct_answer": "It was approved",
  "explanation": "Approval is a necessary condition before publishing."
}
```

---

### HARD (3)

```json
{
  "id": "PRO_A_011",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "P, Q, R, S, and T are assigned to five consecutive time slots. Q is after P but before R. T is not in the first or last slot. Which person must be in the middle slot?",
  "options": ["Q", "R", "T", "Cannot be determined"],
  "correct_answer": "Cannot be determined",
  "explanation": "There are multiple valid arrangements, so no single person must occupy the middle slot."
}
```

```json
{
  "id": "PRO_A_012",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A person travels 10 km north, 6 km east, and 10 km south. How far are they from the starting point?",
  "options": ["4 km", "6 km", "8 km", "10 km"],
  "correct_answer": "6 km",
  "explanation": "North and south cancel out, leaving 6 km east."
}
```

```json
{
  "id": "PRO_A_013",
  "cohort": "professional",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A company survey shows 40 employees use Tool A, 28 use Tool B, and 15 use both. How many use only Tool A?",
  "options": ["15", "20", "25", "28"],
  "correct_answer": "25",
  "explanation": "Only Tool A = 40 - 15 = 25."
}
```

---

# =========================

# 3) NUMERICAL REASONING (13)

# =========================

## Difficulty split:

* Easy = 2
* Medium = 8
* Hard = 3

---

### EASY (2)

```json
{
  "id": "PRO_N_001",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "What is 20% of 350?",
  "options": ["60", "70", "80", "90"],
  "correct_answer": "70",
  "explanation": "20% of 350 = 70."
}
```

```json
{
  "id": "PRO_N_002",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "If 4 files take 12 minutes to process, how long does 1 file take on average?",
  "options": ["2 min", "3 min", "4 min", "5 min"],
  "correct_answer": "3 min",
  "explanation": "12 ÷ 4 = 3 minutes."
}
```

---

### MEDIUM (8)

```json
{
  "id": "PRO_N_003",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A service priced at ₹2,500 is offered at a 12% discount. What is the final price?",
  "options": ["₹2,100", "₹2,200", "₹2,250", "₹2,300"],
  "correct_answer": "₹2,200",
  "explanation": "12% of 2500 = 300, so final price = 2200."
}
```

```json
{
  "id": "PRO_N_004",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A consultant works 42 hours in 6 days. What is the average number of hours worked per day?",
  "options": ["6", "7", "8", "9"],
  "correct_answer": "7",
  "explanation": "42 ÷ 6 = 7."
}
```

```json
{
  "id": "PRO_N_005",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A project budget increases from ₹80,000 to ₹92,000. What is the percentage increase?",
  "options": ["10%", "12%", "15%", "18%"],
  "correct_answer": "15%",
  "explanation": "Increase = 12,000; 12,000 / 80,000 = 15%."
}
```

```json
{
  "id": "PRO_N_006",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "The average of 18, 24, 30, 36, and 42 is:",
  "options": ["28", "30", "32", "34"],
  "correct_answer": "30",
  "explanation": "Sum = 150; 150 ÷ 5 = 30."
}
```

```json
{
  "id": "PRO_N_007",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A chart shows weekly output: Week 1 = 120, Week 2 = 150, Week 3 = 135, Week 4 = 165. What is the average output?",
  "options": ["140", "142.5", "145", "147.5"],
  "correct_answer": "142.5",
  "explanation": "(120 + 150 + 135 + 165) / 4 = 570 / 4 = 142.5."
}
```

```json
{
  "id": "PRO_N_008",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If 5 employees can complete a task in 8 days, how many employee-days are required in total?",
  "options": ["35", "40", "45", "50"],
  "correct_answer": "40",
  "explanation": "5 × 8 = 40 employee-days."
}
```

```json
{
  "id": "PRO_N_009",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A subscription costs ₹1,800 per year. What is the approximate monthly cost?",
  "options": ["₹120", "₹130", "₹140", "₹150"],
  "correct_answer": "₹150",
  "explanation": "1800 ÷ 12 = 150."
}
```

```json
{
  "id": "PRO_N_010",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next number: 9, 18, 36, 72, ?",
  "options": ["108", "126", "144", "162"],
  "correct_answer": "144",
  "explanation": "Each term is multiplied by 2."
}
```

---

### HARD (3)

```json
{
  "id": "PRO_N_011",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A product gets successive discounts of 20% and 10% on ₹5,000. What is the final price?",
  "options": ["₹3,500", "₹3,600", "₹4,000", "₹4,100"],
  "correct_answer": "₹3,600",
  "explanation": "After 20% off: ₹4,000. Then 10% off ₹4,000 = ₹3,600."
}
```

```json
{
  "id": "PRO_N_012",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A and B together complete a task in 15 days. A alone takes 25 days. How many days will B alone take?",
  "options": ["30", "35", "37.5", "40"],
  "correct_answer": "37.5",
  "explanation": "A+B = 1/15, A = 1/25, so B = 1/15 - 1/25 = 2/75 = 1/37.5."
}
```

```json
{
  "id": "PRO_N_013",
  "cohort": "professional",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "The ratio of technical to non-technical staff is 4:3. If total staff is 84, how many are non-technical?",
  "options": ["30", "32", "36", "40"],
  "correct_answer": "36",
  "explanation": "Total parts = 7; one part = 12; non-technical = 3 × 12 = 36."
}
```

---

# =========================

# 4) SPATIAL / VISUAL REASONING (13)

# =========================

## Difficulty split:

* Easy = 2
* Medium = 8
* Hard = 3

⚠️ Again: this section should ideally be image-based in final implementation.

---

### EASY (2)

```json
{
  "id": "PRO_S_001",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "A downward arrow is rotated 90° clockwise. Which direction will it point?",
  "options": ["Left", "Right", "Up", "Down"],
  "correct_answer": "Left",
  "explanation": "A downward arrow rotated clockwise points left."
}
```

```json
{
  "id": "PRO_S_002",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "A sheet is folded once and one circular hole is punched. How many holes appear when opened?",
  "options": ["1", "2", "3", "4"],
  "correct_answer": "2",
  "explanation": "One fold duplicates the punched hole."
}
```

---

### MEDIUM (8)

```json
{
  "id": "PRO_S_003",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which option shows the correct mirror image of the given geometric pattern?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "A",
  "explanation": "Correct mirror image reverses horizontal orientation only."
}
```

```json
{
  "id": "PRO_S_004",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A cube has one striped face and one shaded face. After rotation, which option preserves the correct face relationship?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "D",
  "explanation": "Tests face adjacency and cube rotation."
}
```

```json
{
  "id": "PRO_S_005",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which smaller symbol is hidden inside the larger technical-style figure?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "B",
  "explanation": "Tests embedded figure recognition."
}
```

```json
{
  "id": "PRO_S_006",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A square is divided by one vertical line and one diagonal. How many regions are formed?",
  "options": ["3", "4", "5", "6"],
  "correct_answer": "4",
  "explanation": "The lines divide the square into 4 enclosed regions."
}
```

```json
{
  "id": "PRO_S_007",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A net of a cube is shown with one face marked X. Which face will be opposite X when folded?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "Tests cube net interpretation."
}
```

```json
{
  "id": "PRO_S_008",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which option correctly completes the 3×3 visual matrix based on rotation and fill pattern?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "B",
  "explanation": "The missing figure must satisfy both transformation rules."
}
```

```json
{
  "id": "PRO_S_009",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A folded sheet has two holes punched near the center. Which unfolded option is correct?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "Tests fold symmetry and placement."
}
```

```json
{
  "id": "PRO_S_010",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A geometric logo is rotated 180°. Which option matches the rotated result?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "D",
  "explanation": "Tests mental rotation rather than mirror reflection."
}
```

---

### HARD (3)

```json
{
  "id": "PRO_S_011",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A cube is painted on all outer faces and cut into 64 smaller cubes. How many small cubes will have exactly 2 painted faces?",
  "options": ["12", "16", "24", "32"],
  "correct_answer": "24",
  "explanation": "For a 4×4×4 cube, edge cubes excluding corners = 12 × (4-2) = 24."
}
```

```json
{
  "id": "PRO_S_012",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A paper is folded twice and one angled cut is made. Which option shows the correct unfolded pattern?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "A",
  "explanation": "Tests multi-step fold and cut visualization."
}
```

```json
{
  "id": "PRO_S_013",
  "cohort": "professional",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A complex overlapping figure contains several triangles of different sizes. How many total triangles are present?",
  "options": ["12", "14", "16", "18"],
  "correct_answer": "14",
  "explanation": "Requires counting both smallest and composite triangles."
}
```

---

# ✅ FINAL PROFESSIONAL APTITUDE BANK SUMMARY

## Total = 52 Questions

### Logical Reasoning = 13

### Analytical Reasoning = 13

### Numerical Reasoning = 13

### Spatial / Visual Reasoning = 13

---

# 🚨 BRUTAL HONEST REVIEW OF THIS BANK

This one is **way better suited for adults** than if you had reused the school bank.

## What’s strong:

* tone is cleaner and more mature
* less school-like framing
* analytical section feels more adult
* numerical section is practical enough
* logical section doesn’t feel childish

---

# ⚠️ What still needs honesty:

## 1) This is still **V1 assessment-grade**, not corporate psychometric vendor-grade

That’s okay.
For your scope, this is strong.

You do **not** need SHL-level industrial assessment science for a ₹10k–15k offline counselling product.

You need:

* clean logic
* fair difficulty
* consistent scoring
* believable reports

That’s what matters.

---

## 2) Spatial is still only as good as your final image design

If the visuals are sloppy, this section dies.

That is non-negotiable.

---

## 3) Some items should later be shuffled / randomized

Absolutely do this.

Otherwise repeated in-office usage becomes predictable.

---

