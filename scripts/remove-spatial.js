const Database = require('better-sqlite3');
const db = new Database('database.db');
const result = db.prepare("DELETE FROM questions WHERE category = 'spatial' AND type = 'aptitude'").run();
console.log("Deleted", result.changes, "invalid visual questions.");
