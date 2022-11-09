import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Achievement } from "./Achievement";
import { User } from "./User";

@Entity({ name: 'user_achievement' })
export class UserAchievement {
    constructor(user?: User, achievement?: Achievement, unlocked?: boolean) {
        if(user && achievement && unlocked) {
            this.user = user;
            this.achievement = achievement;
            this.unlocked = unlocked;
        }
    }
    
    @PrimaryGeneratedColumn('increment', {
        name: "usuario_conquista_id"
    })
    userAchievementID?: number;

    @ManyToOne(() => User, (user) => user.achievements, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'cd_usuario'})
    user: User;

    @ManyToOne(() => Achievement, (achievement) => achievement.users, {
        eager: true
    })
    @JoinColumn({name: 'cd_conquista'})
    achievement: Achievement;

    @Column({name: "st_desbloqueada", type: 'boolean', nullable: false, default: false})
    unlocked: boolean;
}