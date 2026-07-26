const db     = require('../db');
const bcrypt = require('bcryptjs');

const PUBLIC = 'id, name, username, email, role, isActive, createdAt, updatedAt';

module.exports = {
  // Login by username (case-insensitive)
  async findByUsername(username, withPassword = false) {
    const cols = withPassword ? `${PUBLIC}, password` : PUBLIC;
    const [rows] = await db.execute(
      `SELECT ${cols} FROM users WHERE username = ? AND isActive = 1 LIMIT 1`,
      [username.toLowerCase()]
    );
    return rows[0] || null;
  },

  async findOne({ email, isActive }, withPassword = false) {
    const cols = withPassword ? `${PUBLIC}, password` : PUBLIC;
    const [rows] = await db.execute(
      `SELECT ${cols} FROM users WHERE email = ? AND isActive = ? LIMIT 1`,
      [email.toLowerCase(), isActive ? 1 : 0]
    );
    return rows[0] || null;
  },

  async findById(id, withPassword = false) {
    const cols = withPassword ? `${PUBLIC}, password` : PUBLIC;
    const [rows] = await db.execute(
      `SELECT ${cols} FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  },

  async create({ name, username, email, password, role = 'staff' }) {
    const hash = await bcrypt.hash(password, 12);
    const [result] = await db.execute(
      'INSERT INTO users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, username ? username.toLowerCase() : null, email.toLowerCase(), hash, role]
    );
    return this.findById(result.insertId);
  },

  async updatePassword(id, newPassword) {
    const hash = await bcrypt.hash(newPassword, 12);
    await db.execute('UPDATE users SET password = ? WHERE id = ?', [hash, id]);
  },

  comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
  },
};
