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

<svg align="left" alt="jwt" width="80px" height="40px" viewBox="0 0 400 201" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Group" sketch:type="MSLayerGroup">
            <rect id="Rectangle-path" fill="#000000" sketch:type="MSShapeGroup" x="0" y="0.5" width="400" height="200"/>
            <g transform="translate(50.000000, 50.000000)" id="Shape" sketch:type="MSShapeGroup">
                <g>
                    <path d="M57.8,27.2 L57.7,0.3 L42.7,0.3 L42.8,27.2 L50.3,37.5 L57.8,27.2 Z" fill="#FFFFFF"/>
                    <path d="M42.8,73.3 L42.8,100.3 L57.8,100.3 L57.8,73.3 L50.3,63 L42.8,73.3 Z" fill="#FFFFFF"/>
                    <path d="M57.8,73.3 L73.6,95.1 L85.7,86.3 L69.9,64.5 L57.8,60.6 L57.8,73.3 Z" fill="#00F2E6"/>
                    <path d="M42.8,27.2 L26.9,5.4 L14.8,14.2 L30.6,36 L42.8,39.9 L42.8,27.2 Z" fill="#00F2E6"/>
                    <path d="M30.6,36 L5,27.7 L0.4,41.9 L26,50.3 L38.1,46.3 L30.6,36 Z" fill="#00B9F1"/>
                    <path d="M62.4,54.2 L69.9,64.5 L95.5,72.8 L100.1,58.6 L74.5,50.3 L62.4,54.2 Z" fill="#00B9F1"/>
                    <path d="M74.5,50.3 L100.1,41.9 L95.5,27.7 L69.9,36 L62.4,46.3 L74.5,50.3 Z" fill="#D63AFF"/>
                    <path d="M26,50.3 L0.4,58.6 L5,72.8 L30.6,64.5 L38.1,54.2 L26,50.3 Z" fill="#D63AFF"/>
                    <path d="M30.6,64.5 L14.8,86.3 L26.9,95.1 L42.8,73.3 L42.8,60.6 L30.6,64.5 Z" fill="#FB015B"/>
                    <path d="M69.9,36 L85.7,14.2 L73.6,5.4 L57.8,27.2 L57.8,39.9 L69.9,36 Z" fill="#FB015B"/>
                </g>
                <path d="M156.1,25.8 L156.1,60.8 C156.1,68.5 149.8,74.8 142.1,74.8 L142.1,67.8 C146,67.8 149.1,64.7 149.1,60.8 L149.1,25.8 L156.1,25.8 L156.1,25.8 Z M283.9,32.8 L299.7,32.8 L299.7,25.8 L261.2,25.8 L261.2,32.8 L276.9,32.8 L276.9,74.8 L283.9,74.8 L283.9,32.8 L283.9,32.8 Z M240.1,25.8 L240.1,60.8 C240.1,64.7 237,67.8 233.1,67.8 C229.2,67.8 226.1,64.7 226.1,60.8 L226.1,39.8 C226.1,32.1 219.8,25.8 212.1,25.8 C204.4,25.8 198.1,32.1 198.1,39.8 L198.1,60.8 C198.1,64.7 195,67.8 191.1,67.8 C187.2,67.8 184.1,64.7 184.1,60.8 L184.1,25.8 L177.1,25.8 L177.1,60.8 C177.1,68.5 183.4,74.8 191.1,74.8 C198.8,74.8 205.1,68.5 205.1,60.8 L205.1,39.8 C205.1,35.9 208.2,32.8 212.1,32.8 C216,32.8 219.1,35.9 219.1,39.8 L219.1,39.8 L219.1,60.8 C219.1,68.5 225.4,74.8 233.1,74.8 C240.8,74.8 247.1,68.5 247.1,60.8 L247.1,25.8 L240.1,25.8 L240.1,25.8 Z" fill="#FFFFFF"/>
            </g>
        </g>
    </g>
</svg>
<img align="left" alt="postgresql" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain-wordmark.svg" />
<img align="left" alt="HTML" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />

