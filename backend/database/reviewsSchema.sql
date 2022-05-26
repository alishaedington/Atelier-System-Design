DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary TEXT,
  body TEXT NOT NULL,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT false,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT,
  helpfulness INTEGER
);

CREATE TABLE review_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT
);


CREATE TABLE characteristic_reviews (
  id BIGSERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  value INTEGER,
  FOREIGN KEY(review_id) REFERENCES reviews(id),
  FOREIGN KEY(characteristic_id) REFERENCES reviews(id)
);

-- copying from csv files (local location) --
COPY reviews FROM '/Users/alishaedington/projects/Atelier-System-Design/seed/reviews_seed.csv' delimiter ',' csv header;
COPY review_photos FROM '/Users/alishaedington/projects/Atelier-System-Design/seed/review_photos_seed.csv' delimiter ',' csv header;
COPY characteristics FROM '/Users/alishaedington/projects/Atelier-System-Design/seed/characteristic_seed.csv' delimiter ',' csv header;
COPY characteristic_reviews FROM '/Users/alishaedington/projects/Atelier-System-Design/seed/characteristic_reviews_seed.csv' delimiter ',' csv header;

-- resetting the serialization for imported tables --
SELECT pg_catalog.setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('review_photos', 'id'), (SELECT MAX(id) FROM review_photos)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('characteristic_reviews', 'id'), (SELECT MAX(id) FROM characteristic_reviews)+1);

-- creating meta data tables for quicker querying --
create table rating_meta as select product_id, rating, count(rating) from reviews group by product_id, rating;
alter table rating_meta add column id serial primary key;

create table recommended_meta as select product_id, recommend, count(recommend) from reviews group by product_id, recommend;
alter table recommended_meta add column id serial primary key;

CREATE TABLE characteristic_meta AS (
  SELECT characteristics.product_id, characteristics.name, characteristics.id, avg(characteristic_reviews.value), count(characteristic_reviews.value)
  FROM characteristics, characteristic_reviews
  WHERE characteristic_reviews.characteristic_id = characteristics.id
  GROUP BY characteristics.product_id, characteristics.name, characteristics.id
);

-- indexing tables for faster lookup --

CREATE INDEX idx_reviewPhoto_reviewId ON review_photos (review_id);

CREATE INDEX idx_recommend_meta_productId ON recommended_meta (product_id);
CREATE INDEX idx_recMeta_all ON recommended_meta (id, product_id, recommend, count);

CREATE INDEX idx_ratingMeta_all ON rating_meta (id, product_id, rating, count);
CREATE INDEX idx_rating_meta_productId ON rating_meta (product_id);

CREATE INDEX idx_characteristics_productId ON characteristics (product_id);

CREATE INDEX idx_characteristic_reviews_charId ON characteristic_reviews (characteristic_id);
CREATE INDEX idx_characteristic_reviews_reviewId ON characteristic_reviews (review_id);

CREATE INDEX idx_characteristic_meta_productId ON characteristic_meta (product_id);
CREATE INDEX idx_characteristic_meta_id ON characteristic_meta (id);

CREATE INDEX idx_review_id ON reviews (id);
CREATE INDEX idx_reviews_productId ON reviews (product_id);
CREATE INDEX idx_reviews_all ON reviews (reported, helpfulness, date);