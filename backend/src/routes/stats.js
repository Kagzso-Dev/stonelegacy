const router = require('express').Router();
const db     = require('../db');
const auth   = require('../middleware/auth');

// GET /api/stats — admin
router.get('/', auth, async (req, res) => {
  try {
    const [[{ totalOrders }]] = await db.execute('SELECT COUNT(*) AS totalOrders FROM orders');
    const [[{ revenue }]]     = await db.execute("SELECT COALESCE(SUM(totalAmount),0) AS revenue FROM orders WHERE paymentStatus='Paid'");
    const [[{ customers }]]   = await db.execute('SELECT COUNT(DISTINCT email) AS customers FROM orders');
    const [[{ pending }]]     = await db.execute("SELECT COUNT(*) AS pending FROM orders WHERE status='Pending'");
    const [[{ unread }]]      = await db.execute('SELECT COUNT(*) AS unread FROM messages WHERE isRead=0');
    res.json({
      totalOrders: Number(totalOrders),
      revenue:     Number(revenue),
      customers:   Number(customers),
      pending:     Number(pending),
      unread:      Number(unread),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
