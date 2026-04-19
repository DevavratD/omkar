Good.
Now we move to the **most important aptitude bank** in your whole product:

# 🧠 **GRADE 11–12 APTITUDE BANK — FINAL PRODUCTION VERSION**

This one matters the most because this is the cohort where students and parents will most strongly judge whether your system feels:

* serious
* credible
* “career-relevant”
* worth paying for

So this bank must feel:

> **smart, fair, and not childish**

Not:

* school exam paper
* fake IQ quiz
* coaching class leftover worksheet

---

# 📌 DESIGN STANDARD FOR THIS BANK

This bank is calibrated for:

* **11–12th standard**
* **career readiness / stream alignment**
* **medium-dominant**
* **clean reasoning, not syllabus torture**

---

# 📦 FORMAT

Use this structure later in DB / JSON:

```json
{
  "id": "",
  "cohort": "grade_11_12",
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
  "id": "G1112_L_001",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Find the next term: 5, 10, 20, 40, ?",
  "options": ["60", "70", "80", "90"],
  "correct_answer": "80",
  "explanation": "Each term is multiplied by 2."
}
```

```json
{
  "id": "G1112_L_002",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "If LIGHT is coded as MJHIU, then SOUND is coded as:",
  "options": ["TPVOE", "TPWOF", "TPWNE", "TPUNE"],
  "correct_answer": "TPVOE",
  "explanation": "Each letter shifts one step forward in the alphabet."
}
```

---

### MEDIUM (8)

```json
{
  "id": "G1112_L_003",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next number: 2, 6, 12, 20, 30, ?",
  "options": ["40", "42", "44", "48"],
  "correct_answer": "42",
  "explanation": "Pattern: n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, so next is 6×7 = 42."
}
```

```json
{
  "id": "G1112_L_004",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If A = 1, B = 2, ..., Z = 26, then the value of CODE is:",
  "options": ["25", "26", "27", "28"],
  "correct_answer": "27",
  "explanation": "C=3, O=15, D=4, E=5 → 3+15+4+5 = 27."
}
```

```json
{
  "id": "G1112_L_005",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Complete the pattern: AZ, BY, CX, ?",
  "options": ["DW", "DV", "EW", "DX"],
  "correct_answer": "DW",
  "explanation": "First letters move forward, second letters move backward."
}
```

```json
{
  "id": "G1112_L_006",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Which number does not belong? 8, 27, 64, 100, 125",
  "options": ["27", "64", "100", "125"],
  "correct_answer": "100",
  "explanation": "8, 27, 64, and 125 are cubes; 100 is not."
}
```

```json
{
  "id": "G1112_L_007",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If PEN is coded as 123 and PAPER is coded as 14526, what is PEAR?",
  "options": ["1426", "1526", "1456", "1326"],
  "correct_answer": "1426",
  "explanation": "From the coding pattern: P=1, E=2, A=4, R=6."
}
```

```json
{
  "id": "G1112_L_008",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next term: 3, 7, 15, 31, ?",
  "options": ["47", "63", "62", "64"],
  "correct_answer": "63",
  "explanation": "Pattern: multiply by 2 and add 1."
}
```

```json
{
  "id": "G1112_L_009",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If all MIPS are NOPS and some NOPS are TALS, which statement must be true?",
  "options": [
    "All MIPS are TALS",
    "Some MIPS may be TALS",
    "No MIPS are TALS",
    "All TALS are MIPS"
  ],
  "correct_answer": "Some MIPS may be TALS",
  "explanation": "MIPS are a subset of NOPS, and some NOPS are TALS. Overlap is possible but not guaranteed."
}
```

```json
{
  "id": "G1112_L_010",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "In a 3×3 matrix, the number of dots increases by 1 across rows and columns. If the first row is 1, 2, 3 and the second row is 2, 3, 4, what should be in the bottom-right cell?",
  "options": ["4 dots", "5 dots", "6 dots", "7 dots"],
  "correct_answer": "5 dots",
  "explanation": "Pattern continues consistently: third row becomes 3, 4, 5."
}
```

---

### HARD (3)

```json
{
  "id": "G1112_L_011",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "Find the next number: 1, 2, 6, 24, 120, ?",
  "options": ["480", "600", "720", "840"],
  "correct_answer": "720",
  "explanation": "Factorial pattern: 1!, 2!, 3!, 4!, 5!, next is 6! = 720."
}
```

```json
{
  "id": "G1112_L_012",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "Which pair best completes the analogy? Engine : Car :: Processor : ?",
  "options": ["Monitor", "Computer", "Keyboard", "Battery"],
  "correct_answer": "Computer",
  "explanation": "An engine powers a car; a processor powers/computes within a computer."
}
```

```json
{
  "id": "G1112_L_013",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A sequence follows this rule: multiply by 2, subtract 1. Starting from 4, what is the 5th term?",
  "options": ["25", "31", "29", "27"],
  "correct_answer": "49",
  "explanation": "Sequence: 4 → 7 → 13 → 25 → 49. NOTE: Replace options to include 49."
}
```

🚨 **Fixing the options properly**:

```json
{
  "id": "G1112_L_013",
  "cohort": "grade_11_12",
  "construct": "logical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A sequence follows this rule: multiply by 2, subtract 1. Starting from 4, what is the 5th term?",
  "options": ["25", "41", "49", "53"],
  "correct_answer": "49",
  "explanation": "Sequence: 4 → 7 → 13 → 25 → 49."
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
  "id": "G1112_A_001",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "Aman is taller than Bharat. Bharat is taller than Chetan. Who is the shortest?",
  "options": ["Aman", "Bharat", "Chetan", "Cannot say"],
  "correct_answer": "Chetan",
  "explanation": "Aman > Bharat > Chetan."
}
```

```json
{
  "id": "G1112_A_002",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "A person starts facing North, turns right once. Which direction are they facing now?",
  "options": ["East", "West", "South", "North"],
  "correct_answer": "East",
  "explanation": "Right turn from North = East."
}
```

---

### MEDIUM (8)

```json
{
  "id": "G1112_A_003",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A, B, C, D, and E are standing in a row. B is to the left of C, D is to the right of E, and A is between B and C. Who must be in the middle?",
  "options": ["A", "B", "C", "Cannot be determined"],
  "correct_answer": "A",
  "explanation": "If A is between B and C, then A occupies the middle position among them. Combined arrangement places A centrally."
}
```

```json
{
  "id": "G1112_A_004",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If Ravi walks 6 m north, then 8 m east, how far is he from the starting point?",
  "options": ["10 m", "12 m", "14 m", "8 m"],
  "correct_answer": "10 m",
  "explanation": "6-8-10 right triangle."
}
```

```json
{
  "id": "G1112_A_005",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A bar chart shows marks in four subjects: Physics = 72, Chemistry = 68, Maths = 81, English = 75. Which subject is second highest?",
  "options": ["Physics", "Chemistry", "Maths", "English"],
  "correct_answer": "English",
  "explanation": "81 is highest (Maths), 75 is second highest (English)."
}
```

```json
{
  "id": "G1112_A_006",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If every engineer is a graduate and some graduates are artists, which statement is definitely true?",
  "options": [
    "All engineers are artists",
    "Some engineers may be artists",
    "No engineers are artists",
    "All artists are engineers"
  ],
  "correct_answer": "Some engineers may be artists",
  "explanation": "Overlap between engineers and artists is possible but not guaranteed."
}
```

```json
{
  "id": "G1112_A_007",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Five lectures are scheduled from Monday to Friday. Economics is before History. Physics is after Chemistry. Chemistry is on Tuesday. Which lecture must be after Tuesday?",
  "options": ["Economics", "History", "Physics", "Cannot say"],
  "correct_answer": "Physics",
  "explanation": "If Chemistry is on Tuesday and Physics is after Chemistry, Physics must be after Tuesday."
}
```

```json
{
  "id": "G1112_A_008",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Three friends — Kiran, Neha, and Om — scored 76, 84, and 91. Neha did not score the highest. Om scored more than Kiran. Who scored 84?",
  "options": ["Kiran", "Neha", "Om", "Cannot say"],
  "correct_answer": "Om",
  "explanation": "Om > Kiran and Neha is not highest (91), so Om = 84 and Kiran = 76."
}
```

```json
{
  "id": "G1112_A_009",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A student studies 2 hours on Monday, 3 on Tuesday, 4 on Wednesday, and 5 on Thursday. If the pattern continues, how many hours on Saturday?",
  "options": ["6", "7", "8", "9"],
  "correct_answer": "7",
  "explanation": "Pattern increases by 1 each day: Friday 6, Saturday 7."
}
```

```json
{
  "id": "G1112_A_010",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If all squares are rectangles, all rectangles are quadrilaterals, and no triangle is a quadrilateral, then which is true?",
  "options": [
    "Some triangles are rectangles",
    "All squares are quadrilaterals",
    "Some quadrilaterals are triangles",
    "No rectangles are quadrilaterals"
  ],
  "correct_answer": "All squares are quadrilaterals",
  "explanation": "Squares ⊂ Rectangles ⊂ Quadrilaterals."
}
```

---

### HARD (3)

```json
{
  "id": "G1112_A_011",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "P, Q, R, S, and T are seated in a row. Q is between P and R. S is to the left of P. T is not at an end. Who must be in the middle?",
  "options": ["Q", "P", "R", "Cannot be determined"],
  "correct_answer": "Q",
  "explanation": "Q being between P and R with S left of P and T not at an end constrains Q to the central position."
}
```

```json
{
  "id": "G1112_A_012",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A person walks 5 m south, then 12 m east, then 5 m north. How far is the person from the starting point?",
  "options": ["5 m", "10 m", "12 m", "13 m"],
  "correct_answer": "12 m",
  "explanation": "The north-south movement cancels out; only 12 m east remains."
}
```

```json
{
  "id": "G1112_A_013",
  "cohort": "grade_11_12",
  "construct": "analytical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "In a class, students can choose Music, Art, or both. 20 chose Music, 15 chose Art, and 8 chose both. How many chose only Music?",
  "options": ["8", "10", "12", "13"],
  "correct_answer": "12",
  "explanation": "Only Music = 20 - 8 = 12."
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
  "id": "G1112_N_001",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "What is 15% of 200?",
  "options": ["20", "25", "30", "35"],
  "correct_answer": "30",
  "explanation": "15% of 200 = 30."
}
```

```json
{
  "id": "G1112_N_002",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "easy",
  "mode": "text",
  "question": "The ratio of red balls to blue balls is 3:5. If there are 15 red balls, how many blue balls are there?",
  "options": ["20", "25", "30", "35"],
  "correct_answer": "25",
  "explanation": "3 parts = 15, so 1 part = 5; 5 parts = 25."
}
```

---

### MEDIUM (8)

```json
{
  "id": "G1112_N_003",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A product priced at ₹1,200 is sold at a 15% discount. What is the selling price?",
  "options": ["₹1,000", "₹1,020", "₹1,040", "₹1,080"],
  "correct_answer": "₹1,020",
  "explanation": "15% of 1200 = 180; 1200 - 180 = 1020."
}
```

```json
{
  "id": "G1112_N_004",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A car travels 180 km in 3 hours. What is its average speed?",
  "options": ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
  "correct_answer": "60 km/h",
  "explanation": "Speed = Distance / Time = 180 / 3 = 60 km/h."
}
```

```json
{
  "id": "G1112_N_005",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A student scored 72 out of 90 in a test. What percentage is this?",
  "options": ["75%", "80%", "85%", "90%"],
  "correct_answer": "80%",
  "explanation": "72/90 = 0.8 = 80%."
}
```

```json
{
  "id": "G1112_N_006",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A trader buys an item for ₹500 and sells it for ₹575. What is the profit percentage?",
  "options": ["10%", "12%", "15%", "20%"],
  "correct_answer": "15%",
  "explanation": "Profit = 75; 75/500 × 100 = 15%."
}
```

```json
{
  "id": "G1112_N_007",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "The average of 12, 18, 24, and 30 is:",
  "options": ["19", "20", "21", "22"],
  "correct_answer": "21",
  "explanation": "Sum = 84; average = 84 / 4 = 21."
}
```

```json
{
  "id": "G1112_N_008",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "If 8 workers can finish a task in 6 days, how many worker-days are needed in total?",
  "options": ["42", "48", "54", "56"],
  "correct_answer": "48",
  "explanation": "Total work = 8 × 6 = 48 worker-days."
}
```

```json
{
  "id": "G1112_N_009",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "A graph shows monthly sales: Jan = 40, Feb = 55, Mar = 50, Apr = 65. What is the average monthly sales value?",
  "options": ["50", "52.5", "55", "57.5"],
  "correct_answer": "52.5",
  "explanation": "(40 + 55 + 50 + 65) / 4 = 210 / 4 = 52.5."
}
```

```json
{
  "id": "G1112_N_010",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "medium",
  "mode": "text",
  "question": "Find the next number: 7, 14, 28, 56, ?",
  "options": ["84", "98", "112", "120"],
  "correct_answer": "112",
  "explanation": "Each number doubles."
}
```

---

### HARD (3)

```json
{
  "id": "G1112_N_011",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A shopkeeper gives two successive discounts of 10% and 20% on a ₹1,000 item. What is the final price?",
  "options": ["₹700", "₹720", "₹750", "₹800"],
  "correct_answer": "₹720",
  "explanation": "After 10% discount: ₹900. Then 20% off ₹900 = ₹720."
}
```

```json
{
  "id": "G1112_N_012",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "A and B together can complete a task in 12 days. If A alone can do it in 20 days, in how many days can B alone do it?",
  "options": ["24", "30", "36", "40"],
  "correct_answer": "30",
  "explanation": "A+B = 1/12, A = 1/20, so B = 1/12 - 1/20 = 2/60 = 1/30."
}
```

```json
{
  "id": "G1112_N_013",
  "cohort": "grade_11_12",
  "construct": "numerical_reasoning",
  "difficulty": "hard",
  "mode": "text",
  "question": "The ratio of boys to girls in a class is 7:5. If there are 48 students in total, how many girls are there?",
  "options": ["18", "20", "22", "24"],
  "correct_answer": "20",
  "explanation": "Total parts = 12; one part = 4; girls = 5 × 4 = 20."
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

⚠️ Like before, this should ideally be implemented as **image-based**.

---

### EASY (2)

```json
{
  "id": "G1112_S_001",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "A left-pointing arrow is rotated 90° clockwise. Which direction will it point?",
  "options": ["Up", "Down", "Left", "Right"],
  "correct_answer": "Up",
  "explanation": "Rotating a left arrow 90° clockwise makes it point upward."
}
```

```json
{
  "id": "G1112_S_002",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "easy",
  "mode": "visual_recommended",
  "question": "A paper is folded once and one hole is punched. How many holes appear when unfolded?",
  "options": ["1", "2", "3", "4"],
  "correct_answer": "2",
  "explanation": "One fold doubles the punched hole."
}
```

---

### MEDIUM (8)

```json
{
  "id": "G1112_S_003",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which option shows the correct mirror image of the given shape?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "B",
  "explanation": "Correct mirror image reverses left-right without flipping top-bottom."
}
```

```json
{
  "id": "G1112_S_004",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A cube has one shaded face and one dotted face. After rotation, which option shows the correct new arrangement?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "Tests cube rotation and face relationship tracking."
}
```

```json
{
  "id": "G1112_S_005",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which smaller figure is hidden inside the larger design?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "A",
  "explanation": "Tests embedded figure recognition."
}
```

```json
{
  "id": "G1112_S_006",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A square is divided by both diagonals. How many triangles are formed?",
  "options": ["2", "4", "6", "8"],
  "correct_answer": "4",
  "explanation": "Two diagonals divide a square into 4 triangles."
}
```

```json
{
  "id": "G1112_S_007",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A net of a cube is shown. Which face will be opposite the face marked X when folded?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "D",
  "explanation": "Tests cube net folding and opposite face identification."
}
```

```json
{
  "id": "G1112_S_008",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "Which option completes the visual pattern in a 3×3 figure matrix?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "A",
  "explanation": "Pattern completion based on shape transformation."
}
```

```json
{
  "id": "G1112_S_009",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A folded paper has two holes punched near one edge. Which unfolded pattern is correct?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "C",
  "explanation": "Tests fold symmetry and spatial prediction."
}
```

```json
{
  "id": "G1112_S_010",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "medium",
  "mode": "visual_recommended",
  "question": "A shape is rotated 180°. Which option matches the rotated version?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "B",
  "explanation": "Tests mental rotation rather than reflection."
}
```

---

### HARD (3)

```json
{
  "id": "G1112_S_011",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A cube is painted on all outer faces and then cut into 27 equal smaller cubes. How many small cubes will have exactly 2 painted faces?",
  "options": ["8", "12", "18", "24"],
  "correct_answer": "12",
  "explanation": "Edge cubes excluding corners = 12."
}
```

```json
{
  "id": "G1112_S_012",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A paper is folded twice and one triangular cut is made. Which option shows the correct unfolded shape?",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "D",
  "explanation": "Tests multi-step fold and cut prediction."
}
```

```json
{
  "id": "G1112_S_013",
  "cohort": "grade_11_12",
  "construct": "spatial_visual_reasoning",
  "difficulty": "hard",
  "mode": "visual_recommended",
  "question": "A complex overlapping figure is shown. How many total triangles are present?",
  "options": ["10", "12", "14", "16"],
  "correct_answer": "12",
  "explanation": "Requires counting both smallest and composite triangles."
}
```

---

# ✅ FINAL GRADE 11–12 APTITUDE BANK SUMMARY

## Total = 52 Questions

### Logical Reasoning = 13

### Analytical Reasoning = 13

### Numerical Reasoning = 13

### Spatial / Visual Reasoning = 13

---

# 🚨 BRUTAL HONEST REVIEW OF THIS BANK

Now the truth.

## What’s strong:

* **far better fit** for 11–12 than your earlier generic version
* more serious tone
* more career-screening feel
* numerical section is decent and practical
* logical section is sharper
* analytical section feels more “selection test” and less “school quiz”

---

## What still needs honesty:

### 1) Some Logical + Analytical items are still **V1 clean**, not elite-test level

That’s okay for your product.

Because if you overcomplicate it, you’ll make it:

* inconsistent
* harder to counsel from
* less fair

So this level is actually sensible.

---

### 2) Spatial is still **spec-quality**, not final-image-quality

Again:
not a flaw — just reality.

You still need to actually **design good figures**.

If you use bad visuals, this whole section collapses.

---

### 3) A few items should ideally later be shuffled / randomized

Very important for test feel.

Example:

* randomize option order
* randomize some sequence placements

Otherwise repeated use on one laptop becomes too predictable.

---

# 🎯 WHAT YOU SHOULD DO NEXT

You now have:

## ✅ Grade 8–10 aptitude bank

## ✅ Grade 11–12 aptitude bank

So the final one left is:

# 👉 **Professional Aptitude Bank – Final Production Version**

And that one needs a very different tone:

* less school-like
* more adult / workplace-neutral
* more polished

That’s the last major aptitude bank.

If you want, I’ll generate that next — and that one I’ll make **clean and mature**, not classroom-ish.
