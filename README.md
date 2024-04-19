<h1 align="center">Nest.JS Data Transformation Task</h1>

## Description:

The task aims to transform a mongoDB collection provided by restaurant brands, which contained many inconsistencies and errors, into a unified format using the provided Mongoose schema, additionally expanding the dataset with new seed data.

## To run this project

`Step 1` : To use this project must install [Node.js](https://nodejs.org/en/), [Nest.Js](https://nestjs.com/) and [Mongodb](https://www.mongodb.com/try/download/community) Then Download the source code

```
git clone https://github.com/MohamedAlabasy/Data-Transformation.git
```

`Step 2` : Enter the project file then install package

```
npm i
```

`Step 3` : Run server on watch mode :

```
npm run start:dev
```

`Step 4` : Import a [brands.json](https://github.com/MohamedAlabasy/Data-Transformation/blob/main/brands.json) json file to `Restaurant` mongoDB collection named brands

`Step 5` : To run command to generating 10 new brand documents (seed & faker) :

```
npx nestjs-command create:brand
```

`Step 7` : Open [postman](https://www.postman.com/downloads/) and import : [API Collation](https://github.com/MohamedAlabasy/Data-Transformation/blob/main/api-collection.json) You will find it in the project file.

`Step 8` : To start brand data transformation hit `POST` API :

```
http://127.0.0.1:3000/brand/data-transformation
```

`Step 9` : To export transform brands data as `new-brands.json` hit `GET` API :

```
http://127.0.0.1:3000/brand/brans-json-file
```

<hr>

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
