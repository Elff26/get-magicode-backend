import { DataSource } from 'typeorm'

import "reflect-metadata"

import { Classroom } from './src/database/entity/Classroom';
import { Alternative } from './src/database/entity/Alternative';
import { Category } from './src/database/entity/Category';
import { Challenge } from './src/database/entity/Challenge';
import { Achievement } from './src/database/entity/Achievement';
import { Difficulty } from './src/database/entity/Difficulty';
import { Exercise } from './src/database/entity/Exercise';
import { Goal } from './src/database/entity/Goal';
import { Statistics } from './src/database/entity/Statistics';
import { Technology } from './src/database/entity/Technology';
import { User } from './src/database/entity/User';
import { Tip } from './src/database/entity/Tip';
import { UserClassroom } from './src/database/entity/UserClassroom';
import { UserTechnology } from './src/database/entity/UserTechnology';
import { UserAchievement } from './src/database/entity/UserAchievement';

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
    Statistics,
    Technology,
    Tip,
    User,
    UserClassroom,
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