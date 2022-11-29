// @ts-ignore
import Client from '../database'
// @ts-ignore
import bcrypt from 'bcrypt';
import {Product} from "./product";

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UsersStore {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            console.log(result.rows)
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql: string = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'

            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUNDS!;
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const result = await conn.query(sql, [u.firstName, u.lastName, hash])
            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`unable create user (${u.firstName} ${u.lastName}): ${err}`)
        }
    }

    async authenticate(firstName: string, lastName: string, password: string): Promise<User | null> {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users WHERE (first_name=$1) AND (last_name=($2)) '

        const result = await conn.query(sql, [firstName, lastName])

        const pepper = process.env.BCRYPT_PASSWORD;

        if (result.rows.length) {
            const user = result.rows[0]

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user
            }
        }

        return null
    }
}