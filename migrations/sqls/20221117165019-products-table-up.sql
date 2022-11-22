CREATE TABLE products
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(128),
    price    INTEGER,
    category VARCHAR(32)
);