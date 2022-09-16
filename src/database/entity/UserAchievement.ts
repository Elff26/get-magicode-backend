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
    @PrimaryGeneratedColumn('increment', {
        name: "usuario_conquista_id"
    })
    userAchievementID: number;

    @ManyToOne(() => User, (user) => user.technologies)
    @JoinColumn({name: 'cd_usuario'})
    user: User;

    @ManyToOne(() => Achievement, (achievement) => achievement.users, {
        eager: true
    })
    @JoinColumn({name: 'cd_conquista'})
    achievement: Achievement;

    @Column({name: "st_completo", type: 'boolean', nullable: false, default: false})
    completed: boolean;
}