import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    JoinColumn, 
    ManyToOne, 
    OneToMany 
} from "typeorm";

import { Alternative } from "./Alternative";
import { Challenge } from "./Challenge";
import { Tip } from "./Tip";

@Entity()
export class Exercise{
    @PrimaryGeneratedColumn({name:"cd_exercicio"})
    exerciseID: number;

    @Column({name:"nm_exercicio", type: "varchar", length: 20, nullable: false})
    name: string;

    @Column({name:"ds_exercicio",type: "varchar", length: 1000, nullable: false})
    description: string;

    @Column({name: "ob_saida_esperada",type: "varchar", length: 200, nullable: false})
    expectedOutput: string;

    @CreateDateColumn({name: "dt_criacao"})
    creationDate: Date;

    @UpdateDateColumn({name:"dt_modificacao"})
    modificationDate: Date;

    @Column({name: "tipo", type: "varchar", length: 20 })
    type: string;

    @ManyToOne(()=> Challenge, (challange) => challange.exercises)
    @JoinColumn({name:"cd_desafio"})
    challenge: Challenge;

    @OneToMany(() => Tip, (tip) => tip.exercise, {eager: true})
    @JoinColumn({ name: "cd_exercicio" })
    tips: Tip[];

    @OneToMany(() => Alternative, (Alternative) => Alternative.exercise, {eager: true})
    @JoinColumn({ name: "cd_exercicio" })
    alternatives: Alternative[];
}