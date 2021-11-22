/* eslint-disable camelcase */
const pool = require('../../database/index');

const getReviewsMeta = async (request, response) => {
  const { product_id } = request.query;
  let client;

  try {
    client = await pool.connect();
    const res = await client.query('select product_id, (select json_object_agg(rating, count) as ratings from rating_meta where product_id = $1), (select json_object_agg(recommend, count) as recommended from recommended_meta where product_id = $1), (select json_object_agg(name, characteristics) as characteristics from (select name, id, avg from characteristic_meta where product_id = $1) as characteristics) from rating_meta where product_id = $1;', [product_id]);
    response.send(res.rows[0]);
  } catch (e) {
    response.status(400).end();
  } finally {
    client.release();
  }
};

module.exports = { getReviewsMeta };
