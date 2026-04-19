const fs = require('fs');
const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const db = new Database(path.join(__dirname, '../database.db'));
const outDir = path.join(__dirname, '../public/images/visual');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to wrap shapes in a standard Grid Prompt Box
function wrapPrompt(content, width, height) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="background:#f8fafc; border-radius: 8px; border: 2px solid #cbd5e1;">
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        ${content}
    </svg>`;
}

// Wrap single options
function wrapOption(content) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
        ${content}
    </svg>`;
}

const validVisuals = [];

// ---------------------------------------------------------
// 1. GRADE 2-4: Sequence (Size Progression)
// ---------------------------------------------------------
const q1Id = uuidv4();
const q1Prompt = wrapPrompt(`
    <g transform="translate(50, 75)">
        <circle cx="50" cy="50" r="15" fill="#3b82f6" stroke="#1e3a8a" stroke-width="3" />
        <rect x="130" y="25" width="2" height="50" fill="#cbd5e1" />
        
        <circle cx="210" cy="50" r="25" fill="#3b82f6" stroke="#1e3a8a" stroke-width="3" />
        <rect x="290" y="25" width="2" height="50" fill="#cbd5e1" />
        
        <text x="360" y="65" font-family="sans-serif" font-size="40" font-weight="bold" fill="#64748b">?</text>
    </g>
`, 500, 200);

fs.writeFileSync(path.join(outDir, `q1_prompt.svg`), q1Prompt);

const q1Options = [
    { text: '/images/visual/q1_optA.svg', isCorrect: false, svg: `<rect x="20" y="20" width="60" height="60" fill="#3b82f6" stroke="#1e3a8a" stroke-width="4" />` },
    { text: '/images/visual/q1_optB.svg', isCorrect: true, svg: `<circle cx="50" cy="50" r="35" fill="#3b82f6" stroke="#1e3a8a" stroke-width="4" />` },
    { text: '/images/visual/q1_optC.svg', isCorrect: false, svg: `<circle cx="50" cy="50" r="15" fill="#3b82f6" stroke="#1e3a8a" stroke-width="4" />` },
    { text: '/images/visual/q1_optD.svg', isCorrect: false, svg: `<polygon points="50,15 85,85 15,85" fill="#3b82f6" stroke="#1e3a8a" stroke-width="4" />` }
];

q1Options.forEach((opt, idx) => {
    fs.writeFileSync(path.join(outDir, `q1_opt${['A','B','C','D'][idx]}.svg`), wrapOption(opt.svg));
});

validVisuals.push({
    id: q1Id,
    test_id: '2-4',
    cohort: 'grade_2_4',
    type: 'aptitude',
    category: 'spatial',
    question_text: 'Identify the pattern. Which shape comes next in the sequence?',
    image_url: '/images/visual/q1_prompt.svg',
    options: q1Options.map((o, i) => ({ id: `q1_o${i}`, text: o.text, value: 0 })),
    correct_answer: `q1_o${q1Options.findIndex(o => o.isCorrect)}`
});


// ---------------------------------------------------------
// 2. GRADE 5-7: 2x2 Matrix (Rotation / Addition)
// ---------------------------------------------------------
const q2Id = uuidv4();
const q2Prompt = wrapPrompt(`
    <g transform="translate(100, 50)">
        <!-- Grid lines -->
        <rect x="0" y="0" width="200" height="200" fill="none" stroke="#94a3b8" stroke-width="4" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#94a3b8" stroke-width="4" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#94a3b8" stroke-width="4" />
        
        <!-- R1C1 -->
        <line x1="25" y1="50" x2="75" y2="50" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
        <!-- R1C2 -->
        <line x1="150" y1="25" x2="150" y2="75" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
        
        <!-- R2C1 -->
        <line x1="25" y1="150" x2="75" y2="150" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
        <circle cx="50" cy="150" r="8" fill="#ef4444" />
        <!-- R2C2 -->
        <text x="140" y="165" font-family="sans-serif" font-size="40" font-weight="bold" fill="#64748b">?</text>
    </g>
`, 400, 300);

fs.writeFileSync(path.join(outDir, `q2_prompt.svg`), q2Prompt);

const q2Options = [
    { text: '/images/visual/q2_optA.svg', isCorrect: false, svg: `<line x1="20" y1="50" x2="80" y2="50" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="50" r="10" fill="#ef4444" />` },
    { text: '/images/visual/q2_optB.svg', isCorrect: false, svg: `<line x1="50" y1="20" x2="50" y2="80" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/><rect x="40" y="40" width="20" height="20" fill="#ef4444" />` },
    { text: '/images/visual/q2_optC.svg', isCorrect: true, svg: `<line x1="50" y1="20" x2="50" y2="80" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="50" r="10" fill="#ef4444" />` },
    { text: '/images/visual/q2_optD.svg', isCorrect: false, svg: `<circle cx="50" cy="50" r="25" fill="none" stroke="#0f172a" stroke-width="8" /><circle cx="50" cy="50" r="10" fill="#ef4444" />` }
];

q2Options.forEach((opt, idx) => {
    fs.writeFileSync(path.join(outDir, `q2_opt${['A','B','C','D'][idx]}.svg`), wrapOption(opt.svg));
});

validVisuals.push({
    id: q2Id,
    test_id: '5-7',
    cohort: 'grade_5_7',
    type: 'aptitude',
    category: 'spatial',
    question_text: 'Analyze the 2x2 matrix. Which option logically replaces the question mark?',
    image_url: '/images/visual/q2_prompt.svg',
    options: q2Options.map((o, i) => ({ id: `q2_o${i}`, text: o.text, value: 0 })),
    correct_answer: `q2_o${q2Options.findIndex(o => o.isCorrect)}`
});


// ---------------------------------------------------------
// 3. GRADE 8-10 / 11-12: 3x3 Matrix (XOR / Superposition Logic)
// ---------------------------------------------------------
const q3Id = uuidv4();
// Logic: C1 + C2 = C3 (Outer Shape stays same, Inner Shape combines)
const q3Prompt = wrapPrompt(`
    <g transform="translate(75, 25)">
        <rect x="0" y="0" width="300" height="300" fill="none" stroke="#94a3b8" stroke-width="4" />
        <line x1="100" y1="0" x2="100" y2="300" stroke="#94a3b8" stroke-width="3" />
        <line x1="200" y1="0" x2="200" y2="300" stroke="#94a3b8" stroke-width="3" />
        <line x1="0" y1="100" x2="300" y2="100" stroke="#94a3b8" stroke-width="3" />
        <line x1="0" y1="200" x2="300" y2="200" stroke="#94a3b8" stroke-width="3" />
        
        <!-- Row 1: Diamonds. Inner logic: Top Dot + Bottom Dot = Two Dots -->
        <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="#0f172a" stroke-width="4"/>
        <circle cx="50" cy="35" r="5" fill="#0f172a" />
        
        <polygon points="150,15 185,50 150,85 115,50" fill="none" stroke="#0f172a" stroke-width="4"/>
        <circle cx="150" cy="65" r="5" fill="#0f172a" />
        
        <polygon points="250,15 285,50 250,85 215,50" fill="none" stroke="#0f172a" stroke-width="4"/>
        <circle cx="250" cy="35" r="5" fill="#0f172a" />
        <circle cx="250" cy="65" r="5" fill="#0f172a" />
        
        <!-- Row 2: Circles. Inner logic: Left Dash + Right Dash = Minus -->
        <circle cx="50" cy="150" r="35" fill="none" stroke="#0f172a" stroke-width="4"/>
        <line x1="30" y1="150" x2="50" y2="150" stroke="#0f172a" stroke-width="4" />
        
        <circle cx="150" cy="150" r="35" fill="none" stroke="#0f172a" stroke-width="4"/>
        <line x1="150" y1="150" x2="170" y2="150" stroke="#0f172a" stroke-width="4" />
        
        <circle cx="250" cy="150" r="35" fill="none" stroke="#0f172a" stroke-width="4"/>
        <line x1="230" y1="150" x2="270" y2="150" stroke="#0f172a" stroke-width="4" />
        
        <!-- Row 3: Squares. Inner logic: TL dot + BR dot = Diagonal Dots -->
        <rect x="15" y="215" width="70" height="70" fill="none" stroke="#0f172a" stroke-width="4"/>
        <circle cx="35" cy="235" r="6" fill="#0f172a" />
        
        <rect x="115" y="215" width="70" height="70" fill="none" stroke="#0f172a" stroke-width="4"/>
        <circle cx="165" cy="265" r="6" fill="#0f172a" />
        
        <text x="235" y="265" font-family="sans-serif" font-size="40" font-weight="bold" fill="#64748b">?</text>
    </g>
`, 450, 350);

fs.writeFileSync(path.join(outDir, `q3_prompt.svg`), q3Prompt);

const q3Options = [
    { text: '/images/visual/q3_optA.svg', isCorrect: false, svg: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="#0f172a" stroke-width="6"/><circle cx="30" cy="30" r="8" fill="#0f172a" />` },
    { text: '/images/visual/q3_optB.svg', isCorrect: true,  svg: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="#0f172a" stroke-width="6"/><circle cx="30" cy="30" r="8" fill="#0f172a" /><circle cx="70" cy="70" r="8" fill="#0f172a" />` },
    { text: '/images/visual/q3_optC.svg', isCorrect: false, svg: `<circle cx="50" cy="50" r="40" fill="none" stroke="#0f172a" stroke-width="6"/><circle cx="30" cy="30" r="8" fill="#0f172a" /><circle cx="70" cy="70" r="8" fill="#0f172a" />` },
    { text: '/images/visual/q3_optD.svg', isCorrect: false, svg: `<rect x="10" y="10" width="80" height="80" fill="none" stroke="#0f172a" stroke-width="6"/><circle cx="30" cy="70" r="8" fill="#0f172a" /><circle cx="70" cy="30" r="8" fill="#0f172a" />` }
];

q3Options.forEach((opt, idx) => {
    fs.writeFileSync(path.join(outDir, `q3_opt${['A','B','C','D'][idx]}.svg`), wrapOption(opt.svg));
});

validVisuals.push({
    id: q3Id,
    test_id: '8-10',
    cohort: 'grade_8_10',
    type: 'aptitude',
    category: 'spatial',
    question_text: 'Complete the 3x3 logic matrix by determining the intersecting pattern rules.',
    image_url: '/images/visual/q3_prompt.svg',
    options: q3Options.map((o, i) => ({ id: `q3_o${i}`, text: o.text, value: 0 })),
    correct_answer: `q3_o${q3Options.findIndex(o => o.isCorrect)}`
});


// ---------------------------------------------------------
// Insert into DB
// ---------------------------------------------------------
const insert = db.prepare(`
    INSERT OR IGNORE INTO questions
      (id, test_id, type, question_text, options, correct_answer, image_url, mappings, cohort, category, difficulty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
    for (const q of validVisuals) {
      const mappings = [{ trait: 'spatial', weight: 1 }];
      insert.run(
        q.id,
        q.test_id,
        q.type,
        q.question_text,
        JSON.stringify(q.options),
        q.correct_answer,
        q.image_url,
        JSON.stringify(mappings),
        q.cohort,
        q.category,
        'hard'
      );
    }
})();

console.log(`Successfully generated and seeded ${validVisuals.length} flawless visual logic matrices.`);
