import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn({ name: "cd_usuario" })
    userID: number;

    @Column({name: "nm_usuario", type: "varchar", length: 100, nullable: false})
    name: string

    @Column({name: "dt_nascimento", type: "date", nullable: false})
    birthday: string

    @Column({name: "ds_email", type: "varchar", length: 100, unique: true, nullable: false})
    email: string

    @Column({name: "nr_telefone", type: "varchar", length: 11, unique: true, nullable: false})
    phone: string

    @Column({name: "ds_senha", type: "varchar", length: 100, nullable: false, select: false})
    password: string

    @Column({name: "nr_vidas", type: "integer", nullable: false, default: 0})
    numberOfLifes: number

    @Column({name: "nr_experiencia", type: "integer", nullable: false, default: 0})
    xp: number

    @CreateDateColumn({ name: "dt_criacao" })
    createdAt: Date

    @Column({name: "cd_meta", type: "integer", nullable: false, default: 0})
    goal: number

    @Column({name: "cd_ranking", type: "integer", nullable: false, default: 0})
    ranking: number

    @Column({name:"cod_alteracao_senha", type:"varchar", nullable:false, default: "" })
    codeChangePassword: string

    @Column({name: "dt_expiracao_senha", type: "date", nullable: true})
    expirationDate: Date
}