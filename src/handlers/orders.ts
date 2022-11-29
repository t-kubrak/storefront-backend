import express, { Request, Response } from 'express'
import {OrderStore} from '../models/order'

const store = new OrderStore()

const current = async (req: Request, res: Response) => {
    const orders = await store.current(parseInt(req.params.id)!)
    res.json(orders)
}

const productRoutes = (app: express.Application) => {
    app.get('/users/:id/orders', current)
}

export default productRoutes