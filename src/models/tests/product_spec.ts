import { Product, ProductsStore } from '../product';

const store = new ProductsStore()
let product: Product;

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        product = await store.create({
            name: 'Laptop',
            price: 1500,
            category: 'electronics',
        });

        expect(product).toEqual({
            id: product.id!,
            name: 'Laptop',
            price: 1500,
            category: 'electronics',
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(product.id!);
        expect(result).toEqual({
            id: product.id!,
            name: 'Laptop',
            price: 1500,
            category: 'electronics',
        });
    });

    it('update method should update a product', async () => {
        const result = await store.update({
            id: product.id!,
            name: 'flower',
            price: 15,
            category: 'garden',
        });

        expect(result).toEqual({
            id: product.id!,
            name: 'flower',
            price: 15,
            category: 'garden',
        });
    });

    it('delete method should remove the product', async () => {
        const result = await store.delete(product.id!);

        expect(result).toEqual({
            id: product.id!,
            name: 'flower',
            price: 15,
            category: 'garden',
        });
    });
});