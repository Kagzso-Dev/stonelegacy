const db = require('../db');

async function genOrderNumber() {
  const [[{ total }]] = await db.execute('SELECT COUNT(*) AS total FROM orders');
  return `SL-${String(Number(total) + 1).padStart(4, '0')}`;
}

module.exports = {
  async find({ status } = {}, { page = 1, limit = 20 } = {}) {
    const conditions = [];
    const params     = [];
    if (status && status !== 'All') { conditions.push('status = ?'); params.push(status); }
    const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const offset = (page - 1) * limit;

    const [[{ total: rawTotal }]] = await db.execute(
      `SELECT COUNT(*) AS total FROM orders ${where}`,
      params
    );
    const total  = Number(rawTotal);
    const lim    = parseInt(limit, 10);
    const off    = parseInt(offset, 10);
    const [rows] = await db.execute(
      `SELECT * FROM orders ${where} ORDER BY createdAt DESC LIMIT ${lim} OFFSET ${off}`,
      params
    );
    return { orders: rows, total, page, pages: Math.ceil(total / lim) };
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM orders WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  },

  async create(data) {
    const orderNumber = await genOrderNumber();
    const {
      customerName, mobile, email, address, productType,
      graniteType, size, engravingMethod,
      message = '', quantity = 1, imageUrl = '',
      status = 'Pending', paymentStatus = 'Unpaid',
      totalAmount = 0, notes = '',
    } = data;
    const [result] = await db.execute(
      `INSERT INTO orders
        (orderNumber, customerName, mobile, email, address, productType, graniteType, size,
         engravingMethod, message, quantity, imageUrl, status, paymentStatus, totalAmount, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderNumber, customerName, mobile, email, address, productType, graniteType, size,
       engravingMethod, message, quantity, imageUrl, status, paymentStatus, totalAmount, notes]
    );
    return this.findById(result.insertId);
  },

  async update(id, data) {
    const allowed = ['customerName','mobile','email','address','productType','graniteType','size',
                     'engravingMethod','message','quantity','imageUrl','status','paymentStatus','totalAmount','notes'];
    const sets   = [];
    const params = [];
    for (const key of allowed) {
      if (data[key] !== undefined) { sets.push(`${key} = ?`); params.push(data[key]); }
    }
    if (!sets.length) return this.findById(id);
    params.push(id);
    await db.execute(`UPDATE orders SET ${sets.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  },

  async delete(id) {
    await db.execute('DELETE FROM orders WHERE id = ?', [id]);
  },
};
