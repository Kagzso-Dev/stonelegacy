const router   = require('express').Router();
const { body, validationResult } = require('express-validator');
const Message  = require('../models/Message');
const Settings = require('../models/Settings');
const auth     = require('../middleware/auth');
const { sendMail } = require('../mailer');

// POST /api/messages — public
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('message').notEmpty().withMessage('Message required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const msg = await Message.create(req.body);
      res.status(201).json(msg);

      const settings = await Settings.getSingleton();
      sendMail({
        to: settings.email,
        subject: `New enquiry: ${msg.subject || 'Website contact form'}`,
        html: `
          <h2>New message from StoneLegacy website</h2>
          <p><strong>Name:</strong> ${msg.name}</p>
          <p><strong>Email:</strong> ${msg.email}</p>
          <p><strong>Phone:</strong> ${msg.phone || '-'}</p>
          <p><strong>Subject:</strong> ${msg.subject || '-'}</p>
          <p><strong>Message:</strong><br>${msg.message}</p>
        `,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /api/messages — admin
router.get('/', auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === 'true';
    const messages = await Message.find(filter);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/messages/:id/read
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const msg = await Message.markRead(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Not found' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/messages/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.delete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
