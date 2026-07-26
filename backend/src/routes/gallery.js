const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Gallery = require('../models/Gallery');
const auth    = require('../middleware/auth');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/gallery — public
router.get('/', async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
    const items = await Gallery.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/gallery — admin
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const ext      = path.extname(req.file.originalname) || '.jpg';
      const filename = `gallery-${Date.now()}${ext}`;
      fs.writeFileSync(path.join(UPLOADS_DIR, filename), req.file.buffer);
      const base = process.env.API_URL || `http://localhost:${process.env.PORT || 5000}`;
      imageUrl = `${base}/uploads/${filename}`;
    }
    const item = await Gallery.create({ ...req.body, imageUrl });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/gallery/:id — update title/category/description
router.patch('/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/gallery/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    if (item.imageUrl) {
      const filename = item.imageUrl.split('/uploads/')[1];
      if (filename) {
        const fp = path.join(UPLOADS_DIR, filename);
        if (fs.existsSync(fp)) fs.unlinkSync(fp);
      }
    }
    await Gallery.delete(req.params.id);
    res.json({ message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
