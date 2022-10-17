import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany, 
    JoinColumn, 
    ManyToOne
} from "typeorm";
import IAchievementProperties from "../../interfaceType/IAchievementProperties";
import { Technology } from "./Technology";

import { UserAchievement } from "./UserAchievement";

@Entity()
export class Achievement {
    constructor(achievement?: IAchievementProperties) {
        if(achievement) {
            this.achievementID = achievement.achievementID;
            this.name = achievement.name;
            this.description = achievement.description;
            this.image = achievement.image;
            this.users = achievement.users;
        }
    }

    @PrimaryGeneratedColumn({ name: "cd_conquista" })
    achievementID: number;

    @Column({name: "nm_conquista", type: "varchar", length: 50, nullable:false})
    name: string;

    @Column({name: "ds_conquista", type: "varchar", length: 100, nullable:false})
    description: string;

    @Column({name: "ds_img_conquista", type: "varchar", length: 500, nullable: false})
    image: string;

    @Column({name: "nr_experiencia", type: "integer", nullable: true})
    xp: number;

    @Column({name: "nr_aulas", type: "integer", nullable: true})
    classroom: number;

    @ManyToOne(()=> Technology, (technology) => technology.technologyID, {eager: true})
    @JoinColumn({name: "cd_tecnologia"})
    technology: Technology;

    @OneToMany(()=> UserAchievement, (userAchievement) => userAchievement.achievement)
    @JoinColumn({name: "cd_conquista"})
    users: UserAchievement[];
} 