/**
 * Seed realistic demo data for all tables.
 * Run: node src/seed-data.js
 * Safe to re-run — clears existing data first (except users/settings).
 */
require('dotenv').config();
const pool = require('./db');

// ── Products ────────────────────────────────────────────────────────────────
const products = [
  // Granite Types
  { name: 'Absolute Black Granite',   category: 'granite',   price: 0,    description: 'Deep jet-black finish, ideal for premium house name boards and memorials. Sourced from Karimnagar, Telangana.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', sortOrder: 1 },
  { name: 'Grey Granite',             category: 'granite',   price: 0,    description: 'Classic silver-grey tone with fine grain. Versatile for both indoor and outdoor applications.', imageUrl: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=600', sortOrder: 2 },
  { name: 'Serpentine Granite',       category: 'granite',   price: 0,    description: 'Distinctive green-veined pattern, perfect for decorative plaques and feature signage.', imageUrl: 'https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?w=600', sortOrder: 3 },
  { name: 'Red Granite',              category: 'granite',   price: 0,    description: 'Bold red hue with dark mineral spots. Eye-catching choice for institutional donor walls.', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', sortOrder: 4 },
  // Size Options
  { name: '12" × 6"  (Small)',        category: 'size',      price: 1800, description: 'Compact size ideal for apartment unit plaques, small name plates, and desk signs.', imageUrl: '', sortOrder: 1 },
  { name: '18" × 9"  (Standard)',     category: 'size',      price: 2800, description: 'Our most popular size for house name boards and main entrance plaques.', imageUrl: '', sortOrder: 2 },
  { name: '24" × 12" (Large)',        category: 'size',      price: 4200, description: 'Perfect for bungalows, gated community entrances, and office lobbies.', imageUrl: '', sortOrder: 3 },
  { name: '30" × 18" (Extra Large)',  category: 'size',      price: 6500, description: 'Grand format for school campus signage, hospital entrances, and donor walls.', imageUrl: '', sortOrder: 4 },
  { name: 'Custom Size',              category: 'size',      price: 0,    description: 'Tell us your exact dimensions. We fabricate to any size. Quote on request.', imageUrl: '', sortOrder: 5 },
  // Quality Levels
  { name: 'Standard',                 category: 'quality',   price: 0,    description: 'Hand-polished single-face, painted lettering, UV-protected coating. Best value.', imageUrl: '', sortOrder: 1 },
  { name: 'Premium',                  category: 'quality',   price: 800,  description: 'Mirror-polished dual-face, gold or silver infill, rust-proof brass inserts included.', imageUrl: '', sortOrder: 2 },
  { name: 'Luxury',                   category: 'quality',   price: 2000, description: 'Full 3D relief carving, 24K gold leaf finish, certificate of authenticity. Heirloom grade.', imageUrl: '', sortOrder: 3 },
  // Engraving Methods
  { name: 'CNC Engraving',            category: 'engraving', price: 0,    description: 'Computer-controlled precision routing. Sharp, consistent V-cuts up to 8mm deep. Most popular.', imageUrl: '', sortOrder: 1 },
  { name: 'Sandblasting',             category: 'engraving', price: 300,  description: 'High-pressure abrasive blasting for deep texture contrast. Rustic and artistic finish.', imageUrl: '', sortOrder: 2 },
  { name: 'Laser Etching',            category: 'engraving', price: 500,  description: 'Fine detail work — portraits, logos, micro-text. Up to 600 DPI resolution.', imageUrl: '', sortOrder: 3 },
  { name: 'Hand Carving',             category: 'engraving', price: 1500, description: 'Traditional chisel work by master craftsmen. Each piece is a signed original.', imageUrl: '', sortOrder: 4 },
];

// ── Gallery ─────────────────────────────────────────────────────────────────
const gallery = [
  { title: 'Modern Minimalist Name Board', category: 'House Name Boards', description: 'Absolute Black Granite with CNC-engraved white-infill Roman numerals for Villa No. 12.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', sortOrder: 1 },
  { title: 'Double-Sided Villa Plaque',    category: 'House Name Boards', description: '24×12 Grey Granite with gold leaf finish for a gated community entrance.', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', sortOrder: 2 },
  { title: 'Heritage Bungalow Sign',       category: 'House Name Boards', description: 'Serpentine Granite with hand-carved Tamil & English text for a heritage property.', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', sortOrder: 3 },

  { title: 'School Main Entrance Board',   category: 'School Signage',    description: 'Red Granite 30×18 with sandblasted school crest and founding year 1972.', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', sortOrder: 1 },
  { title: 'Library Dedication Plaque',    category: 'School Signage',    description: 'Absolute Black Granite memorial plaque installed at school library entrance.', imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800', sortOrder: 2 },
  { title: 'Campus Directional Sign',      category: 'School Signage',    description: 'Grey Granite campus wayfinding sign with CNC arrow and block lettering.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', sortOrder: 3 },

  { title: 'Loving Father Memorial',       category: 'Memorial Plaques',  description: 'Black granite memorial with laser-etched portrait and poem in Sanskrit and English.', imageUrl: 'https://images.unsplash.com/photo-1471513671800-b09c87e1497c?w=800', sortOrder: 1 },
  { title: 'Veterans Honour Plaque',       category: 'Memorial Plaques',  description: 'Grey Granite 18×9 with sandblasted military emblem. Installed at district war memorial.', imageUrl: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800', sortOrder: 2 },
  { title: 'Cemetery Name Stone',          category: 'Memorial Plaques',  description: 'Premium Absolute Black with gold-leaf name and dates. Bevelled edge polish.', imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800', sortOrder: 3 },

  { title: 'Hospital Donor Wall — Phase 1', category: 'Donor Walkways',  description: 'Series of 48 Absolute Black tiles for Apollo Hospital Chennai. Donors from ₹1L to ₹1Cr.', imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800', sortOrder: 1 },
  { title: 'University Benefactor Walk',   category: 'Donor Walkways',    description: 'Red Granite pavers engraved with 120 donor names along the main campus promenade.', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', sortOrder: 2 },
  { title: 'Temple Trust Donor Wall',      category: 'Donor Walkways',    description: 'Serpentine Granite wall panel with donor names and trust logo at temple entrance.', imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', sortOrder: 3 },

  { title: 'Absolute Black Close-Up',      category: 'Granite Samples',   description: 'High-polish mirror finish on Absolute Black — no visible grain. 150 micron smoothness.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', sortOrder: 1 },
  { title: 'Serpentine Slab Detail',       category: 'Granite Samples',   description: 'Natural serpentine veining under studio lighting. Each slab is unique.', imageUrl: 'https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?w=800', sortOrder: 2 },
  { title: 'Red Granite Texture',          category: 'Granite Samples',   description: 'Flamed surface finish on Red Granite — popular for outdoor installations.', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', sortOrder: 3 },
];

// ── Orders ───────────────────────────────────────────────────────────────────
const now = new Date();
const daysAgo = (n) => new Date(now - n * 86400000).toISOString().slice(0, 19).replace('T', ' ');

const orders = [
  { customerName: 'Rajesh Kumar',      mobile: '9841234567', email: 'rajesh.kumar@gmail.com',    address: '14, Anna Nagar, Chennai 600040',           productType: 'House Name Board',    graniteType: 'Absolute Black Granite', size: '18x9',   engravingMethod: 'CNC Engraving',  message: 'Name: KUMAR HOUSE. Include lotus motif above text.', quantity: 1, totalAmount: 3600, status: 'Delivered',  paymentStatus: 'Paid',    notes: 'Delivered on time. Customer very happy.', createdAt: daysAgo(30) },
  { customerName: 'Priya Suresh',      mobile: '9840987654', email: 'priya.suresh@outlook.com',  address: '7B, Besant Nagar, Chennai 600090',          productType: 'House Name Board',    graniteType: 'Grey Granite',           size: '24x12',  engravingMethod: 'Sandblasting',   message: 'Text: THE SURESH RESIDENCE. Font should be elegant serif.', quantity: 1, totalAmount: 5500, status: 'Delivered',  paymentStatus: 'Paid',    notes: 'Premium quality requested.', createdAt: daysAgo(25) },
  { customerName: 'Venkatesh Naidu',   mobile: '9876501234', email: 'v.naidu@yahoo.com',         address: '22, Mylapore, Chennai 600004',              productType: 'Memorial Plaque',     graniteType: 'Absolute Black Granite', size: '18x9',   engravingMethod: 'Laser Etching',  message: 'In memory of Saraswathi Naidu (1940–2023). Photo engraving required.', quantity: 1, totalAmount: 4800, status: 'Completed',  paymentStatus: 'Paid',    notes: 'Photo file received via WhatsApp.', createdAt: daysAgo(20) },
  { customerName: 'Anitha Krishnan',   mobile: '9952345678', email: 'anitha.k@gmail.com',        address: '3, Adyar, Chennai 600020',                 productType: 'House Name Board',    graniteType: 'Serpentine Granite',     size: '24x12',  engravingMethod: 'CNC Engraving',  message: 'KRISHNA VILLA. Add small Om symbol. White paint infill.', quantity: 1, totalAmount: 4200, status: 'Processing', paymentStatus: 'Partial', notes: '50% advance paid ₹2100.', createdAt: daysAgo(15) },
  { customerName: 'Mohammed Farooq',   mobile: '9843456789', email: 'mfarooq@hotmail.com',       address: '18, Kilpauk, Chennai 600010',              productType: 'House Name Board',    graniteType: 'Absolute Black Granite', size: '18x9',   engravingMethod: 'CNC Engraving',  message: 'AL FAROOQ. Include crescent moon design. Gold infill.', quantity: 1, totalAmount: 3800, status: 'Processing', paymentStatus: 'Partial', notes: 'Design approval pending.', createdAt: daysAgo(12) },
  { customerName: 'Lakshmi Rajan',     mobile: '9790123456', email: 'lakshmi.rajan@gmail.com',   address: '5, T. Nagar, Chennai 600017',              productType: 'House Name Board',    graniteType: 'Red Granite',            size: '18x9',   engravingMethod: 'Sandblasting',   message: 'RAJAN NIVAS. Deep relief carving. No paint fill — natural stone.', quantity: 1, totalAmount: 3200, status: 'Pending',    paymentStatus: 'Unpaid',  notes: '', createdAt: daysAgo(8) },
  { customerName: 'Siva Chandran',     mobile: '9841123456', email: 'sivachandran@gmail.com',    address: '29, Velachery, Chennai 600042',            productType: 'School Signage',      graniteType: 'Red Granite',            size: '30x18',  engravingMethod: 'Sandblasting',   message: 'SRI KRISHNA VIDYALAYA Est. 1985. Include school logo file attached.', quantity: 2, totalAmount: 15000, status: 'Processing', paymentStatus: 'Partial', notes: 'Large order — 2 boards for main gate.', createdAt: daysAgo(7) },
  { customerName: 'Deepa Venkatram',   mobile: '9884567890', email: 'deepa.v@gmail.com',         address: '11, Nungambakkam, Chennai 600034',         productType: 'Memorial Plaque',     graniteType: 'Absolute Black Granite', size: '18x9',   engravingMethod: 'Laser Etching',  message: 'Dedicated to Dr. V. Ramachandran. Photo + text engraving.', quantity: 1, totalAmount: 5200, status: 'Pending',    paymentStatus: 'Unpaid',  notes: 'Waiting for photo file.', createdAt: daysAgo(5) },
  { customerName: 'Arun Selvam',       mobile: '9940234567', email: 'arun.selvam@gmail.com',     address: '8, Perambur, Chennai 600011',              productType: 'House Name Board',    graniteType: 'Grey Granite',           size: '18x9',   engravingMethod: 'CNC Engraving',  message: 'SELVAM HOUSE, Door No. 8. Simple block lettering.', quantity: 1, totalAmount: 2800, status: 'Pending',    paymentStatus: 'Unpaid',  notes: '', createdAt: daysAgo(3) },
  { customerName: 'Kavitha Mohan',     mobile: '9789456123', email: 'kavitha.mohan@gmail.com',   address: '45, Porur, Chennai 600116',                productType: 'House Name Board',    graniteType: 'Absolute Black Granite', size: '24x12',  engravingMethod: 'CNC Engraving',  message: 'MOHAN RESIDENCY. Bilingual — Tamil and English. Gold paint.', quantity: 1, totalAmount: 4500, status: 'Pending',    paymentStatus: 'Unpaid',  notes: 'First-time customer via Instagram.', createdAt: daysAgo(1) },
];

// ── Messages ─────────────────────────────────────────────────────────────────
const messages = [
  { name: 'Suresh Babu',       email: 'suresh.babu@gmail.com',    phone: '9841111222', subject: 'Quote for House Name Board',       message: 'Hello, I need a quote for a 24×12 Absolute Black granite name board for my new house in Sholinganallur. Text will be "SURESH VILLA" in Tamil and English. Please let me know the price and delivery time.', isRead: 1, createdAt: daysAgo(22) },
  { name: 'Nalini Parthiban',  email: 'nalini.p@outlook.com',     phone: '9952678901', subject: 'Memorial plaque enquiry',          message: 'We want a memorial plaque for our late father who passed away last month. Would like a photo engraved along with his name and dates. Can you please share samples of your previous work?', isRead: 1, createdAt: daysAgo(18) },
  { name: 'Principal, KV School', email: 'principal@kvschool.edu', phone: '9840000111', subject: 'School entrance signage — bulk',  message: 'We are looking for granite signage for our school renovation project. We need 1 main entrance board (30×18), 2 block name boards (24×12 each), and around 10 classroom name plates (12×6). Please send a bulk quotation.', isRead: 1, createdAt: daysAgo(14) },
  { name: 'Ravi Shankar',      email: 'ravi.shankar@yahoo.in',    phone: '9884321098', subject: 'Red granite for pooja room',       message: 'I am renovating my pooja room and would like a red granite name plate with Lord Ganesh engraved. Size roughly 12×6. Is hand carving available? What is the approximate cost?', isRead: 0, createdAt: daysAgo(10) },
  { name: 'Tamilselvan M',     email: 'tamilselvan@gmail.com',    phone: '9791234567', subject: 'Donor wall for temple project',    message: 'We are constructing a new temple in Tambaram and planning a donor wall with around 80 name tiles. All in Absolute Black granite with gold lettering. Can you visit the site and give a project quote? This is an urgent requirement.', isRead: 0, createdAt: daysAgo(6) },
  { name: 'Mrs. Jayanthi',     email: 'jayanthi.iyer@gmail.com',  phone: '9940876543', subject: 'Serpentine granite availability',  message: 'I saw your serpentine granite sample on Instagram and I absolutely love it. Is it available in the 18×9 size? What is the lead time? I need it before Diwali.', isRead: 0, createdAt: daysAgo(3) },
  { name: 'Dr. Ganesh Kumar',  email: 'dr.ganesh@hospital.in',    phone: '9841555666', subject: 'Hospital donor wall — 200 tiles', message: 'We are expanding our hospital and would like to install a donor recognition wall. We estimate 200 tiles in varying sizes based on donation amount. Please arrange a meeting with your project team to discuss design and costing.', isRead: 0, createdAt: daysAgo(1) },
];

// ── Runner ────────────────────────────────────────────────────────────────────
async function seedData() {
  const conn = await pool.getConnection();
  try {
    // Clear existing data (preserve users and settings)
    await conn.execute('DELETE FROM gallery');
    await conn.execute('DELETE FROM products');
    await conn.execute('DELETE FROM messages');
    await conn.execute('DELETE FROM orders');
    await conn.execute('ALTER TABLE gallery  AUTO_INCREMENT = 1');
    await conn.execute('ALTER TABLE products AUTO_INCREMENT = 1');
    await conn.execute('ALTER TABLE messages AUTO_INCREMENT = 1');
    await conn.execute('ALTER TABLE orders   AUTO_INCREMENT = 1');
    console.log('Cleared existing data.');

    // Products
    for (const p of products) {
      await conn.execute(
        `INSERT INTO products (name, category, description, price, imageUrl, isActive, sortOrder)
         VALUES (?, ?, ?, ?, ?, 1, ?)`,
        [p.name, p.category, p.description, p.price, p.imageUrl, p.sortOrder]
      );
    }
    console.log(`Inserted ${products.length} products.`);

    // Gallery
    for (const g of gallery) {
      await conn.execute(
        `INSERT INTO gallery (title, category, imageUrl, description, isActive, sortOrder)
         VALUES (?, ?, ?, ?, 1, ?)`,
        [g.title, g.category, g.imageUrl, g.description, g.sortOrder]
      );
    }
    console.log(`Inserted ${gallery.length} gallery items.`);

    // Orders — insert with explicit createdAt
    let num = 1;
    for (const o of orders) {
      const orderNumber = `SL-${String(num++).padStart(4, '0')}`;
      await conn.execute(
        `INSERT INTO orders
          (orderNumber, customerName, mobile, email, address, productType, graniteType, size,
           engravingMethod, message, quantity, imageUrl, status, paymentStatus, totalAmount, notes, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', ?, ?, ?, ?, ?)`,
        [orderNumber, o.customerName, o.mobile, o.email, o.address, o.productType,
         o.graniteType, o.size, o.engravingMethod, o.message, o.quantity,
         o.status, o.paymentStatus, o.totalAmount, o.notes, o.createdAt]
      );
    }
    console.log(`Inserted ${orders.length} orders.`);

    // Messages — insert with explicit createdAt
    for (const m of messages) {
      await conn.execute(
        `INSERT INTO messages (name, email, phone, subject, message, isRead, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [m.name, m.email, m.phone, m.subject, m.message, m.isRead, m.createdAt]
      );
    }
    console.log(`Inserted ${messages.length} messages.`);

    console.log('\nSeed complete!');
  } finally {
    conn.release();
    await pool.end();
  }
}

seedData().catch((err) => { console.error(err); process.exit(1); });
