const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const ServiceSettings = require('../models/ServiceSettings');
const auth    = require('../middleware/auth');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// GET /api/service-settings — all services, public
router.get('/', async (req, res) => {
  try {
    const rows = await ServiceSettings.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/service-settings/:service — single service, public
router.get('/:service', async (req, res) => {
  try {
    const row = await ServiceSettings.findByService(req.params.service);
    res.json(row || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/service-settings/:service — upload hero and/or card image, admin
router.put('/:service', auth, upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'cardImage', maxCount: 1 },
]), async (req, res) => {
  try {
    const service  = req.params.service;
    const existing = await ServiceSettings.findByService(service) || {};
    const data     = { ...existing };
    const base     = process.env.API_URL || `http://localhost:${process.env.PORT || 5000}`;

    if (req.files?.heroImage?.[0]) {
      const file = req.files.heroImage[0];
      const ext  = path.extname(file.originalname) || '.jpg';
      const filename = `hero-${service}${ext}`;
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), file.buffer);
      data.heroImageUrl = `${base}/uploads/${filename}`;
    }

    if (req.files?.cardImage?.[0]) {
      const file = req.files.cardImage[0];
      const ext  = path.extname(file.originalname) || '.jpg';
      const filename = `card-${service}${ext}`;
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), file.buffer);
      data.cardImageUrl = `${base}/uploads/${filename}`;
    }

    const updated = await ServiceSettings.upsert(service, data);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
