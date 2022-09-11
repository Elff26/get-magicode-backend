import { DataSource } from 'typeorm'
import { User } from './src/database/entity/User'
import "reflect-metadata"
import { Technology } from './src/database/entity/Technology'
import { Goal } from './src/database/entity/Goal'
import { UserTechnology } from './src/database/entity/UserTechnology'

export const AppDataSource = new DataSource({
   type: "sqlite",
   database: "./GetMagiCode.sqlite",
   synchronize: true,
   logging: true,
   entities: [User, Technology, Goal, UserTechnology],
   migrations: ['src/migrations/*{.ts,.js}']
})
AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((error) => console.log(error))