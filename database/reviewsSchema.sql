DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
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

COPY reviews FROM '/Users/alishaedington/work/SDC/SDC_files/reviews.csv' delimiter ',' csv header;

SELECT pg_catalog.setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews)+1);

CREATE TABLE review_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

COPY review_photos FROM '/Users/alishaedington/work/SDC/SDC_files/reviews_photos.csv' delimiter ',' csv header;

SELECT pg_catalog.setval(pg_get_serial_sequence('review_photos', 'id'), (SELECT MAX(id) FROM review_photos)+1);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT
);

COPY characteristics FROM '/Users/alishaedington/work/SDC/SDC_files/characteristics.csv' delimiter ',' csv header;

CREATE TABLE characteristic_reviews (
  id BIGSERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  value INTEGER,
  FOREIGN KEY(review_id) REFERENCES reviews(id),
  FOREIGN KEY(characteristic_id) REFERENCES reviews(id)
);

COPY characteristic_reviews FROM '/Users/alishaedington/work/SDC/SDC_files/characteristic_reviews.csv' delimiter ',' csv header;

SELECT pg_catalog.setval(pg_get_serial_sequence('characteristic_reviews', 'id'), (SELECT MAX(id) FROM characteristic_reviews)+1);

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

select (select json_object_agg(rating, count) as ratings from rating_meta where product_id = 2), (select json_object_agg(recommend, count) as recommended from recommended_meta where product_id = 2), (select json_object_agg(name, characteristics) as characteristics from (select name, id, round(avg, 2) from characteristic_meta where product_id = 2) as characteristics);

-- indexing

CREATE INDEX idx_reviewPhoto_reviewId ON review_photos (review_id);
CREATE INDEX idx_reviews_productId ON reviews (product_id);
CREATE INDEX idx_rating_meta_productId ON rating_meta (product_id);
CREATE INDEX idx_recommend_meta_productId ON recommended_meta (product_id);
CREATE INDEX idx_characteristic_meta_productId ON characteristic_meta (product_id);
CREATE INDEX idx_recMeta_all ON recommended_meta (id, product_id, recommend, count);
CREATE INDEX idx_ratingMeta_all ON rating_meta (id, product_id, rating, count);
CREATE INDEX idx_characteristic_meta_id ON characteristic_meta (id);
