const { Pool } = require('pg');
// const pgPwd = require('../../config');

const pool = new Pool({
  user: 'alishaedington',
  host: '3.144.8.8',
  database: 'reviews',
  password: 'alishaedington',
  port: 5432,
});

module.exports = pool;
