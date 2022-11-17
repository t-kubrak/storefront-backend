CREATE TABLE products
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(128),
    price    NUMERIC(11, 2),
    category VARCHAR(32)
);