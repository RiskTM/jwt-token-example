# JWT-token-example

## Description

This is a example implementation for jsonwebtoken (JWT) authentication. Because the focus was on the backend the frontend is really simplistic. This project was build with NodeJS. For the server expressjs was used and postgresql for the database.

This project could be extendend but my focus was on getting to know JWTs.

## Table of Contents
- how to install and run
- `.env` explained
- how to use the project
- Technologies used

## How to Install and run

Before you can install be sure to have nodeJS installed.

```bash
cd /path/to/JWT-token-example/
npm install
```

now change the `.env` file to fit your specification. For help see the next section.

The expiration time can be changed in `/services/createTokens.js`. By default 15m for the accessToken and 7d for the refreshToken are selected.

The DB need to have the table "PG_DB_USER" with two columns username and password. For a refrence look at `init.sql`

``` bash
node server.js # for development use: npm run devStart
```

## `.env` explained

```bash
# postgres settings
PG_HOST="0.0.0.0" 
PG_PORT="5432"
PG_USER="admin"
PG_PASSWORD="admin"
PG_DATABASE="jwt_local_test"
PG_DB_USER="jwt_whitelist" # this is the table for the users

PORT="3000" # the port the server listens to
ROOTPATH="/path/to/repo"

# key for the JWT generation
ACCESS_TOKEN="access_token_key"
REFRESH_TOKEN="refresh_token_key"
```


## How to use the project

The server has 4 main tasks:
- adding a user to the DB
- letting the user login
- generating a new accessToken with the refreshToken
- authenticating the user before allowing access to the API

Routes:
- the route `"/user/addUser` allows to add a user with a password to the DB
- the route `"/login"` needs a body containing a object with username and password. Upon correct calling it verifies if the user successfully logged in upon the success a object is returned containing the tokens 
```js
input = {
        username: "name",
        password: "password"
}

output = {
        accessToken: "token...",
        refreshToken: "token..."
}
```
- the route `"/token"` takes the body `{refreshToken: "token"}` and returns a new accessToken as an object.
- the routes `"/api/.."` need an accessToken given to the post request as a BEARER token additionally the body can contain a refreshToken which will be checked if the accessToken is expired. This will be passed to `middleware.js` which will check if the tokens are valid and if you get access to the api.
```js
headers = {
        'content-type': 'application/json',
        authorization: 'Bearer toke'
}

optional: body = {
        refreshToken = "token"
}
```

## Technologies used
- JavaScript
- NodeJS
- ExpressJS
- bcryptJS
- JWT (jsonwebtoken)
- postgresql
- HTML


<img align="left" alt="JavaScript" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
<img align="left" alt="NodeJS" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" />
<img align="left" alt="ExpressJS" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" />
<img align="left" alt="jwt" width="40px" style="padding-right:10px;" src="https://img.icons8.com/?size=100&id=rHpveptSuwDz&format=png&color=000000" />
<img align="left" alt="postgresql" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain-wordmark.svg" />
<img align="left" alt="HTML" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />

