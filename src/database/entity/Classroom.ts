import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Classroom{

    @PrimaryGeneratedColumn()
    cd_aula: number;

    @Column({type: "varchar", length: 50, nullable: false})
    nm_aula: string

    @Column({type: "varchar", length: 400, nullable: false})
    ds_conteudo: string

    @CreateDateColumn()
    dt_criacao: Date

    @UpdateDateColumn()
    dt_modificacao: Date

    @Column({type: "integer", nullable: false})
    cd_tecnologia: number

    @Column({type: "integer", nullable: false})
    cd_categoria: number
}