const fs = require('fs');
let c = fs.readFileSync('src/lib/pdf/aptitudeTemplate.ts', 'utf8');
c = c.split('\\`').join('`');
fs.writeFileSync('src/lib/pdf/aptitudeTemplate.ts', c);
