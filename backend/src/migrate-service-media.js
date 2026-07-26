/**
 * Run once to create the service_media table:
 *   node src/migrate-service-media.js
 */
require('dotenv').config();
const pool = require('./db');

async function migrate() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS service_media (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      service     VARCHAR(100) NOT NULL,
      type        ENUM('image','video') NOT NULL DEFAULT 'image',
      title       VARCHAR(255) NOT NULL,
      mediaUrl    VARCHAR(500) NOT NULL,
      publicId    VARCHAR(255) DEFAULT '',
      thumbnail   VARCHAR(500) DEFAULT '',
      description TEXT,
      isActive    TINYINT(1) DEFAULT 1,
      sortOrder   INT DEFAULT 0,
      createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('service_media table created (or already exists).');

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS service_settings (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      service       VARCHAR(100) UNIQUE NOT NULL,
      heroImageUrl  VARCHAR(500) DEFAULT '',
      heroPublicId  VARCHAR(255) DEFAULT '',
      cardImageUrl  VARCHAR(500) DEFAULT '',
      cardPublicId  VARCHAR(255) DEFAULT '',
      updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  console.log('service_settings table created (or already exists).');

  await pool.end();
}

migrate().catch((err) => { console.error(err); process.exit(1); });
