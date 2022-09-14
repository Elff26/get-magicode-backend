import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Challenge } from "./Challenge";

@Entity()
export class Exercise{
    @PrimaryGeneratedColumn({name:"cd_exercicio"})
    exerciseID: number;

    @Column({name:"nm_exericio", type: "varchar", length: 20, nullable: false})
    name: string

    @Column({name:"ds_exercicio",type: "varchar", length: 400, nullable: false})
    description: string

    @Column({name: "ob_saida_esperada",type: "varchar", length: 100, nullable: false})
    expectedExit: string

    @Column({name: "ds_dificuldade",type: "varchar", length: 10, nullable: false})
    descriptionDifficult: string

    @CreateDateColumn({name: "dt_criacao"})
    creationDate: Date

    @UpdateDateColumn({name:"dt_modificacao"})
    modificationDate: Date

    @ManyToOne(()=> Challenge, {eager: true})
    @JoinColumn({name:"cd_desafio"})
    challengeID: Challenge

    @Column({name: "tipo", type: "varchar" })
    type: string
}