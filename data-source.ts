import * as SQLite from 'sqlite3'
import { DataSource } from 'typeorm'
import { User } from './src/database/model/User'
import "reflect-metadata"

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./GetMagiCode.sqlite",
   synchronize: true,
   logging: true,
   entities: [User],
   subscribers: [],
   migrations: [],
})
AppDataSource.initialize()
    .then(() => {
      console.log("Berhasil inilize ")
    })
    .catch((error) => console.log(error))