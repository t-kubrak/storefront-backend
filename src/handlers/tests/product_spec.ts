import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let productId: number;

describe('Test endpoint responses', () => {
    it('creates the product', async () => {
        const response = await request.post('/products/')
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

        expect(response.status).toBe(200);
        expect(response.body).toHaveSize(1);
        expect(response.body[0].id).toEqual(productId);
        expect(response.body[0].name).toEqual('pencil');
        expect(response.body[0].price).toEqual(50);
        expect(response.body[0].category).toEqual('office');
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
