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
export class Tip {
    @PrimaryGeneratedColumn({name: "cd_dica"})
    tipID: number;

    @Column({name: "ds_dica", type: "varchar", length:100, nullable: false})
    tipDescrioption: string;

    @ManyToOne(() => Exercise, (exercise) => exercise.tips)
    @JoinColumn({ name: "cd_exercicio" })
    exercise: Exercise;
}

