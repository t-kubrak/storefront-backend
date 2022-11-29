CREATE TABLE orders_products
(
    id SERIAL PRIMARY KEY,
    product_quantity INTEGER,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id)
);