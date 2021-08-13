const services = require('../database/services');
const pool = require('../database/index');

const getReviews = async (request, response) => {
  const { product_id } = request.query;
  console.log('productId', product_id);
  const client = await pool.connect();

  try {
    const res = await client.query('SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, ARRAY(select row (review_photos.id, review_photos.url) from review_photos where review_photos.review_id = reviews.id) as photos from reviews where product_id = $1;', [product_id]);
    console.log('result from query', res);
    response.send(res);
  } finally {
    client.release();
  }
};

const getReviewsMeta = async (request) => {
  const client = await pool.connect();

  try {
    const res = client.query('some cool sql stuff', [])
    console.log(res.rows[0]);
  } finally {
    client.release();
  }
};



module.exports = {
  getReviews,
  getReviewsMeta,
  // postReview,
  // helpful,
  // report,
};
