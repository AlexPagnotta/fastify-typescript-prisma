# fastify-typescript-prisma
A simple template for a Fastify server with Typescript support, and Prisma.

## ⚠️ WIP 

## Run with docker compose

- Clone project

- Create .env file based on .env.example

- run "docker compose up" (DEVELOP w/DOcker task if using vsCode)

- Enter container and execute "npx prisma migrate dev" to apply initial migration

- Try some calls using the attached postman collection 


## Local

- Clone project

- run "yarn install"

- Create .env file based on .env.example, N.B use "localhost" as DB_HOST for development without docker

- Create DB using credential indicated in the .env file

- run "yarn start:dev" (DEVELOP task if using vsCode)

- execute "npx prisma migrate dev" to apply initial migration

- Try some calls using the attached postman collection 

  

