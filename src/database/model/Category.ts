import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import ICategoryProperty from "../../interfaceType/ICategoryProperty";

import { Challenge } from "./Challenge";

@Entity()
export class Category {
    constructor(category?: ICategoryProperty) {
        if(category) {
            this.categoryID = category.categoryID
            this.name = category.name
            this.description = category.description
        }
    }

    @PrimaryGeneratedColumn({name: "cd_categoria"})
    categoryID: number;

    @Column({name: "nm_categoria", type: "varchar", length:50, nullable: false})
    name: string;

    @Column({name: "ds_categoria", type: "varchar", length:100, nullable: false})
    description: string;

    @OneToMany(() => Challenge, (challange) => challange.category)
    challanges: Challenge[];
}