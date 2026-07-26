const db = require('../db');

const FIELDS = ['companyName','tagline','phone','whatsapp','email','address',
                'city','state','pincode','facebook','instagram','youtube','website',
                'logoUrl','accentColor','floatingButtonsEnabled','smtpUser','smtpPass'];

module.exports = {
  async getSingleton() {
    const [rows] = await db.execute("SELECT * FROM settings WHERE id = 'site' LIMIT 1");
    if (!rows[0]) {
      await db.execute("INSERT IGNORE INTO settings (id) VALUES ('site')");
      const [r2] = await db.execute("SELECT * FROM settings WHERE id = 'site' LIMIT 1");
      return r2[0];
    }
    return rows[0];
  },

  async update(data) {
    const sets   = [];
    const params = [];
    for (const key of FIELDS) {
      if (data[key] !== undefined) { sets.push(`${key} = ?`); params.push(data[key]); }
    }
    if (!sets.length) return this.getSingleton();
    await db.execute(`UPDATE settings SET ${sets.join(', ')} WHERE id = 'site'`, params);
    return this.getSingleton();
  },

  async clearLogo() {
    await db.execute("UPDATE settings SET logoUrl = '', logoPublicId = '' WHERE id = 'site'");
    return this.getSingleton();
  },
};
