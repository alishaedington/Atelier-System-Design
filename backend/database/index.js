const { Pool } = require('pg');
// const pgPwd = require('../../config');

const pool = new Pool({
  user: 'alishaedington',
  host: '3.16.15.10',
  database: 'reviews',
  password: 'alishaedington',
  port: 3002,
});

module.exports = pool;
