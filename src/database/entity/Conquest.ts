import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conquest {
    @PrimaryGeneratedColumn()
    cd_conquista: number

    @Column({type: "varchar", length: 50, nullable:false})
    nm_conquista: string

    @Column({type: "varchar", length: 100, nullable:false})
    ds_conquista: string
} 