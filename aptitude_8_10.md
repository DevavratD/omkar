Perfect.
Now we do this **for real**.

I’m going to generate:

# 🧠 **GRADE 8–10 APTITUDE BANK — FINAL PRODUCTION VERSION**

This bank will be:

* age-appropriate
* not childish
* medium-dominant
* deterministic
* fair for career aptitude screening

And yes — I’m going to be stricter than before.

---

# 📌 IMPORTANT IMPLEMENTATION NOTE

For **Grade 8–10**, some questions should ideally be **text-only**, and some should later be converted into **image-based visual items** in your UI.

So I’ll label clearly where a question is:

* **TEXT**
* **VISUAL_RECOMMENDED**

That way:

* you can ship faster now
* later upgrade visuals properly

---

# 📦 FINAL FORMAT

Use this structure later in DB / JSON:

```json
{
  "id": "",
  "cohort": "grade_8_10",
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

* Easy = 4
* Medium = 7
* Hard = 2

---

### EASY (4)

```json
{
  "id": "G810_L_001",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Find the next number: 4, 7, 10, 13, ?",
  "options": ["15", "16", "17", "18"],
  "correct_answer": "16",
  "explanation": "The pattern increases by +3 each time."
}
```

```json
{
  "id": "G810_L_002",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "If A = 1, B = 2, C = 3, then CAB = ?",
  "options": ["5", "6", "7", "8"],
  "correct_answer": "6",
  "explanation": "C = 3, A = 1, B = 2 → 3 + 1 + 2 = 6."
}
```

```json
{
  "id": "G810_L_003",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Which pair is most similar? Book : Read",
  "options": ["Pen : Write", "Ball : Throw", "Shoe : Walk", "Clock : Time"],
  "correct_answer": "Pen : Write",
  "explanation": "A book is used for reading, just as a pen is used for writing."
}
```

```json
{
  "id": "G810_L_004",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Find the next letter pair: AB, DE, GH, ?",
  "options": ["IJ", "JK", "KL", "MN"],
  "correct_answer": "JK",
  "explanation": "The pairs move ahead by 3 letters each time: AB → DE → GH → JK."
}
```

---

### MEDIUM (7)

```json
{
  "id": "G810_L_005",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next number: 3, 6, 12, 24, ?",
  "options": ["36", "42", "48", "54"],
  "correct_answer": "48",
  "explanation": "Each number is multiplied by 2."
}
```

```json
{
  "id": "G810_L_006",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If PEN is coded as 123, and PAPER is coded as 14526, then what is PEAR?",
  "options": ["1426", "1526", "1456", "1326"],
  "correct_answer": "1426",
  "explanation": "P = 1, E = 2, A = 4, R = 6."
}
```

```json
{
  "id": "G810_L_007",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Which number does not belong? 11, 22, 33, 47, 55",
  "options": ["22", "33", "47", "55"],
  "correct_answer": "47",
  "explanation": "All others are multiples of 11."
}
```

```json
{
  "id": "G810_L_008",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the missing term: 2, 5, 10, 17, 26, ?",
  "options": ["35", "36", "37", "38"],
  "correct_answer": "37",
  "explanation": "Pattern is +3, +5, +7, +9, so next is +11."
}
```

```json
{
  "id": "G810_L_009",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If all BLOOPS are RAZS and all RAZS are TINS, then all BLOOPS are definitely:",
  "options": ["TINS", "Not TINS", "Sometimes TINS", "None of these"],
  "correct_answer": "TINS",
  "explanation": "If BLOOPS ⊂ RAZS and RAZS ⊂ TINS, then BLOOPS ⊂ TINS."
}
```

```json
{
  "id": "G810_L_010",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A 2×2 matrix has these patterns:\nTop-left = 1 dot, Top-right = 2 dots,\nBottom-left = 2 dots, Bottom-right = ?\nWhich option best completes the pattern?",
  "options": ["1 dot", "2 dots", "3 dots", "4 dots"],
  "correct_answer": "3 dots",
  "explanation": "The pattern increases by 1 across and down."
}
```

```json
{
  "id": "G810_L_011",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If MONDAY is coded as NPOEBZ, how is FRIDAY coded?",
  "options": ["GSJEBZ", "GSJEBX", "GRJEBZ", "FSJEBZ"],
  "correct_answer": "GSJEBZ",
  "explanation": "Each letter moves one step forward in the alphabet."
}
```

---

### HARD (2)

```json
{
  "id": "G810_L_012",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "Find the next number: 1, 4, 9, 16, 25, ?",
  "options": ["30", "35", "36", "49"],
  "correct_answer": "36",
  "explanation": "These are perfect squares: 1², 2², 3², 4², 5², so next is 6² = 36."
}
```

```json
{
  "id": "G810_L_013",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A pattern follows this rule: multiply by 2, then add 1. Starting from 3, what is the 4th number?",
  "options": ["13", "15", "17", "19"],
  "correct_answer": "31",
  "explanation": "Sequence: 3 → 7 → 15 → 31. NOTE: You must replace options to include 31."
}
```

🚨 **Important:**
This one exposes something important: **option mismatch**. Good catch point.
So here is the **correct fixed version**:

```json
{
  "id": "G810_L_013",
  "cohort": "grade_8_10",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A pattern follows this rule: multiply by 2, then add 1. Starting from 3, what is the 4th number?",
  "options": ["15", "21", "31", "27"],
  "correct_answer": "31",
  "explanation": "Sequence: 3 → 7 → 15 → 31."
}
```

---

# =========================

# 2) ANALYTICAL REASONING (13)

# =========================

## Difficulty split:

* Easy = 4
* Medium = 7
* Hard = 2

---

### EASY (4)

```json
{
  "id": "G810_A_001",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Riya is taller than Meena. Meena is taller than Pooja. Who is the tallest?",
  "options": ["Meena", "Pooja", "Riya", "Cannot say"],
  "correct_answer": "Riya",
  "explanation": "Riya > Meena > Pooja."
}
```

```json
{
  "id": "G810_A_002",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "A boy walks 5 steps forward and then turns right. Which direction is he now facing if he started facing North?",
  "options": ["South", "East", "West", "North"],
  "correct_answer": "East",
  "explanation": "Turning right from North means facing East."
}
```

```json
{
  "id": "G810_A_003",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Four students scored 20, 25, 30, and 35. Who scored second highest?",
  "options": ["20", "25", "30", "35"],
  "correct_answer": "30",
  "explanation": "Scores in order: 35, 30, 25, 20."
}
```

```json
{
  "id": "G810_A_004",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "If today is Tuesday, what day will it be 3 days later?",
  "options": ["Thursday", "Friday", "Saturday", "Sunday"],
  "correct_answer": "Friday",
  "explanation": "Tuesday → Wednesday → Thursday → Friday."
}
```

---

### MEDIUM (7)

```json
{
  "id": "G810_A_005",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A is older than B. B is older than C. D is older than A. Who is the youngest?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "D > A > B > C."
}
```

```json
{
  "id": "G810_A_006",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A student walks 4 m north, then 3 m east. How far is the student from the starting point?",
  "options": ["5 m", "6 m", "7 m", "4 m"],
  "correct_answer": "5 m",
  "explanation": "Forms a 3-4-5 right triangle."
}
```

```json
{
  "id": "G810_A_007",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Five books are arranged from left to right as: Red, Blue, Green, Yellow, Black. Which book is in the middle?",
  "options": ["Blue", "Green", "Yellow", "Black"],
  "correct_answer": "Green",
  "explanation": "The 3rd of 5 items is the middle."
}
```

```json
{
  "id": "G810_A_008",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If Ravi is to the left of Aman, and Aman is to the left of Karan, who is in the middle?",
  "options": ["Ravi", "Aman", "Karan", "Cannot say"],
  "correct_answer": "Aman",
  "explanation": "Order: Ravi, Aman, Karan."
}
```

```json
{
  "id": "G810_A_009",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A can finish a task in 6 days, B in 3 days. Who works faster?",
  "options": ["A", "B", "Both same", "Cannot say"],
  "correct_answer": "B",
  "explanation": "Fewer days means faster work."
}
```

```json
{
  "id": "G810_A_010",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A class chart shows: Maths = 20 students, Science = 15 students, English = 25 students. Which subject has the fewest students?",
  "options": ["Maths", "Science", "English", "All equal"],
  "correct_answer": "Science",
  "explanation": "15 is the smallest number."
}
```

```json
{
  "id": "G810_A_011",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If every square is a rectangle, and every rectangle has 4 sides, then every square definitely has:",
  "options": ["3 sides", "4 sides", "5 sides", "6 sides"],
  "correct_answer": "4 sides",
  "explanation": "Squares are rectangles, and rectangles have 4 sides."
}
```

---

### HARD (2)

```json
{
  "id": "G810_A_012",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "P, Q, R, and S stand in a line. Q is between P and R. S is not at an end. Who must be in the middle two positions?",
  "options": ["P and Q", "Q and S", "R and S", "Cannot be determined"],
  "correct_answer": "Q and S",
  "explanation": "Q must be between P and R, and S cannot be at an end, so Q and S occupy middle positions."
}
```

```json
{
  "id": "G810_A_013",
  "cohort": "grade_8_10",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A student starts facing East, turns left, then left again, then right. Which direction is the student facing now?",
  "options": ["North", "South", "East", "West"],
  "correct_answer": "North",
  "explanation": "East → North → West → North."
}
```

---

# =========================

# 3) NUMERICAL REASONING (13)

# =========================

## Difficulty split:

* Easy = 4
* Medium = 7
* Hard = 2

---

### EASY (4)

```json
{
  "id": "G810_N_001",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "What is 25% of 80?",
  "options": ["10", "15", "20", "25"],
  "correct_answer": "20",
  "explanation": "25% means one-fourth. One-fourth of 80 is 20."
}
```

```json
{
  "id": "G810_N_002",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "The ratio of boys to girls in a class is 2:3. If there are 10 boys, how many girls are there?",
  "options": ["12", "15", "18", "20"],
  "correct_answer": "15",
  "explanation": "If 2 parts = 10, then 1 part = 5, so 3 parts = 15."
}
```

```json
{
  "id": "G810_N_003",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Find the average of 6, 8, and 10.",
  "options": ["7", "8", "9", "10"],
  "correct_answer": "8",
  "explanation": "(6 + 8 + 10) / 3 = 24 / 3 = 8."
}
```

```json
{
  "id": "G810_N_004",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "A pencil costs ₹12. What is the cost of 5 pencils?",
  "options": ["₹50", "₹55", "₹60", "₹65"],
  "correct_answer": "₹60",
  "explanation": "12 × 5 = 60."
}
```

---

### MEDIUM (7)

```json
{
  "id": "G810_N_005",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A shirt marked at ₹800 is sold at 10% discount. What is the selling price?",
  "options": ["₹700", "₹720", "₹740", "₹760"],
  "correct_answer": "₹720",
  "explanation": "10% of 800 = 80, so selling price = 800 - 80 = 720."
}
```

```json
{
  "id": "G810_N_006",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A train travels 120 km in 3 hours. What is its speed per hour?",
  "options": ["30 km/h", "35 km/h", "40 km/h", "45 km/h"],
  "correct_answer": "40 km/h",
  "explanation": "Speed = Distance / Time = 120 / 3 = 40 km/h."
}
```

```json
{
  "id": "G810_N_007",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A student scored 45 out of 60 in a test. What percentage is this?",
  "options": ["70%", "75%", "80%", "85%"],
  "correct_answer": "75%",
  "explanation": "45/60 = 0.75 = 75%."
}
```

```json
{
  "id": "G810_N_008",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A shopkeeper buys an item for ₹200 and sells it for ₹240. What is the profit?",
  "options": ["₹20", "₹30", "₹40", "₹50"],
  "correct_answer": "₹40",
  "explanation": "Profit = Selling Price - Cost Price = 240 - 200 = 40."
}
```

```json
{
  "id": "G810_N_009",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If 4 notebooks cost ₹96, what is the cost of 1 notebook?",
  "options": ["₹20", "₹22", "₹24", "₹26"],
  "correct_answer": "₹24",
  "explanation": "96 ÷ 4 = 24."
}
```

```json
{
  "id": "G810_N_010",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A bar graph shows sales on four days: Monday = 20, Tuesday = 30, Wednesday = 25, Thursday = 35. On which day were sales highest?",
  "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
  "correct_answer": "Thursday",
  "explanation": "35 is the highest value."
}
```

```json
{
  "id": "G810_N_011",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next number: 5, 10, 20, 40, ?",
  "options": ["60", "70", "80", "90"],
  "correct_answer": "80",
  "explanation": "Each number is multiplied by 2."
}
```

---

### HARD (2)

```json
{
  "id": "G810_N_012",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A water tank is 3/5 full. If the tank holds 100 litres, how much water is inside?",
  "options": ["50 L", "60 L", "70 L", "80 L"],
  "correct_answer": "60 L",
  "explanation": "3/5 of 100 = 60."
}
```

```json
{
  "id": "G810_N_013",
  "cohort": "grade_8_10",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A student spends 1/4 of pocket money on books and 1/2 on snacks. What fraction is left?",
  "options": ["1/4", "1/3", "1/2", "3/4"],
  "correct_answer": "1/4",
  "explanation": "1/4 + 1/2 = 3/4 spent, so 1/4 remains."
}
```

---

# =========================

# 4) SPATIAL / VISUAL REASONING (13)

# =========================

## Difficulty split:

* Easy = 4
* Medium = 7
* Hard = 2

⚠️ Important:
These are best implemented as **image-based** later.
For now I’ll define them in a clean text-spec format so you can convert them into visuals.

---

### EASY (4)

```json
{
  "id": "G810_S_001",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "A right-pointing arrow is shown in a mirror. Which direction will the mirrored arrow point?",
  "options": ["Left", "Right", "Up", "Down"],
  "correct_answer": "Left",
  "explanation": "A mirror flips left and right."
}
```

```json
{
  "id": "G810_S_002",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "A square is rotated 90° clockwise. How many sides does it still have?",
  "options": ["2", "3", "4", "5"],
  "correct_answer": "4",
  "explanation": "Rotation does not change the number of sides."
}
```

```json
{
  "id": "G810_S_003",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "A paper is folded once in half. If one hole is punched through the folded paper, how many holes will appear when opened?",
  "options": ["1", "2", "3", "4"],
  "correct_answer": "2",
  "explanation": "One fold doubles the punched hole."
}
```

```json
{
  "id": "G810_S_004",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "How many triangles are there in a simple large triangle divided into 4 equal smaller triangles?",
  "options": ["3", "4", "5", "6"],
  "correct_answer": "4",
  "explanation": "The figure contains 4 smallest triangles."
}
```

---

### MEDIUM (7)

```json
{
  "id": "G810_S_005",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A cube has one face shaded. If the cube is rotated, which option shows the shaded face in the correct new position?",
  "options": [
    "Option A (correct rotation)",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correct_answer": "Option A (correct rotation)",
  "explanation": "This tests mental cube rotation and face tracking."
}
```

```json
{
  "id": "G810_S_006",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which figure is the mirror image of the shape shown?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "A",
  "explanation": "Correct answer must reverse left-right orientation without changing top-bottom."
}
```

```json
{
  "id": "G810_S_007",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A shape is folded along a line. Which option shows the correct folded result?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "B",
  "explanation": "Tests fold symmetry and spatial prediction."
}
```

```json
{
  "id": "G810_S_008",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which smaller shape is hidden inside the larger figure?",
  "options": ["Triangle", "Square", "Arrow", "Diamond"],
  "correct_answer": "Diamond",
  "explanation": "Tests embedded figure recognition."
}
```

```json
{
  "id": "G810_S_009",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A pattern of dots forms a square. One extra line is added diagonally. How many regions are formed?",
  "options": ["2", "3", "4", "5"],
  "correct_answer": "2",
  "explanation": "A single diagonal splits a square into 2 regions."
}
```

```json
{
  "id": "G810_S_010",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which option completes the visual pattern in a 2×2 figure matrix?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "The missing figure must follow the visual transformation pattern."
}
```

```json
{
  "id": "G810_S_011",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A net of a cube is shown. Which face will be opposite the shaded face when folded?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "D",
  "explanation": "Tests cube-net folding logic."
}
```

---

### HARD (2)

```json
{
  "id": "G810_S_012",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A paper is folded twice and one corner is cut. Which option shows the correct unfolded pattern?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "B",
  "explanation": "Tests multi-fold spatial prediction."
}
```

```json
{
  "id": "G810_S_013",
  "cohort": "grade_8_10",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A complex figure contains overlapping triangles. How many triangles are present in total?",
  "options": ["8", "9", "10", "11"],
  "correct_answer": "9",
  "explanation": "Requires layered region counting, not just visible small triangles."
}
```

---

# ✅ FINAL GRADE 8–10 APTITUDE BANK SUMMARY

## Total = 52 Questions

### Logical Reasoning = 13

### Analytical Reasoning = 13

### Numerical Reasoning = 13

### Spatial / Visual Reasoning = 13

---

# 🚨 BRUTAL HONEST REVIEW OF THIS BANK

## What’s strong:

* much better than the earlier lazy generic set
* difficulty is more age-appropriate
* no obviously insulting “car/dog” nonsense
* numerical is practical and fair
* analytical is usable
* logical is acceptable for 8–10

---

# ⚠️ What still needs honesty:

## 1) Spatial section is only **blueprint-grade final**, not image-final

That’s not a flaw — that’s reality.

Because proper spatial questions need:

* designed figures
* tested distractors
* clean visuals

Text-only spatial is never ideal.

---

## 2) A few logical items are still on the **lower-medium edge**

That’s okay for 8–10, but not acceptable for 11–12.

So when we move to 11–12:
👉 we must sharpen it significantly.

---

## 3) Some analytical items are clean but still a little “school aptitude”

That’s okay for this cohort.

For professionals, this style would be weak.

