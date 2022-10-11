import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Technology } from "./Technology";
import { User } from "./User";

@Entity({ name: 'user_technology' })
export class UserTechnology {
    constructor(technology?: Technology, user?: User, learning?: boolean, completed?: boolean, userTechnologyID?: string) {
        if(technology && user && learning && completed && userTechnologyID) {
            this.userTechnologyID = userTechnologyID
            this.technology = technology;
            this.user = user;
            this.learning = learning;
            this.completed = completed;
        }
    }

    @PrimaryGeneratedColumn('increment', {
        name: "usuario_tecnologia_id"
    })
    userTechnologyID: string;

    @ManyToOne(() => User, (user) => user.technologies)
    @JoinColumn({name: 'cd_usuario'})
    user: User;

    @ManyToOne(() => Technology, (technology) => technology.users, {
        eager: true
    })
    @JoinColumn({name: 'cd_tecnologia'})
    technology: Technology;

    @Column({name: "st_completo", type: 'boolean', nullable: false, default: false})
    completed: boolean;

    @Column({name: "st_aprendendo", type: 'boolean', nullable: false, default: false})
    learning: boolean;
}