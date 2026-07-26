const router      = require('express').Router();
const cloudinary  = require('cloudinary').v2;
const multer      = require('multer');
const ServiceMedia = require('../models/ServiceMedia');
const auth        = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

// GET /api/service-media?service=donor-walkways — public
router.get('/', async (req, res) => {
  try {
    const items = await ServiceMedia.find({
      service: req.query.service || undefined,
      type:    req.query.type    || undefined,
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/service-media — admin
router.post('/', auth, upload.single('media'), async (req, res) => {
  try {
    let mediaUrl  = '';
    let publicId  = '';
    let thumbnail = '';
    const isVideo = req.body.type === 'video';

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder:        'stonelegacy/service-media',
            resource_type: isVideo ? 'video' : 'image',
          },
          (err, res) => (err ? reject(err) : resolve(res))
        ).end(req.file.buffer);
      });
      mediaUrl  = result.secure_url;
      publicId  = result.public_id;
      // For videos generate a thumbnail URL via Cloudinary's transform
      if (isVideo) {
        thumbnail = result.secure_url.replace('/upload/', '/upload/so_0,w_600,c_fill/').replace(/\.\w+$/, '.jpg');
      }
    }

    const item = await ServiceMedia.create({ ...req.body, mediaUrl, publicId, thumbnail });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/service-media/:id — admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await ServiceMedia.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId, {
        resource_type: item.type === 'video' ? 'video' : 'image',
      });
    }
    await ServiceMedia.delete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
