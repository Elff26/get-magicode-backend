import { DataSource } from 'typeorm'

import "reflect-metadata"

import { Classroom } from './src/database/model/Classroom';
import { Alternative } from './src/database/model/Alternative';
import { Category } from './src/database/model/Category';
import { Challenge } from './src/database/model/Challenge';
import { Achievement } from './src/database/model/Achievement';
import { Difficulty } from './src/database/model/Difficulty';
import { Exercise } from './src/database/model/Exercise';
import { Goal } from './src/database/model/Goal';
import { Statistics } from './src/database/model/Statistics';
import { Technology } from './src/database/model/Technology';
import { User } from './src/database/model/User';
import { Tip } from './src/database/model/Tip';
import { UserTechnology } from './src/database/model/UserTechnology';
import { UserAchievement } from './src/database/model/UserAchievement';
import { UserChallenge } from './src/database/model/UserChallenge';
import { Level } from './src/database/model/Level';

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./GetMagiCode.sqlite",
  synchronize: true,
  logging: true,
  entities: [
   Achievement,
   Alternative,
   Category,
   Challenge,
   Classroom,
   Difficulty,
   Exercise,
   Goal,
   Level,
   Statistics,
   Technology,
   Tip,
   User,
   UserChallenge,
   UserTechnology,
   UserAchievement
 ],
  migrations: ['src/database/migrations/*{.ts,.js}']
})

AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((error) => console.log(error))