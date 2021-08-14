const { Pool } = require('pg');
const pgPwd = require('../config');

const pool = new Pool({
  user: 'alishaedington',
  host: 'localhost',
  database: 'reviews',
  password: pgPwd,
  port: 5432,
});

module.exports = pool;
