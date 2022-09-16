import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    JoinColumn 
} from "typeorm";

import { UserAchievement } from "./UserAchievement";

@Entity()
export class Achievement {
    @PrimaryGeneratedColumn({ name: "cd_conquista" })
    achievementID: number;

    @Column({name: "nm_conquista", type: "varchar", length: 50, nullable:false})
    name: string;

    @Column({name: "ds_conquista", type: "varchar", length: 100, nullable:false})
    description: string;

    @Column({name: "ds_img_conquista", type: "varchar", length: 500, nullable: false})
    image: string;

    @OneToMany(()=> UserAchievement, (userAchievement) => userAchievement.achievement)
    @JoinColumn({name: "cd_conquista"})
    users: UserAchievement[];
} 