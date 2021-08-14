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
  reported BOOLEAN,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT,
  helpfulness INTEGER
);

COPY reviews FROM '/Users/alishaedington/work/SDC/SDC_files/reviews.csv' delimiter ',' csv header;

CREATE TABLE review_photos (
  id INTEGER PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT,
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

COPY review_photos FROM '/Users/alishaedington/work/SDC/SDC_files/reviews_photos.csv' delimiter ',' csv header;

CREATE TABLE characteristics (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT
);

COPY characteristics FROM '/Users/alishaedington/work/SDC/SDC_files/characteristics.csv' delimiter ',' csv header;

CREATE TABLE characteristic_reviews (
  id INTEGER PRIMARY KEY,
  review_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  value INTEGER,
  FOREIGN KEY(review_id) REFERENCES reviews(id),
  FOREIGN KEY(characteristic_id) REFERENCES reviews(id)
);

COPY characteristic_reviews FROM '/Users/alishaedington/work/SDC/SDC_files/characteristic_reviews.csv' delimiter ',' csv header;

create table rating_meta as select product_id, rating, count(rating) from reviews group by product_id, rating;

create table recommended_meta as select product_id, recommend, count(recommend) from reviews group by product_id, recommend;

CREATE TABLE average AS SELECT characteristic_id, avg(value) FROM characteristic_reviews GROUP BY characteristic_id;

CREATE TABLE characteristic_meta AS SELECT average.avg, average.characteristic_id, characteristics.product_id, characteristics.name FROM average full JOIN characteristics ON average.characteristic_id = characteristics.id;

select json_object_agg(name, characteristics) as characteristics from (select name, characteristic_id, round(avg, 2) from characteristic_meta where product_id = 2) as characteristics;

select json_object_agg(rating, count) as ratings from rating_meta where product_id = 2;

select json_object_agg(recommend, count) as recommended from recommended_meta where product_id = 2;

select (select json_object_agg(rating, count) as ratings from rating_meta where product_id = 2), (select json_object_agg(recommend, count) as recommended from recommended_meta where product_id = 2), (select json_object_agg(name, characteristics) as characteristics from (select name, characteristic_id, round(avg, 2) from characteristic_meta where product_id = 2) as characteristics);