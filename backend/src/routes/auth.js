const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User   = require('../models/User');
const auth   = require('../middleware/auth');

const JWT_SECRET  = process.env.JWT_SECRET  || 'stonelegacy_secret_2026';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

// POST /api/auth/login  — accepts { username, password }
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findByUsername(req.body.username, true);
      if (!user) return res.status(401).json({ error: 'Invalid username or password' });

      const match = await User.comparePassword(req.body.password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid username or password' });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
      const { password: _, ...userOut } = user;
      res.json({ token, user: userOut });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/change-password
router.post('/change-password', auth, async (req, res) => {
  try {
    const user  = await User.findById(req.user.id, true);
    const match = await User.comparePassword(req.body.currentPassword, user.password);
    if (!match) return res.status(400).json({ error: 'Current password incorrect' });
    await User.updatePassword(req.user.id, req.body.newPassword);
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
