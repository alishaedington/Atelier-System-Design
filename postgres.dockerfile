FROM postgres:latest

RUN mkdir /seed/
# path for ec2 instance
COPY ./*.csv /seed/
# path for local container
# COPY /data/*.csv /seed/

RUN chmod a+rx /seed

COPY /backend/database/reviewsSchema.sql /docker-entrypoint-initdb.d