import { 
    Column, 
    Entity, 
    JoinColumn, 
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

    @OneToMany(() => Exercise, (exercise) => exercise.tips)
    @JoinColumn({ name: "cd_exercicio" })
    exercise: Exercise;
}

