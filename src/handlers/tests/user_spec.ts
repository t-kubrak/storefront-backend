import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token: string;

describe('Test users endpoints responses', () => {
    it('creates the user', async () => {
        const response = await request.post('/users')
            .send({first_name: 'Jack', last_name: 'Johnson', password: 'test'})
        token = response.body.token;

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(Object.keys(response.body)).toContain('id');
        expect(Object.keys(response.body)).toContain('token');
    });

    it('shows the user', async () => {
        const response = await request.get('/users/1')
            .set('Authorization', 'Bearer ' + token)

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.id).toEqual(1);
    });

    it('shows the user list', async () => {
        const response = await request.get('/users')
            .set('Authorization', 'Bearer ' + token)

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
