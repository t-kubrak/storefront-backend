# storefront-backend

This project is part of the
[Full Stack JavaSript Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067)
program by Udacity. It provides an api to manage products, 
customers and orders in an online store. 

## Usage

1. Since `.env` file shouldn't be added to the repo, please rename the provided `.env.dev` file to `.env` as an example.
2. Set up the postgresql db. I've used the docker-compose file provided to set it up.\
   If you have docker and docker-compose installed, just run the following command: `docker-compose up -d`\
   It will download and install postgresql image. It's going to use the env variables from `.env` file to set it up\
   The db was running locally on port 5432 and backed on port 3000
3. Note: please change the `ENV` variable to `test` in the `.env` file to run the tests ot set it to `dev` to\
   do see it live. The `ENV=test` in the `test` command in the `package.json` doesn't work.
4. `npm install` to install the packages
5. `db-migrate up` to run db migrations
6. `npm build && npm start` to build and run the server
7. `npm run test` to run the tests