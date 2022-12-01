# storefront-backend

This project is part of the
[Full Stack JavaSript Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067)
program by Udacity. It provides an api to manage products, 
customers and orders in an online store. 

## Usage

1. `.env` file shouldn't be added to the repo. Hence, please create `.env` file locally and have a look at the variables
    used in my file locally as an example:   
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=dev
POSTGRES_PASSWORD=dev

BCRYPT_PASSWORD=sec-pass
TOKEN_SECRET=token-secret
SALT_ROUNDS=10

ENV=test
   ```
4. Set up the postgresql db. I've used the docker-compose file provided to set it up.\
   If you have docker and docker-compose installed, just run the following command: `docker-compose up -d`\
   It will download and install postgresql image. It's going to use the env variables from `.env` file to set it up\
   The db was running locally on port 5432 and backed on port 3000
5. Note: please change the `ENV` variable to `test` in the `.env` file to run the tests or set it to `dev` to\
   see it live. The `ENV=test` in the `test` command in the `package.json` doesn't work.
6. `npm install` to install the packages
7. `db-migrate up` to run db migrations
8. `npm build && npm start` to build and run the server
9. `npm run test` to run the tests