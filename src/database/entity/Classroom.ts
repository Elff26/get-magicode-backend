import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Technology } from "./Technology";

@Entity()
export class Classroom{
    @PrimaryGeneratedColumn()
    classroomID: number;

    @Column({name:"nm_aula",type: "varchar", length: 50, nullable: false})
    name: string

    //TODO: Mudar type para jsonb em ambiente de PROD
    @Column({name:"ds_conteudo",type: "varchar", nullable: false})
    description: string

    @CreateDateColumn({name: "dt_criacao"})
    creationDate: Date

    @UpdateDateColumn({name:"dt_modificacao"})
    modificationDate: Date

    @ManyToOne(()=> Technology, {eager: true})
    @JoinColumn({name:"cd_tecnologia"})
    technologyCode: Technology

    @Column({name: "cd_categoria",type: "integer", nullable: false})
    categoryCode: number
}