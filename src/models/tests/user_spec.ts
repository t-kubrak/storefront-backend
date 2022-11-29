import { User, UsersStore } from '../user';

const store = new UsersStore()

describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an authenicate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await store.create({
            firstName: 'John',
            lastName: 'Sun',
            password: 'pass1',
        });

        expect(result).toEqual(jasmine.objectContaining({
            id: 1,
            first_name: 'John',
            last_name: 'Sun'
        }));
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(
            jasmine.objectContaining({
                id: 1,
                first_name: 'John',
                last_name: 'Sun'
            })
        );
    });

    it('show method should return the correct user', async () => {
        const result = await store.show('1');

        expect(result).toEqual(jasmine.objectContaining({
            id: 1,
            first_name: 'John',
            last_name: 'Sun'
        }));
    });

    it('show method should authenticate the user', async () => {
        const user = {
            firstName: 'John',
            lastName: 'Sun',
            password: 'pass1',
        }

        const result = await store.authenticate(user.firstName, user.lastName, user.password);

        expect(result).toEqual(jasmine.objectContaining({
            id: 1,
            first_name: 'John',
            last_name: 'Sun'
        }));
    });
});