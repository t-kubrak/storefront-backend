CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    first_name VARCHAR(128),
    last_name  VARCHAR(128),
    password   VARCHAR
);