import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Exercise } from "./Exercise";

@Entity()
export class Alternative {
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