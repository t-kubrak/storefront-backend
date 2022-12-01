import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let userId: number;
let token: string;
let orderId: number;
let productId: number;

describe('Test  endpoints responses', () => {
    beforeAll(async () => {
        const userResponse = await request.post('/users')
            .send({first_name: 'Jack', last_name: 'Johnson', password: 'test'})
        token = userResponse.body.token;
        userId = userResponse.body.id;

        const productResponse = await request.post('/products/')
            .set('Authorization', 'Bearer ' + token)
            .send({name: 'pencil', 'price': 50, 'category': 'office'})
        productId = productResponse.body.id;
    })

    it('creates the order', async () => {
        const response = await request.post(`/users/${userId}/orders`)
            .set('Authorization', 'Bearer ' + token)

        orderId = response.body.id;

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(Object.keys(response.body)).toContain('id');
        expect(response.body.user_id).toEqual(userId);
        expect(response.body.status).toEqual('current');
    });

    it('adds product to the order', async () => {
        const response = await request.post(`/orders/${orderId}/products`)
            .send({product_id: productId, product_quantity: 3})
            .set('Authorization', 'Bearer ' + token)

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.order_id).toEqual(orderId);
        expect(response.body.product_id).toEqual(productId);
        expect(response.body.product_quantity).toEqual(3);
    });

    it('shows the current orders', async () => {
        const response = await request.get(`/users/${userId}/orders`)
            .set('Authorization', 'Bearer ' + token)

        const bodyProps = Object.keys(response.body[0]);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.length).toBeGreaterThan(0);

        expect(bodyProps).toContain('id');
        expect(bodyProps).toContain('product_id')
        expect(bodyProps).toContain('product_quantity')
        expect(bodyProps).toContain('user_id')
        expect(bodyProps).toContain('status')
    });
});
