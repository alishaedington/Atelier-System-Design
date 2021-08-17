/* eslint-disable camelcase */
// const services = require('./services');
const pool = require('../database/index');

const getReviews = async (request, response) => {
  let {
    product_id, count, page, sort,
  } = request.query;
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
    const res = await client.query('select (select json_object_agg(rating, count) as ratings from rating_meta where product_id = $1), (select json_object_agg(recommend, count) as recommended from recommended_meta where product_id = $1), (select json_object_agg(name, characteristics) as characteristics from (select name, id, avg from characteristic_meta where product_id = $1) as characteristics);', [product_id]);
    res.rows[0].product_id = product_id;
    response.send(res.rows[0]);
  } catch (e) {
    response.status(400).end();
  } finally {
    client.release();
  }
};

const postReview = async (request, response) => {
  const {
    product_id, rating, body, recommend, name, email, characteristics, photos, summary,
  } = request.body;
  const date = +new Date();
  let client;

  try {
    client = await pool.connect();
    await client.query('BEGIN');
    const reviewQuery = 'INSERT INTO reviews (id, product_id, rating, date, body, summary, recommend, reviewer_name, reviewer_email, helpfulness) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;';
    const reviewValues = [product_id, rating, date, body, summary, recommend, name, email, 0];
    const res = await client.query(reviewQuery, reviewValues);
    const review_id = res.rows[0].id;
    const photoQuery = 'INSERT INTO review_photos (id, review_id, url) VALUES (DEFAULT, $1, $2);';
    for (let i = 0; i < photos.length; i++) {
      await client.query(photoQuery, [review_id, photos[i]]);
    }
    const recRes = await client.query('SELECT id FROM recommended_meta WHERE recommend = $1 AND product_id = $2', [recommend, product_id]);
    if (recRes.rows.length > 0) {
      await client.query('UPDATE recommended_meta SET count = count + 1 WHERE recommend = $1 AND product_id = $2', [recommend, product_id]);
    } else {
      await client.query('INSERT INTO recommended_meta (product_id, recommend, count) VALUES ($1, $2, $3);', [product_id, recommend, 1]);
    }
    const ratingRes = await client.query('SELECT id FROM rating_meta WHERE rating = $1 AND product_id = $2', [rating, product_id]);
    if (ratingRes.rows.length > 0) {
      await client.query('UPDATE rating_meta SET count = count + 1 WHERE rating = $1 AND product_id = $2', [rating, product_id]);
    } else {
      await client.query('INSERT INTO rating_meta (product_id, rating, count) VALUES ($1, $2, $3);', [product_id, rating, 1]);
    }
    const addCharacteristicReview = 'INSERT INTO characteristic_reviews (id, review_id, characteristic_id, value) VALUES (DEFAULT, $1, $2, $3);';
    const updateCharacteristicMeta = 'UPDATE characteristic_meta SET avg = (((characteristic_meta.count * avg) + $1) / (characteristic_meta.count + 1)), count = characteristic_meta.count + 1 WHERE id = $2;';
    const charsKeysArray = Object.keys(characteristics);
    for (let i = 0; i < charsKeysArray.length; i++) {
      const value = characteristics[charsKeysArray[i]];
      const charID = charsKeysArray[i];
      await client.query(addCharacteristicReview, [review_id, charID, value]);
      await client.query(updateCharacteristicMeta, [value, charID]);
    }
    await client.query('COMMIT');
    response.sendStatus(201);
  } catch (e) {
    await client.query('ROLLBACK');
    response.sendStatus(400).end();
  } finally {
    client.release();
  }
};

const helpful = async (request, response) => {
  const { review_id } = request.params;
  let client;

  try {
    client = await pool.connect();
    await client.query('update reviews set helpfulness = helpfulness + 1 where id = $1', [review_id]);
    response.sendStatus(204).end();
  } catch (e) {
    response.sendStatus(400).end();
  } finally {
    client.release();
  }
};

const report = async (request, response) => {
  const { review_id } = request.params;
  let client;

  try {
    client = await pool.connect();
    await client.query('update reviews set reported = true where id = $1', [review_id]);
    response.sendStatus(204).end();
  } catch (e) {
    response.sendStatus(400).end();
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
