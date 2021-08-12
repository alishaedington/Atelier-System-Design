DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary TEXT,
  body TEXT NOT NULL,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT,
  helpfulness INTEGER
);

CREATE TABLE review_photos (
  id INTEGER PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT
);

CREATE TABLE characteristic_reviews (
  id INTEGER PRIMARY KEY,
  review_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  value INTEGER,
  FOREIGN KEY(review_id) REFERENCES reviews(id),
  FOREIGN KEY(characteristic_id) REFERENCES reviews(id)
);

CREATE TABLE recommended_meta (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  "true" INTEGER DEFAULT NULL,
  "false" INTEGER DEFAULT NULL
);

CREATE TABLE rating_meta (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  "1" INTEGER DEFAULT NULL,
  "2" INTEGER DEFAULT NULL,
  "3" INTEGER DEFAULT NULL,
  "4" INTEGER DEFAULT NULL,
  "5" INTEGER DEFAULT NULL
);

