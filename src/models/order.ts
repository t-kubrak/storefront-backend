// @ts-ignore
import Client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export type OrderProduct = {
    id?: number;
    product_quantity: number;
    order_id: number;
    product_id: number;
}

export type CurrentOder = {
    id?: number;
    product_id: number;
    product_quantity: number;
    user_id: number;
    status: string
}

export class OrderStore {
    async current(userId: number): Promise<CurrentOder> {
        try {
            const sql = 'SELECT o.id, op.product_id, op.product_quantity, o.user_id, o.status' +
                ' FROM orders o JOIN orders_products op ON o.id = op.order_id WHERE o.user_id=($1) and o.status = \'current\'';
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [userId])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not find order with user id: ${userId}. Error: ${err}`)
        }
    }

    async create(userId: number): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [userId, 'current'])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add new order for user id: ${userId}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: number, productId: number): Promise<OrderProduct> {
        try {
            const sql = 'INSERT INTO orders_products (product_quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}