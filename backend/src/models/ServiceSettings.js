const db = require('../db');

module.exports = {
  async findAll() {
    const [rows] = await db.execute('SELECT * FROM service_settings ORDER BY service ASC');
    return rows;
  },

  async findByService(service) {
    const [rows] = await db.execute('SELECT * FROM service_settings WHERE service = ? LIMIT 1', [service]);
    return rows[0] || null;
  },

  async upsert(service, data) {
    const allowed = ['heroImageUrl', 'cardImageUrl'];
    const sets    = allowed.map(k => `${k} = ?`).join(', ');
    const vals    = allowed.map(k => data[k] ?? '');
    await db.execute(
      `INSERT INTO service_settings (service, ${allowed.join(', ')})
       VALUES (?, ${allowed.map(() => '?').join(', ')})
       ON DUPLICATE KEY UPDATE ${sets}`,
      [service, ...vals, ...vals]
    );
    return this.findByService(service);
  },
};
