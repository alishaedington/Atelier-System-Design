/* eslint-disable */
const express = require('express');
const request = require('supertest');
const app = require('./server');

describe('GET /reviews', () => {
  it('should return an object with an array of nested review objects when getting reviews for a specific product', async () => {
    const response = await request(app).get('/reviews?product_id=1');
    expect(typeof response.body).toBe('object');
    expect(Array.isArray(response.body.results)).toBe(true);
    expect(typeof response.body.results[0]).toBe('object');
  });

  it('should return specified amount of reviews', async () => {
    const response = await request(app).get('/reviews?product_id=1&count=1');
    expect(response.body.results).toHaveLength(1);
  });

  it('each review should have a photos array', async () => {
    const response = await request(app).get('/reviews?product_id=1');
    expect(Array.isArray(response.body.results[0].photos)).toBe(true);
  });

  it('should return status code 200', async () => {
    const response = await request(app).get('/reviews?product_id=1');
    expect(response.status).toBe(200);
  });

  it('should return status code 400 when incorrect params are passed in', async () => {
    const response = await request(app).get('/reviews?product_id=a');
    expect(response.status).toBe(400);
  });
});

describe('GET /reviews/meta', () => {
  it('should return an object', async () => {
    const response = await request(app).get('/reviews/meta?product_id=1');
    expect(typeof response.body).toBe('object');
  });

  it('should have the correct format', async () => {
    const response = await request(app).get('/reviews/meta?product_id=1');
    expect(typeof response.body.ratings).toBe('object');
    expect(typeof response.body.recommended).toBe('object');
    expect(typeof response.body.characteristics).toBe('object');
  });

  it('should return status code 200', async () => {
    const response = await request(app).get('/reviews/meta?product_id=1');
    expect(response.status).toBe(200);
  });

  it('should return status code 400 when incorrect params type passed in', async () => {
    const response = await request(app).get('/reviews/meta?product_id=a');
    expect(response.status).toBe(400);
  });
});

describe('PUT /reviews/:review_id/helpful', () => {

  it('should increase helpfulness by one', async () => {
    const beforeHelpful = await request(app).get('/reviews?product_id=1');
    const initialHelpfulness = beforeHelpful.body.results[0].helpfulness;
    const putResponse = await request(app).put('/reviews/2/helpful');
    expect(putResponse.status).toBe(204)
    const afterHelpful = await request(app).get('/reviews?product_id=1');
    const currentHelpfulness = afterHelpful.body.results[0].helpfulness;
    expect(currentHelpfulness).toBe(initialHelpfulness + 1);
  });

  it('should return status code 204 upon success', async () => {
    const response = await request(app).put('/reviews/1/helpful');
    expect(response.status).toBe(204);
  });

  it('should return status code 400 when incorrect params type passed in', async () => {
    const response = await request(app).put('/reviews/hello/helpful');
    expect(response.status).toBe(400);
  });
});

// describe('PUT /reviews/:review_id/report', () => {

//   it('should not display reported reviews', async ()=>{
//     const beforeReport = await request(app).get('/reviews?product_id=12&count=10');
//     const initialAmount = beforeReport.body.results.length;
//     const putResponse = await request(app).put('/reviews/16/report');
//     expect(putResponse.status).toBe(204)
//     const afterReport = await request(app).get('/reviews?product_id=12&count=10');
//     const currentAmount = afterReport.body.results.length;
//     expect(currentAmount).toBe(initialAmount - 1);
//   });

//   it('should return status code 204 upon success', async ()=>{
//     const response = await request(app).put('/reviews/74975/report');
//     expect(response.status).toBe(204);
//   });

//   it('should return status code 400 when incorrect params type passed in', async ()=>{
//     const response = await request(app).put('/reviews/hello/report');
//     expect(response.status).toBe(400);
//   });
// });

describe('POST /reviews', () => {

  it('should return status code 201 upon successful review creation', async () => {
    const response = await request(app).post('/reviews')
      .send({
        product_id: 3,
        rating: 2,
        body: "This product is horrible, definitely not sized properly.",
        recommend: true,
        name: "coolkid7",
        email: "toocool@email.com",
        characteristics: {
            6: 2,
            7: 3,
            8: 1,
            9: 4
        },
        photos: [],
        summary: ""
      })
      .expect(201);
  });

  it('should return status code 400 when incorrect params type passed in', async () => {
    const response = await request(app).post('/reviews', {});
    expect(response.status).toBe(400);
  });
});
