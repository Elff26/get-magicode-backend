import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import ITipProperties from "../../interfaceType/ITipProperties";

import { Exercise } from "./Exercise";

@Entity()
export class Tip {
    constructor(tip?: ITipProperties){
        if(tip) {
            this.tipID = tip.tipID;
            this.description = tip.description;
            this.exercise = tip.exercise;
        }
    }

    @PrimaryGeneratedColumn({name: "cd_dica"})
    tipID: number;

    @Column({name: "ds_dica", type: "varchar", length:100, nullable: false})
    description: string;

    @ManyToOne(() => Exercise, (exercise) => exercise.tips)
    @JoinColumn({name: "cd_exercicio"})
    exercise: Exercise;
}

