const Database = require('better-sqlite3');
const db = new Database('database.db');
const row = db.prepare("SELECT options FROM questions WHERE category = 'spatial' LIMIT 1").get();
console.log(row.options);
