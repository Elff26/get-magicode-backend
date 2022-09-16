import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Challenge } from "./Challenge";

@Entity()
export class Category {

    @PrimaryGeneratedColumn({name: "cd_categoria"})
    categoryID: number;

    @Column({name: "nm_categoria", type: "varchar", length:50, nullable: false})
    name: string;

    @Column({name: "ds_categoria", type: "varchar", length:100, nullable: false})
    description: string;

    @OneToMany(() => Challenge, (challange) => challange.category)
    challanges: Challenge[];
}