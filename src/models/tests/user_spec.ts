import { User, UsersStore } from '../user';

const store = new UsersStore()
let user: User;
const PASSWORD: string = 'pass1';

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

    it('should have an delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a user', async () => {
        user = await store.create({
            first_name: 'John',
            last_name: 'Sun',
            password: PASSWORD,
        });

        expect(user).toEqual(jasmine.objectContaining({
            id: user.id!,
            first_name: 'John',
            last_name: 'Sun'
        }));
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct user', async () => {
        const result = await store.show(user.id!);

        expect(result).toEqual(jasmine.objectContaining({
            id: user.id!,
            first_name: 'John',
            last_name: 'Sun'
        }));
    });

    it('show method should authenticate the user', async () => {
        const result = await store.authenticate(user.first_name, user.last_name, PASSWORD);

        expect(result).toEqual(jasmine.objectContaining({
            id: user.id!,
            first_name: 'John',
            last_name: 'Sun'
        }));
    });

    it('delete method should delete the correct user', async () => {
        const result = await store.delete(user.id!);

        expect(result).toEqual(jasmine.objectContaining({
            id: user.id!,
            first_name: 'John',
            last_name: 'Sun'
        }));
    });
});