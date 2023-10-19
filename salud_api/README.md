# cocaroad5
2023 Coca Road 5 

## Install
npm install


## Run
npx tsc

node dist/app/index.ts



## TEST API

POST localhost:3000/api/login

BODY

{
    "username":"rome@gmail.com",
    "password":"123456"
}

RESPONSE

{
  "token":"_token_devuelto_"
}


GET localhost:3000/api/users

AUTHORIZATION Bearer Token _token_devuelto_


GET localhost:3000/api/origenes

AUTHORIZATION Bearer Token _token_devuelto_


GET localhost:3000/api/avisos

AUTHORIZATION Bearer Token _token_devuelto_


GET localhost:3000/api/comisiones

AUTHORIZATION Bearer Token _token_devuelto_
