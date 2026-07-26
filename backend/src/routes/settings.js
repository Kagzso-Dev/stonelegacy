const router   = require('express').Router();
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const jwt      = require('jsonwebtoken');
const Settings = require('../models/Settings');
const auth     = require('../middleware/auth');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

function isAdminRequest(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return false;
  try {
    jwt.verify(header.split(' ')[1], process.env.JWT_SECRET || 'stonelegacy_secret_2026');
    return true;
  } catch {
    return false;
  }
}

// GET /api/settings — public (SMTP credentials only included for logged-in admins)
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.getSingleton();
    if (!isAdminRequest(req)) {
      delete settings.smtpUser;
      delete settings.smtpPass;
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings — admin
router.put('/', auth, upload.single('logo'), async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      const ext      = path.extname(req.file.originalname) || '.png';
      const filename = `logo${ext}`;
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), req.file.buffer);
      const base    = process.env.API_URL || `http://localhost:${process.env.PORT || 5000}`;
      data.logoUrl  = `${base}/uploads/${filename}`;
    }

    const settings = await Settings.update(data);
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/settings/logo — admin
router.delete('/logo', auth, async (_req, res) => {
  try {
    const settings = await Settings.clearLogo();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
