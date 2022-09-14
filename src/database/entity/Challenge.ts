import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, UsingJoinColumnIsNotAllowedError } from "typeorm";
import { Category } from "./Category";
import { Difficulty } from "./Difficulty";
import { Technology } from "./Technology";

@Entity()
export class Challenge{
    @PrimaryGeneratedColumn({name:"cd_desafio"})
    challengeID: number;

    @Column({name:"nm_desafio", type: "varchar", length: 100, nullable: false})
    name: string

    @Column({name:"tp_desafio", type: "varchar", length: 20, nullable: false})
    typeChallenge: string

    @CreateDateColumn({name:"dt_criacao"})
    creationDate: Date

    @UpdateDateColumn({name:"dt_atualizacao"})
    updateDate: Date

    @ManyToOne(()=> Technology)
    @Column({name: "cd_tecnologia"})
    technologyID: Technology

    @ManyToOne(()=> Category, {eager: true})
    @Column({name: "cd_categoria"})
    categoryID: Category

    @ManyToOne(()=> Difficulty)
    @Column({name: "cd_dificuldade"})
    difficulty: Difficulty
}