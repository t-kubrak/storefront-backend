import express, { Request, Response } from 'express'
import {OrderStore} from '../models/order'
import {verifyAuthToken} from "./users";
// @ts-ignore
import jwt from 'jsonwebtoken';

const store = new OrderStore()

const current = async (req: Request, res: Response) => {
    const orders = await store.current(parseInt(req.params.id)!)
    res.json(orders)
}

const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization!
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(decoded)

        const order = await store.create(decoded.user.id!)
        res.json(order)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const order = await store.addProduct(
            req.body.product_quantity,
            parseInt(req.params.id),
            parseInt(req.body.product_id)
        )

        res.json(order)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/users/:id/orders', verifyAuthToken, current)
    app.post('/users/:id/orders', verifyAuthToken, create)
    app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default orderRoutes