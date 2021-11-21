/* eslint-disable camelcase */
const pool = require('../../database/index');

const helpful = async (request, response) => {
  const { review_id } = request.params;
  let client;

  try {
    client = await pool.connect();
    await client.query('update reviews set helpfulness = helpfulness + 1 where id = $1', [review_id]);
    response.sendStatus(204).end();
  } catch (e) {
    response.status(400).send(e);
  } finally {
    client.release();
  }
};

module.exports = { helpful };
