const db = require('better-sqlite3')('database.db'); console.log(db.prepare("SELECT type, test_id, COUNT(1) as count FROM questions GROUP BY type, test_id").all());
