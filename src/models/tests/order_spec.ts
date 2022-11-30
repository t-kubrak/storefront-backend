import { OrderStore } from '../order';
import {User, UsersStore} from '../user';
import {Product, ProductsStore} from "../product";
// @ts-ignore
import Client from "../../database";

const store = new OrderStore()
const userStore = new UsersStore()
const productStore = new ProductsStore()
let user: User;
let product: Product;
let orderId: number;

describe("Product Model", () => {
    it('should have an current method', () => {
        expect(store.current).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });

    beforeAll(async () => {
        user = await userStore.create({
            first_name: 'Jane',
            last_name: 'Ant',
            password: 'pass1',
        });

        expect(user).toEqual(jasmine.objectContaining({
            first_name: 'Jane',
            last_name: 'Ant'
        }));

        product = await productStore.create({
            name: 'lamp',
            price: 100,
            category: 'electronics',
        });

        expect(product).toEqual(jasmine.objectContaining({
            name: 'lamp',
            price: 100,
            category: 'electronics',
        }));
    })

    it('create method should add an order', async () => {
        const result = await store.create(user.id!);
        orderId = result.id!

        expect(result).toEqual(jasmine.objectContaining({
            user_id: user.id!,
            status: 'current'
        }));
    });

    it('create method should add product to the order', async () => {
        const result = await store.addProduct(2, orderId, product.id!);

        expect(result).toEqual(jasmine.objectContaining({
            order_id: orderId,
            product_id: product.id!,
            product_quantity: 2
        }));
    });

    it('current method should return the current user\'s order', async () => {
        const result = await store.current(user.id!);

        expect(result[0]).toEqual(jasmine.objectContaining({
            product_id: product.id!,
            product_quantity: 2,
            user_id: user.id!,
            status: 'current'
        }));
    });
});