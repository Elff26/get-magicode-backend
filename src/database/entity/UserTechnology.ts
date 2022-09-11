import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Technology } from "./Technology";
import { User } from "./User";

@Entity({ name: 'user_technology' })
export class UserTechnology {
    @PrimaryGeneratedColumn('increment', {
        name: "usuario_tecnologia_id"
    })
    @Index({ unique: true })
    userTechnologyID: string;

    @ManyToOne(() => User, (user) => user.technologies)
    @Column({ type: 'int', name: 'usuario_tecnologia', nullable: true })
    @JoinColumn({name: 'usuario_tecnologia'})
    user: User;

    @ManyToOne(() => Technology, (technology) => technology.users, {
        eager: true
    })
    @Column({ type: 'int', name: 'tecnologia_usuario', nullable: true })
    @JoinColumn({name: 'tecnologia_usuario'})
    technology: Technology;

    @Column({ name: "st_completo", type:'integer', nullable: false, default: false })
    completed: boolean;

    @Column({ name: "st_aprendendo", type:'integer', nullable: false, default: false })
    learning: boolean;
}