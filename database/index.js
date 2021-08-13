const { Pool } = require('pg');
const pgPwd = require('../config');

const connection = new Pool({
  user: 'alishaedington',
  host: 'localhost',
  database: 'reviews',
  password: pgPwd,
  port: 5432,
});

// connection.connect((err) => {
//   if (err) { console.log(err); }
//   else { console.log('connected to DB'); }
// });

module.exports = connection;
