const { Pool } = require('pg');
// const pgPwd = require('../../config');

const pool = new Pool({
  user: 'alishaedington',
  host: '52.15.183.253',
  database: 'reviews',
  password: 'alishaedington',
  port: 3002,
});

module.exports = pool;
