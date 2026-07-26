const db = require('../db');

module.exports = {
  async find({ isRead } = {}) {
    const conditions = [];
    const params     = [];
    if (isRead !== undefined) { conditions.push('isRead = ?'); params.push(isRead ? 1 : 0); }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const [rows] = await db.execute(
      `SELECT * FROM messages ${where} ORDER BY createdAt DESC`,
      params
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM messages WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { name, email, phone = '', subject = '', message } = data;
    const [result] = await db.execute(
      'INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email.toLowerCase(), phone, subject, message]
    );
    return this.findById(result.insertId);
  },

  async markRead(id) {
    await db.execute('UPDATE messages SET isRead = 1 WHERE id = ?', [id]);
    return this.findById(id);
  },

  async delete(id) {
    await db.execute('DELETE FROM messages WHERE id = ?', [id]);
  },
};
