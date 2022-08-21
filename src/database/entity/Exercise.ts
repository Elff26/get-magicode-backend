import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Exercise{

    @PrimaryGeneratedColumn()
    cd_exercicio: number;

    @Column({type: "varchar", length: 20, nullable: false})
    nm_exericio: string

    @Column({type: "varchar", length: 400, nullable: false})
    ds_exercicio: string

    @Column({type: "varchar", length: 100, nullable: false})
    ob_saida_esperada: string

    @Column({type: "varchar", length: 10, nullable: false})
    ds_dificuldade: string

    @CreateDateColumn()
    dt_criacao: Date

    @UpdateDateColumn()
    dt_modificacao: Date

    @Column({type: "integer", nullable: false})
    cd_aula: number
}