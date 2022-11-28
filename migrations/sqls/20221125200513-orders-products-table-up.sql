CREATE TABLE orders_products
(
    id SERIAL PRIMARY KEY,
    product_quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);