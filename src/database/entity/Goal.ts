import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";

@Entity()
export class Goal {

    @PrimaryGeneratedColumn({name: "cd_meta"})
    goalID: number;

    @Column({name:"nm_meta",type: "varchar", length: 10, nullable:false})
    name: string;

    @Column({name: "vl_meta", type: "integer", nullable:false})
    value?: number;
}