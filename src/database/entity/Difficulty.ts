import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Challenge } from "./Challenge";

@Entity()
export class Difficulty{
    @PrimaryGeneratedColumn({name:"cd_dificuldade"})
    difficultyID: number;

    @Column({name:"ds_dificuldade", type: "varchar", length: 20, nullable: false})
    description: string;

    @Column({name:"vl_xp", type: "integer", nullable: false})
    valueXP: number;

    @OneToMany(() => Challenge, (challange) => challange.difficulty)
    challanges: Challenge[];
}