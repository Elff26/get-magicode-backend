import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Goal {

    @PrimaryGeneratedColumn()
    cd_meta: number;

    @Column({type: "varchar", length: 10, nullable:false})
    nm_meta: string;

    @Column({type: "integer", nullable:false})
    vl_meta: number;
}