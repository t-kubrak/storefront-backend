import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let productId: number;
let token: string;

describe('Test products endpoints responses', () => {
    beforeAll(async () => {
        const response = await request.post('/users')
            .send({first_name: 'Jack', last_name: 'Johnson', password: 'test'})
        token = response.body.token;
    })

    it('creates the product', async () => {
        const response = await request.post('/products/')
            .set('Authorization', 'Bearer ' + token)
            .send({name: 'pencil', 'price': 50, 'category': 'office'})
        productId = response.body.id;

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.name).toEqual('pencil');
        expect(response.body.price).toEqual(50);
        expect(response.body.category).toEqual('office');
    });

    it('gets the available products', async () => {
        const response = await request.get('/products/');

        const bodyProps = Object.keys(response.body[0]);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(bodyProps).toContain('id');
        expect(bodyProps).toContain('name');
        expect(bodyProps).toContain('price');
        expect(bodyProps).toContain('category');
    });

    it('shows the product', async () => {
        const response = await request.get('/products/' + productId);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.id).toEqual(productId);
        expect(response.body.name).toEqual('pencil');
        expect(response.body.price).toEqual(50);
        expect(response.body.category).toEqual('office');
    });

    it('deletes the product', async () => {
        const response = await request.delete('/products/' + productId);

        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.id).toEqual(productId);
        expect(response.body.name).toEqual('pencil');
        expect(response.body.price).toEqual(50);
        expect(response.body.category).toEqual('office');
    });
});
