import express, { Request, Response } from 'express'
import {User, UsersStore} from '../models/user'
// @ts-ignore
import jwt from 'jsonwebtoken';

const store = new UsersStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const users = await store.show(req.params.id)
    res.json(users)
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        password: req.body.password,
    }

    try {
        const newUser = await store.create(user)
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json({ err, user })
        return
    }
}

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization!
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (error) {
        res.status(401)
        return
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
}

export default productRoutes