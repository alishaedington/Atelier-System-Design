const { Pool } = require('pg');
const pgPwd = require('../../config');

const pool = new Pool({
  user: 'alishaedington',
  host: 'localhost', // use when running locally
  // host: '18.189.29.23', // use when running in ec2 instance (check IP matches IP of instance)
  database: 'reviews',
  password: pgPwd,
  port: 5432, // use when running locally
  // port: 3002, //use was deployed
});

module.exports = pool;
