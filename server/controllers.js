const services = require('./services');
const pool = require('../database/index');

const getReviews = async (request, response) => {
  const { product_id, count, page } = request.query;
  let client;

  try {
    client = await pool.connect();
    const res = await client.query('SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, (select json_agg(photos) from (select review_photos.id, review_photos.url from review_photos where review_photos.review_id = reviews.id) as photos) from reviews where product_id = $1 AND reported = "f";', [product_id]);
    const resObj = {
      product: product_id,
      page,
      count,
      results: res.rows,
    };
    response.send(resObj);
  } catch (e) {
    response.status(400).end();
  } finally {
    client.release();
  }
};

const getReviewsMeta = async (request, response) => {
  const { product_id } = request.query;
  let client;

  try {
    client = await pool.connect();
    const res = await client.query('', [product_id]);
    console.log(res.rows);
  } catch (e) {
    response.status(400).end();
  } finally {
    client.release();
  }
};

const postReview = async (request, response) => {
  let client;

  try {
    client = await pool.connect();
    const res = await client.query('some cool sql stuff', []);
    response.status(204);
  } catch (e) {
    response.status(400).end();
  } finally {
    client.release();
  }
};

const helpful = async (request, response) => {
  const { review_id } = request.params;
  let client;

  try {
    client = await pool.connect();
    const res = await client.query('update reviews set helpfulness = helpfulness + 1 where id = $1', [review_id]);
    response.status(204);
  } catch (e) {
    response.status(400).end();
  } finally {
    client.release();
  }
};

const report = async (request, response) => {
  const { review_id } = request.params;
  let client;

  try {
    client = await pool.connect();
    const res = await client.query('update reviews set reported = t where id = $1', [review_id]);
    console.log(res.rows);
  } catch (e) {
    response.status(400).end();
  } finally {
    client.release();
  }
};

module.exports = {
  getReviews,
  getReviewsMeta,
  postReview,
  helpful,
  report,
};
