const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config({ override: true });

const pool = require('./db');

const authRoutes         = require('./routes/auth');
const orderRoutes        = require('./routes/orders');
const productRoutes      = require('./routes/products');
const galleryRoutes      = require('./routes/gallery');
const messageRoutes      = require('./routes/messages');
const settingsRoutes     = require('./routes/settings');
const statsRoutes        = require('./routes/stats');
const serviceMediaRoutes    = require('./routes/service-media');
const serviceSettingsRoutes = require('./routes/service-settings');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth',          authRoutes);
app.use('/api/orders',        orderRoutes);
app.use('/api/products',      productRoutes);
app.use('/api/gallery',       galleryRoutes);
app.use('/api/messages',      messageRoutes);
app.use('/api/settings',      settingsRoutes);
app.use('/api/stats',         statsRoutes);
app.use('/api/service-media',    serviceMediaRoutes);
app.use('/api/service-settings', serviceSettingsRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'StoneLegacy API' }));

app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Verify DB connection then start
pool.getConnection()
  .then((conn) => {
    conn.release();
    console.log('MySQL connected');
    app.listen(PORT, () => console.log(`StoneLegacy API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  });
