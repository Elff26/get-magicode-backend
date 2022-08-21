import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    cd_usuario: number;

    @Column({type: "varchar", length: 100, nullable:false})
    nm_usuario: string

    @Column({type: "date", nullable:false})
    dt_nascimento: string

    @Column({type: "varchar", length: 100, unique:true, nullable:false})
    ds_email: string

    @Column({type: "varchar", length: 11, unique:true, nullable:false})
    nr_telefone: string

    @Column({type: "varchar", length: 100, nullable:false, select: false})
    ds_senha: string

    @Column({type: "integer", nullable:false})
    nr_vidas: number

    @Column({type: "integer", nullable:false, default: 0})
    nr_experiencia: number

    @CreateDateColumn()
    dt_criacao: Date

    @Column({type: "integer", nullable:false})
    cd_meta: number

    @Column({type: "integer", nullable:false})
    cd_ranking: number
}