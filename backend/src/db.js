const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               parseInt(process.env.DB_PORT || '3306'),
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || 'Ragil@2004',
  database:           process.env.DB_NAME     || 'stonelegacy',
  waitForConnections: true,
  connectionLimit:    10,
  timezone:           '+00:00',
});

module.exports = pool;
