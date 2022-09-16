import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Classroom } from "./Classroom";
import { User } from "./User";

@Entity({ name: 'user_classroom' })
export class UserClassroom {
    @PrimaryGeneratedColumn('increment', {
        name: "usuario_aula_id"
    })
    userClassroomID: string;

    @ManyToOne(() => User, (user) => user.technologies)
    @JoinColumn({name: 'cd_usuario'})
    user: User;

    @ManyToOne(() => Classroom, (classroom) => classroom.users, {
        eager: true
    })
    @JoinColumn({name: 'cd_aula'})
    classroom: Classroom;

    @Column({name: "st_completo", type: 'boolean', nullable: false, default: false})
    completed: boolean;
}