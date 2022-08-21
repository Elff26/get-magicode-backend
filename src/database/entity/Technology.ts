import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Technology{

    @PrimaryGeneratedColumn()
    cd_tecnologia: number;

    @Column({type: "varchar", length: 60, nullable: false})
    nm_tecnologia: string

    @Column({type: "integer"})
    cd_usuario: number
}