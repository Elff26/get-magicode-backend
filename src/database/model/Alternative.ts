import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import IAlternativeProperties from "../../interfaceType/IAlternativeProperties";

import { Exercise } from "./Exercise";

@Entity()
export class Alternative {
    constructor(alternative?: IAlternativeProperties) {
        if(alternative) {
            this.alternativeID = alternative.alternativeID;
            this.description = alternative.description;
            this.isCorrect = alternative.isCorrect;
            this.exercise = alternative.exercise;
        }
    }

    @PrimaryGeneratedColumn({name: "cd_alternativa"})
    alternativeID: number;

    @Column({name: "ds_alternativa", type: 'varchar', nullable: false, length: 255})
    description: string;

    @Column({name: "st_correta", type: "boolean", nullable: false, default: false})
    isCorrect: boolean;

    @ManyToOne(() => Exercise, (exercise) => exercise.alternatives)
    @JoinColumn({ name: "cd_exercicio" })
    exercise: Exercise;
}