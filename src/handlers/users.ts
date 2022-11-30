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
    const user = await store.show(parseInt(req.params.id))
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    }

    try {
        const newUser = await store.create(user)
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json({ err, user })
    }
}

export const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization!
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (err) {
        res.status(401)
        if (err instanceof Error) {
            console.log(err.message)
        }

        res.send('Couldn\'t authorize the token')
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
}

export default userRoutes