import express, { Request, Response } from 'express'
import {Product, ProductsStore} from '../models/product'

const store = new ProductsStore()

const index = async (_req: Request, res: Response) => {
    const articles = await store.index()
    res.json(articles)
}

const show = async (req: Request, res: Response) => {
    const article = await store.show(req.body.id)
    res.json(article)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.delete('/products', destroy)
}

export default productRoutes