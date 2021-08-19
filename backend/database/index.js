const { Pool } = require('pg');
// const pgPwd = require('../../config');

const pool = new Pool({
  user: 'alishaedington',
  host: 'sdc-postgres',
  database: 'reviews',
  password: 'alishaedington',
  port: 5432,
});

module.exports = pool;
