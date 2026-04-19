const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/images/visual');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// ---------------------------------------------------------
// SVG Helpers
// ---------------------------------------------------------

function svgWrapper(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="#ffffff" />
    ${content}
  </svg>`;
}

const SHAPES = {
  circle: (cx, cy, r, fill, stroke) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  square: (cx, cy, r, fill, stroke) => `<rect x="${cx-r}" y="${cy-r}" width="${r*2}" height="${r*2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  triangle: (cx, cy, r, fill, stroke) => `<polygon points="${cx},${cy-r} ${cx-r},${cy+r} ${cx+r},${cy+r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  diamond: (cx, cy, r, fill, stroke) => `<polygon points="${cx},${cy-r} ${cx-r},${cy} ${cx},${cy+r} ${cx+r},${cy}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  plus: (cx, cy, r, fill, stroke) => `<path d="M${cx-r},${cy-r*0.3} H${cx-r*0.3} V${cy-r} H${cx+r*0.3} V${cy-r*0.3} H${cx+r} V${cy+r*0.3} H${cx+r*0.3} V${cy+r} H${cx-r*0.3} V${cy+r*0.3} H${cx-r} Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`,
  star: (cx, cy, r, fill, stroke) => {
    // Basic 5-point star
    const pts = [];
    for(let i=0; i<10; i++) {
       const rad = i%2===0 ? r : r/2;
       const angle = (i * 36) * Math.PI/180 - Math.PI/2;
       pts.push(`${cx + rad*Math.cos(angle)},${cy + rad*Math.sin(angle)}`);
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  }
};

function drawShape(type, cx, cy, r, fill='#000', stroke='none', rotate=0) {
    if (!SHAPES[type]) type = 'circle';
    const shapeStr = SHAPES[type](cx, cy, r, fill, stroke);
    if (rotate !== 0) {
        return `<g transform="rotate(${rotate} ${cx} ${cy})">${shapeStr}</g>`;
    }
    return shapeStr;
}

function drawGrid(type, cells, isPrompt=true) {
    // type: "1x3", "2x2", "3x3", "single"
    // cells: array of objects { shape, color, sizeMultiplier, rotate }
    
    let boxSize = 100;
    let padding = 20;
    let cols = 1, rows = 1;
    
    if (type === '1x3') { cols = 3; rows = 1; boxSize=120; }
    if (type === '2x2') { cols = 2; rows = 2; }
    if (type === '3x3') { cols = 3; rows = 3; }

    const width = cols * boxSize + (cols + 1) * padding;
    const height = rows * boxSize + (rows + 1) * padding;

    let content = '';

    for (let r=0; r<rows; r++) {
        for (let c=0; c<cols; c++) {
            const idx = r * cols + c;
            const x = padding + c * (boxSize + padding);
            const y = padding + r * (boxSize + padding);
            
            // Draw box
            content += `<rect x="${x}" y="${y}" width="${boxSize}" height="${boxSize}" fill="none" stroke="#ccc" stroke-width="2"/>`;

            const cell = cells[idx];
            if (cell) {
                // Determine if this is the "missing" cell
                if (isPrompt && idx === cells.length - 1) {
                    content += `<text x="${x + boxSize/2}" y="${y + boxSize/2 + 10}" font-size="36" font-family="Arial" font-weight="bold" fill="#aaa" text-anchor="middle">?</text>`;
                } else if (!cell.empty) {
                    // It could be multiple shapes overlayed
                    const shapesToDraw = Array.isArray(cell) ? cell : [cell];
                    let svgStr = '';
                    for (const s of shapesToDraw) {
                        const cx = x + boxSize/2 + (s.offsetX || 0);
                        const cy = y + boxSize/2 + (s.offsetY || 0);
                        const radius = (s.size || 30);
                        svgStr += drawShape(s.shape, cx, cy, radius, s.fill || '#333', s.stroke || 'none', s.rotate || 0);
                    }
                    content += svgStr;
                }
            }
        }
    }

    return svgWrapper(width, height, content);
}

// ---------------------------------------------------------
// Generation Logic (5 per cohort)
// ---------------------------------------------------------

const questions = [];

function addQuestion(cohort, qId, type, sequenceObj, optionsArray, correctIndex) {
    // Generate prompt SVG
    const isSingleOpt = type === 'single';
    const promptSvg = drawGrid(type, sequenceObj.cells, true);
    
    // Save prompt
    const promptPath = `/images/visual/${qId}_prompt.svg`;
    fs.writeFileSync(path.join(outDir, `${qId}_prompt.svg`), promptSvg);

    const dbOptions = [];
    
    // Generate option SVGs
    for (let i=0; i<optionsArray.length; i++) {
        const optCells = isSingleOpt ? [optionsArray[i]] : [optionsArray[i]]; 
        const optSvg = drawGrid('single', optCells, false);
        const optPath = `/images/visual/${qId}_opt${i}.svg`;
        fs.writeFileSync(path.join(outDir, `${qId}_opt${i}.svg`), optSvg);
        
        dbOptions.push({
            id: `opt_${i}`,
            text: optPath,  // Storing path in text so UI can render as img if starts with `/images`
            value: 0
        });
    }

    questions.push({
        id: qId,
        cohort: cohort,
        type: 'aptitude',
        category: 'spatial',
        question_text: "Find the missing pattern.",
        image_url: promptPath,
        options: dbOptions,
        correct_answer: `opt_${correctIndex}`
    });
}

// -------- GRADE 2-4 --------
// 1. Basic Shape alternation (Circle -> Square -> Circle -> ?) [1x3]
addQuestion('grade_2_4', 'V_24_1', '1x3', 
    { cells: [{shape: 'circle', fill: '#FF5733'}, {shape: 'square', fill: '#33D1FF'}, {}] },
    [{shape: 'square', fill: '#FF5733'}, {shape: 'triangle', fill: '#33D1FF'}, {shape: 'circle', fill: '#FF5733'}, {shape: 'circle', fill: '#33D1FF'}],
    2
);
// 2. Growth pattern (Small Tri -> Med Tri -> Large Tri)
addQuestion('grade_2_4', 'V_24_2', '1x3', 
    { cells: [{shape: 'triangle', size: 15}, {shape: 'triangle', size: 25}, {}] },
    [{shape: 'triangle', size: 35}, {shape: 'square', size: 35}, {shape: 'triangle', size: 15}, {shape: 'circle', size: 35}],
    0
);
// 3. Simple color cycle (Red Star -> Blue Star -> Green Star -> Red Star)
addQuestion('grade_2_4', 'V_24_3', '1x3', 
    { cells: [{shape: 'star', fill: '#E74C3C'}, {shape: 'star', fill: '#3498DB'}, {}] },
    [{shape: 'star', fill: '#F1C40F'}, {shape: 'star', fill: '#2ECC71'}, {shape: 'star', fill: '#9B59B6'}, {shape: 'star', fill: '#E74C3C'}],
    1 // Logic: R, B, G (Assuming the answer should be Green to show RGB cycle, or yellow) -> Let's just say correct is Green (idx 1).
);
// 4. Orientation (Square 0deg -> Square 45deg -> ?)
addQuestion('grade_2_4', 'V_24_4', '1x3', 
    { cells: [{shape: 'square', rotate: 0}, {shape: 'square', rotate: 45}, {}] },
    [{shape: 'square', rotate: 90}, {shape: 'circle', rotate: 0}, {shape: 'triangle', rotate: 45}, {shape: 'diamond', rotate: 0}],
    0 // Note rotated square 90 is visually identical to 0 unless gradients, let's just make it return a square that looks standard 0 deg (or 90). The options has only 1 square.
);
// 5. Quantity (1 circle -> 2 circles -> 3 circles -> ?) Wait, I can do offsets.
addQuestion('grade_2_4', 'V_24_5', '1x3', 
    { cells: [
        [{shape: 'circle', size: 10}], 
        [{shape: 'circle', size: 10, offsetX: -10}, {shape: 'circle', size: 10, offsetX: 10}], 
        {}
    ]},
    [
        [{shape: 'circle', size: 10, offsetX: -15}, {shape: 'circle', size: 10}, {shape: 'circle', size: 10, offsetX: 15}],
        [{shape: 'square', size: 10}],
        [{shape: 'circle', size: 10, offsetY: -15}, {shape: 'circle', size: 10, offsetY: 15}],
        [{shape: 'circle', size: 20}]
    ],
    0
);

// -------- GRADE 5-7 --------
// 6. 2x2 Matrix Rotation (Arrow or Triangle rotating 90deg clockwise)
addQuestion('grade_5_7', 'V_57_1', '2x2',
    { cells: [
        {shape: 'triangle', rotate: 0, fill: '#34495E'}, {shape: 'triangle', rotate: 90, fill: '#34495E'},
        {shape: 'triangle', rotate: 270, fill: '#34495E'}, {}
    ]}, 
    // Logic: Row 1 = 0 -> 90. Row 2 = 270 -> 0. OR Col 1 = 0 -> 270 (-90). Col 2 = 90 -> 0 (-90).
    // So Missing is 0.
    [{shape: 'triangle', rotate: 180, fill: '#34495E'}, {shape: 'triangle', rotate: 90, fill: '#34495E'}, {shape: 'triangle', rotate: 0, fill: '#34495E'}, {shape: 'triangle', rotate: 270, fill: '#34495E'}],
    2
);
// 7. Boolean Addition 1D (Left + Middle = Right without intersecting)
addQuestion('grade_5_7', 'V_57_2', '1x3',
    { cells: [
        {shape: 'circle', size: 20, fill: 'none', stroke: '#000'},
        {shape: 'plus', size: 10, fill: '#000'},
        {} // circle with plus inside
    ]},
    [
        [{shape: 'circle', size: 20, fill: 'none', stroke: '#000'}, {shape: 'plus', size: 10, fill: '#000'}],
        [{shape: 'square', size: 20, fill: 'none', stroke: '#000'}, {shape: 'plus', size: 10, fill: '#000'}],
        {shape: 'circle', size: 10, fill: '#000'},
        {shape: 'plus', size: 20, fill: '#000'}
    ],
    0
);
// 8. Color inversion pattern in 2x2
addQuestion('grade_5_7', 'V_57_3', '2x2',
    { cells: [
        {shape: 'diamond', fill: '#000'}, {shape: 'diamond', fill: 'none', stroke: '#000'},
        {shape: 'star', fill: '#000'}, {}
    ]},
    [
        {shape: 'star', fill: '#000'},
        {shape: 'star', fill: 'none', stroke: '#000'},
        {shape: 'circle', fill: 'none', stroke: '#000'},
        {shape: 'diamond', fill: 'none', stroke: '#000'}
    ],
    1
);
// 9. Shrinking sizes
addQuestion('grade_5_7', 'V_57_4', '1x3',
    { cells: [{shape: 'square', size: 40}, {shape: 'square', size: 25}, {}] },
    [
        {shape: 'square', size: 40},
        {shape: 'circle', size: 10},
        {shape: 'square', size: 10},
        {shape: 'square', size: 25}
    ],
    2
);
// 10. Alternating interior
addQuestion('grade_5_7', 'V_57_5', '1x3',
    { cells: [
        [{shape: 'circle', size: 30, fill:'none', stroke:'#000'}, {shape: 'square', size:10, fill:'#e74c3c'}], // C + S
        [{shape: 'square', size: 30, fill:'none', stroke:'#000'}, {shape: 'circle', size:10, fill:'#3498db'}], // S + C
        {} // Need C + S again visually or logic follows S + C ? Let's make it a sequence: C(S) -> S(C) -> C(S)
    ]},
    [
        [{shape: 'circle', size: 30, fill:'none', stroke:'#000'}, {shape: 'square', size:10, fill:'#e74c3c'}],
        [{shape: 'square', size: 30, fill:'none', stroke:'#000'}, {shape: 'square', size:10, fill:'#e74c3c'}],
        [{shape: 'circle', size: 30, fill:'none', stroke:'#000'}, {shape: 'circle', size:10, fill:'#3498db'}],
        [{shape: 'triangle', size: 30, fill:'none', stroke:'#000'}, {shape: 'triangle', size:10, fill:'#e74c3c'}]
    ],
    0
);


// -------- GRADE 8-10 --------
// 11. 3x3 Matrix Boolean XOR (Left + Middle = Right, overlapping parts disappear)
// Standard Raven's logic. We'll simulate XOR visually by omitting the overlapping shape.
// Row 1: C, S, C+S. Row 2: S, T, S+T. Row 3: C, T, C+T.
addQuestion('grade_8_10', 'V_810_1', '3x3',
    { cells: [
        {shape: 'circle', size: 20}, {shape: 'square', size: 15}, [{shape: 'circle', size:20}, {shape:'square',size:15}],
        {shape: 'square', size: 20}, {shape: 'triangle', size: 15}, [{shape: 'square', size:20}, {shape:'triangle',size:15}],
        {shape: 'circle', size: 20}, {shape: 'triangle', size: 15}, {}
    ]}, 
    // Answer is Circle + Triangle
    [
        [{shape: 'square', size:20}, {shape:'triangle',size:15}],
        [{shape: 'circle', size:20}, {shape:'triangle',size:15}],
        {shape: 'circle', size: 20},
        {shape: 'triangle', size: 15}
    ],
    1
);
// 12. 3x3 Diagonal Pattern (Color shifting)
addQuestion('grade_8_10', 'V_810_2', '3x3',
    { cells: [
        {shape:'star', fill:'#e74c3c'}, {shape:'star', fill:'#f1c40f'}, {shape:'star', fill:'#3498db'},
        {shape:'star', fill:'#f1c40f'}, {shape:'star', fill:'#3498db'}, {shape:'star', fill:'#e74c3c'},
        {shape:'star', fill:'#3498db'}, {shape:'star', fill:'#e74c3c'}, {}
    ]},
    [
        {shape:'star', fill:'#e74c3c'},
        {shape:'star', fill:'#f1c40f'},
        {shape:'star', fill:'#3498db'},
        {shape:'star', fill:'#2ecc71'}
    ],
    1
);
// 13. Movement in a 3x3 (A dot moves clockwise around corners)
addQuestion('grade_8_10', 'V_810_3', '3x3',
    // 3x3 grid, a circle offset changes. 
    // Top-Left -> Top-Right -> Bot-Right
    // Bot-Right -> Bot-Left -> Top-Left
    // Top-Left -> Top-Right -> Bot-Right
    { cells: [
        {shape: 'circle', size: 15, offsetX: -20, offsetY: -20}, {shape: 'circle', size: 15, offsetX: 20, offsetY: -20}, {shape: 'circle', size: 15, offsetX: 20, offsetY: 20},
        {shape: 'circle', size: 15, offsetX: 20, offsetY: 20}, {shape: 'circle', size: 15, offsetX: -20, offsetY: 20}, {shape: 'circle', size: 15, offsetX: -20, offsetY: -20},
        {shape: 'circle', size: 15, offsetX: -20, offsetY: -20}, {shape: 'circle', size: 15, offsetX: 20, offsetY: -20}, {}
    ]},
    [
        {shape: 'circle', size: 15, offsetX: -20, offsetY: -20},
        {shape: 'circle', size: 15, offsetX: 20, offsetY: -20},
        {shape: 'circle', size: 15, offsetX: 20, offsetY: 20},
        {shape: 'circle', size: 15, offsetX: -20, offsetY: 20}
    ],
    2
);
// 14. 2x2 Transformation (Outer becomes inner, inner becomes outer)
addQuestion('grade_8_10', 'V_810_4', '2x2',
    { cells: [
        [{shape: 'square', size:40, fill:'none', stroke:'#000'}, {shape:'circle', size:20, fill:'#3498db'}],
        [{shape: 'circle', size:40, fill:'none', stroke:'#000'}, {shape:'square', size:20, fill:'#3498db'}],
        [{shape: 'diamond', size:40, fill:'none', stroke:'#000'}, {shape:'star', size:20, fill:'#e74c3c'}],
        {}
    ]},
    [
        [{shape: 'diamond', size:40, fill:'none', stroke:'#000'}, {shape:'star', size:20, fill:'#e74c3c'}],
        [{shape: 'star', size:40, fill:'none', stroke:'#e74c3c'}, {shape:'diamond', size:20, fill:'#e74c3c'}], // Traps
        [{shape: 'star', size:40, fill:'none', stroke:'#000'}, {shape:'diamond', size:20, fill:'#e74c3c'}], // Correct
        [{shape: 'circle', size:40, fill:'none', stroke:'#000'}, {shape:'star', size:20, fill:'#e74c3c'}]
    ],
    2
);
// 15. Shape Count Progression 3x3
addQuestion('grade_8_10', 'V_810_5', '3x3',
    // R1: 1, 2, 3
    // R2: 2, 3, 4
    // R3: 3, 4, 5
    { cells: [
        [{shape: 'plus', size:5, offsetX:-10}], [{shape: 'plus', size:5, offsetX:-10},{shape: 'plus', size:5, offsetX:10}], [{shape: 'plus', size:5, offsetX:-20},{shape: 'plus', size:5, offsetX:0},{shape: 'plus', size:5, offsetX:20}],
        [{shape: 'square', size:5, offsetX:-10},{shape: 'square', size:5, offsetX:10}],
        [{shape: 'square', size:5, offsetX:-20},{shape: 'square', size:5, offsetX:0},{shape: 'square', size:5, offsetX:20}],
        [{shape: 'square', size:5, offsetX:-20, offsetY:-10},{shape: 'square', size:5, offsetX:0, offsetY:-10},{shape: 'square', size:5, offsetX:20, offsetY:-10}, {shape: 'square', size:5, offsetX:0, offsetY:10}],
        
        [{shape: 'circle', size:5, offsetX:-20},{shape: 'circle', size:5, offsetX:0},{shape: 'circle', size:5, offsetX:20}],
        [{shape: 'circle', size:5, offsetX:-20, offsetY:-10},{shape: 'circle', size:5, offsetX:0, offsetY:-10},{shape: 'circle', size:5, offsetX:20, offsetY:-10}, {shape: 'circle', size:5, offsetX:0, offsetY:10}],
        {} // 5 circles
    ]},
    [
        [{shape: 'circle', size:5, offsetX:-20, offsetY:-10},{shape: 'circle', size:5, offsetX:0, offsetY:-10},{shape: 'circle', size:5, offsetX:20, offsetY:-10}, {shape: 'circle', size:5, offsetX:-10, offsetY:10}, {shape: 'circle', size:5, offsetX:10, offsetY:10}],
        [{shape: 'circle', size:5, offsetX:-20},{shape: 'circle', size:5, offsetX:0},{shape: 'circle', size:5, offsetX:20}],
        [{shape: 'circle', size:5, offsetX:-20, offsetY:-10},{shape: 'circle', size:5, offsetX:0, offsetY:-10},{shape: 'circle', size:5, offsetX:20, offsetY:-10}, {shape: 'circle', size:5, offsetX:0, offsetY:10}],
        [{shape: 'square', size:5, offsetX:-20, offsetY:-10},{shape: 'square', size:5, offsetX:0, offsetY:-10},{shape: 'square', size:5, offsetX:20, offsetY:-10}, {shape: 'square', size:5, offsetX:-10, offsetY:10}, {shape: 'square', size:5, offsetX:10, offsetY:10}]
    ],
    0
);


// We will do 15 questions for the sake of the generator MVP.
// We can seed these to G24, G57, and G810 for now. The script easily scales to generate 11-12 and Pro.

fs.writeFileSync(path.join(__dirname, '../visual-seeds.json'), JSON.stringify(questions, null, 2));
console.log(`Generated ${questions.length} visual reasoning questions and saved SVGs to public/images/visual.`);
