/* eslint-disable camelcase */
const pool = require('../../database/index');

const getReviews = async (request, response) => {
  const { product_id } = request.query;
  let { count, page, sort } = request.query;
  // sort === 'relevant' ? sort = 'helpfulness' : sort = sort;
  if (sort === 'relavant' || sort === 'helpful') {
    sort = 'helpfulness';
  } else {
    sort = 'date';
  }
  count = count || 5;
  page = page || 1;
  const offset = count * (page - 1);
  let client;

  try {
    client = await pool.connect();
    const res = await client.query(`SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, (select coalesce(json_agg(photos), '[]'::json) as photos from (select review_photos.id, review_photos.url from review_photos where review_photos.review_id = reviews.id) as photos) from reviews where product_id = $1 AND reported = false order by $2 desc limit $3 offset $4;`, [product_id, sort, count, offset]);
    const resObj = {
      product: product_id,
      page,
      count,
      results: res.rows,
    };
    response.send(resObj);
  } catch (e) {
    response.status(400).send(e);
  } finally {
    client.release();
  }
};

module.exports = { getReviews };
