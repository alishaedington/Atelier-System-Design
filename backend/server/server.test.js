/* eslint-disable */
const express = require('express');
const request = require('supertest');
const app = require('./server');

describe('GET /reviews', () => {
  it('should return an object with an array of nested review objects when getting reviews for a specific product', async ()=>{
    const response = await request(app).get('/reviews?product_id=1');
    expect(typeof response.body).toBe('object');
    expect(Array.isArray(response.body.results)).toBe(true);
    expect(typeof response.body.results[0]).toBe('object');
  });

  it('should return specified amount of reviews', async ()=>{
    const response = await request(app).get('/reviews?product_id=1&count=1');
    expect(response.body.results).toHaveLength(1);
  });

  it('each review should have a photos array', async ()=>{
    const response = await request(app).get('/reviews?product_id=1');
    expect(Array.isArray(response.body.results[0].photos)).toBe(true);
  });

  it('should return status code 200', async ()=>{
    const response = await request(app).get('/reviews?product_id=1');
    expect(response.status).toBe(200);
  });

  it('should return status code 400 when incorrect params are passed in', async ()=>{
    const response = await request(app).get('/reviews?product_id=a');
    expect(response.status).toBe(400);
  });
});

describe('GET /reviews/meta', () => {
  it('should return an object', async ()=>{
    const response = await request(app).get('/reviews/meta?product_id=1');
    expect(typeof response.body).toBe('object');
  });

  it('should have the correct format', async ()=>{
    const response = await request(app).get('/reviews/meta?product_id=1');
    expect(typeof response.body.ratings).toBe('object');
    expect(typeof response.body.recommended).toBe('object');
    expect(typeof response.body.characteristics).toBe('object');
  });

  it('should return status code 200', async ()=>{
    const response = await request(app).get('/reviews/meta?product_id=1');
    expect(response.status).toBe(200);
  });

  it('should return status code 400 when incorrect params type passed in', async ()=>{
    const response = await request(app).get('/reviews/meta?product_id=a');
    expect(response.status).toBe(400);
  });
});
