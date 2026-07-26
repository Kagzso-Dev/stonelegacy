const db = require('../db');

module.exports = {
  async find({ service, type } = {}) {
    const conds  = ['isActive = 1'];
    const params = [];
    if (service) { conds.push('service = ?'); params.push(service); }
    if (type)    { conds.push('type = ?');    params.push(type); }
    const [rows] = await db.execute(
      `SELECT * FROM service_media WHERE ${conds.join(' AND ')} ORDER BY sortOrder ASC, createdAt DESC`,
      params
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM service_media WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { service, type = 'image', title, mediaUrl, publicId = '', thumbnail = '', description = '', sortOrder = 0 } = data;
    const [result] = await db.execute(
      `INSERT INTO service_media (service, type, title, mediaUrl, publicId, thumbnail, description, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [service, type, title, mediaUrl, publicId, thumbnail, description, sortOrder]
    );
    return this.findById(result.insertId);
  },

  async delete(id) {
    await db.execute('DELETE FROM service_media WHERE id = ?', [id]);
  },
};
