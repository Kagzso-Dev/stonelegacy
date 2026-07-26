const db = require('../db');

module.exports = {
  async find({ isActive, category } = {}) {
    const conditions = [];
    const params     = [];
    if (isActive !== undefined) { conditions.push('isActive = ?'); params.push(isActive ? 1 : 0); }
    if (category)               { conditions.push('category = ?'); params.push(category); }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const [rows] = await db.execute(
      `SELECT * FROM gallery ${where} ORDER BY sortOrder ASC, createdAt DESC`,
      params
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM gallery WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { title, category, imageUrl, publicId = '', description = '', isActive = 1, sortOrder = 0 } = data;
    const [result] = await db.execute(
      'INSERT INTO gallery (title, category, imageUrl, publicId, description, isActive, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, category, imageUrl, publicId, description, isActive ? 1 : 0, sortOrder]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const allowed = ['title','category','imageUrl','publicId','description','isActive','sortOrder'];
    const sets    = [];
    const params  = [];
    for (const key of allowed) {
      if (data[key] !== undefined) {
        sets.push(`${key} = ?`);
        params.push(key === 'isActive' ? (data[key] ? 1 : 0) : data[key]);
      }
    }
    if (!sets.length) return this.findById(id);
    params.push(id);
    await db.execute(`UPDATE gallery SET ${sets.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  },

  async delete(id) {
    await db.execute('DELETE FROM gallery WHERE id = ?', [id]);
  },
};
