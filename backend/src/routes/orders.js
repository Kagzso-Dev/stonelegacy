const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Order  = require('../models/Order');
const auth   = require('../middleware/auth');

// POST /api/orders — public
router.post(
  '/',
  [
    body('customerName').notEmpty().withMessage('Name required'),
    body('mobile').notEmpty().withMessage('Mobile required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('address').notEmpty().withMessage('Address required'),
    body('productType').notEmpty().withMessage('Product type required'),
    body('graniteType').notEmpty().withMessage('Granite type required'),
    body('size').notEmpty().withMessage('Size required'),
    body('engravingMethod').notEmpty().withMessage('Engraving method required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /api/orders — admin
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const result = await Order.find({ status }, { page: +page, limit: +limit });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/orders/:id
router.patch('/:id', auth, async (req, res) => {
  try {
    const order = await Order.update(req.params.id, req.body);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/orders/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Order.delete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
