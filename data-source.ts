import * as SQLite from 'sqlite3'
import { DataSource } from 'typeorm'
import { User } from './src/database/entity/User'
import "reflect-metadata"
import { Technology } from './src/database/entity/Technology'

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./GetMagiCode.sqlite",
   synchronize: true,
   logging: true,
   entities: [User, Technology],
   migrations: ['src/migrations/*{.ts,.js}']
})
AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((error) => console.log(error))