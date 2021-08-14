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


create table rating_meta as select product_id, sum(case when rating=1 then 1 end) as "1", sum(case when rating=2 then 1 end) as "2", sum(case when rating=3 then 1 end) as "3", sum(case when rating=4 then 1 end) as "4", sum(case when rating=5 then 1 end) as "5" from reviews group by product_id;

CREATE TABLE recommended_meta AS select product_id, sum(case when recommend='t' then 1 end) as "true", sum(case when recommend='f' then 1 end) as "false" from reviews group by product_id;

CREATE TABLE average AS SELECT characteristic_id, avg(value) FROM characteristic_reviews GROUP BY characteristic_id;

CREATE TABLE characteristic_meta AS SELECT average.avg, average.characteristic_id, characteristics.product_id, characteristics.name FROM average full JOIN characteristics ON average.characteristic_id = characteristics.id;
