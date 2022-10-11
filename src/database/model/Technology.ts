import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    JoinColumn 
} from "typeorm";
import ITechnologyProperties from "../../interfaceType/ITechnologyProperties";

import { UserTechnology } from "./UserTechnology";

@Entity()
export class Technology{
    constructor(technology: ITechnologyProperties) {
        if(technology) {
            this.technologyID = technology.technologyID;
            this.name = technology.name;
            this.imageUrl = technology.imageUrl;
            this.users = technology.users;
        }
    }

    @PrimaryGeneratedColumn({ name: "cd_tecnologia" })
    technologyID: number;

    @Column({name: "nm_tecnologia", type: "varchar", length: 50, nullable: false})
    name: string;

    @Column({name: "ds_url_imagem", type: "varchar", length: 500, nullable: false})
    imageUrl: string;

    @OneToMany(() => UserTechnology, (userTechnology) => userTechnology.technology)
    @JoinColumn({ name: 'cd_tecnologia' })
    users?: UserTechnology[];
}