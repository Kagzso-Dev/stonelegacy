/**
 * Run once to create / reset the admin user:
 *   npm run seed
 *   npm run seed myusername mypassword "My Name" myemail@example.com
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool   = require('./db');

async function seed() {
  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';
  const name     = process.argv[4] || 'Admin';
  const email    = process.argv[5] || 'admin@stonelegacy.in';

  const hash = await bcrypt.hash(password, 12);
  const [result] = await pool.execute(
    `INSERT INTO users (name, username, email, password, role, isActive)
     VALUES (?, ?, ?, ?, 'admin', 1)
     ON DUPLICATE KEY UPDATE password = ?, username = ?, name = ?`,
    [name, username, email, hash, hash, username, name]
  );
  console.log(`Admin upserted — username: ${username}  email: ${email}  (id: ${result.insertId || 'existing'})`);
  await pool.end();
}

seed().catch((err) => { console.error(err); process.exit(1); });
