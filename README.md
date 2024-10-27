To run locally, you need to run the command "docker-compose up --build".

If project starts and Database is empty it will be automatically filled by the test data.

It will start in dev mode. You need .env.development to run the project and .env to run import from Json file.

Also in package.json are commands to run project in satage and prod mode. You will need .env.production and .env.stage files to do it.

To make import from Json file run command "ts-node src/import/importData.ts". Ii will make import data from data.json file in root directory.

You can find examples env files i root directory.

You can register by route auth/register and then login.
