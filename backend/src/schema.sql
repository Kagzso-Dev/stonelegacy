CREATE DATABASE IF NOT EXISTS stonelegacy;
USE stonelegacy;

CREATE TABLE IF NOT EXISTS users (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  username  VARCHAR(50)  UNIQUE,
  email     VARCHAR(255) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  role      ENUM('admin','staff') DEFAULT 'staff',
  isActive  TINYINT(1)   DEFAULT 1,
  createdAt TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  category    ENUM('granite','size','quality','engraving') NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) DEFAULT 0,
  imageUrl    VARCHAR(500)  DEFAULT '',
  isActive    TINYINT(1)    DEFAULT 1,
  sortOrder   INT           DEFAULT 0,
  createdAt   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  category    ENUM('House Name Boards','School Signage','Memorial Plaques','Donor Walkways','Granite Samples') NOT NULL,
  imageUrl    VARCHAR(500) NOT NULL,
  publicId    VARCHAR(255) DEFAULT '',
  description TEXT,
  isActive    TINYINT(1)   DEFAULT 1,
  sortOrder   INT          DEFAULT 0,
  createdAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  orderNumber     VARCHAR(50)   UNIQUE,
  customerName    VARCHAR(255)  NOT NULL,
  mobile          VARCHAR(50)   NOT NULL,
  email           VARCHAR(255)  NOT NULL,
  address         TEXT          NOT NULL,
  productType     VARCHAR(255)  NOT NULL,
  graniteType     ENUM('Absolute Black Granite','Grey Granite','Serpentine Granite','Red Granite') NOT NULL,
  size            VARCHAR(255)  NOT NULL,
  engravingMethod ENUM('CNC Engraving','Sandblasting','Laser Etching','Hand Carving') NOT NULL,
  message         TEXT,
  quantity        INT           DEFAULT 1,
  imageUrl        VARCHAR(500)  DEFAULT '',
  status          ENUM('Pending','Processing','Completed','Delivered') DEFAULT 'Pending',
  paymentStatus   ENUM('Unpaid','Partial','Paid') DEFAULT 'Unpaid',
  totalAmount     DECIMAL(10,2) DEFAULT 0,
  notes           TEXT,
  createdAt       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updatedAt       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  email     VARCHAR(255) NOT NULL,
  phone     VARCHAR(50)  DEFAULT '',
  subject   VARCHAR(255) DEFAULT '',
  message   TEXT         NOT NULL,
  isRead    TINYINT(1)   DEFAULT 0,
  createdAt TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  id           VARCHAR(10) PRIMARY KEY DEFAULT 'site',
  companyName  VARCHAR(255) DEFAULT 'StoneLegacy Engravers',
  tagline      VARCHAR(255) DEFAULT 'Preserving Memories in Stone for Generations',
  phone        VARCHAR(50)  DEFAULT '+91 98400 00000',
  whatsapp     VARCHAR(50)  DEFAULT '+91 98400 00000',
  email        VARCHAR(255) DEFAULT 'info@stonelegacy.in',
  address      TEXT,
  city         VARCHAR(100) DEFAULT 'Chennai',
  state        VARCHAR(100) DEFAULT 'Tamil Nadu',
  pincode      VARCHAR(20)  DEFAULT '600 058',
  facebook     VARCHAR(500) DEFAULT '',
  instagram    VARCHAR(500) DEFAULT '',
  youtube      VARCHAR(500) DEFAULT '',
  website      VARCHAR(255) DEFAULT 'www.stonelegacy.in',
  logoUrl      VARCHAR(500) DEFAULT '',
  accentColor  VARCHAR(20)  DEFAULT '#F97316',
  floatingButtonsEnabled TINYINT(1) DEFAULT 1,
  smtpUser     VARCHAR(255) DEFAULT '',
  smtpPass     VARCHAR(255) DEFAULT '',
  createdAt    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updatedAt    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Default settings row
INSERT IGNORE INTO settings (id) VALUES ('site');

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
);

CREATE TABLE IF NOT EXISTS service_settings (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  service       VARCHAR(100) UNIQUE NOT NULL,
  heroImageUrl  VARCHAR(500) DEFAULT '',
  heroPublicId  VARCHAR(255) DEFAULT '',
  cardImageUrl  VARCHAR(500) DEFAULT '',
  cardPublicId  VARCHAR(255) DEFAULT '',
  updatedAt     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
