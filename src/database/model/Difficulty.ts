import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import IDifficultyProperties from "../../interfaceType/IDifficultyProperties";

import { Challenge } from "./Challenge";

@Entity()
export class Difficulty{
    constructor(difficulty?: IDifficultyProperties){
        if(difficulty) {
            this.difficultyID = difficulty.difficultyID;
            this.description = difficulty.description;
            this.valueXP = difficulty.valueXP;
        }
    }

    @PrimaryGeneratedColumn({name:"cd_dificuldade"})
    difficultyID: number;

    @Column({name:"ds_dificuldade", type: "varchar", length: 20, nullable: false})
    description: string;

    @Column({name:"vl_xp", type: "integer", nullable: false})
    valueXP: number;

    @OneToMany(() => Challenge, (challange) => challange.difficulty)
    challanges: Challenge[];
}