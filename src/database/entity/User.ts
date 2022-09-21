import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    ManyToOne, 
    JoinColumn, 
    OneToMany, 
    OneToOne 
} from "typeorm";

import { Goal } from "./Goal";
import { Statistics } from "./Statistics";
import { UserAchievement } from "./UserAchievement";
import { UserChallenge } from "./UserChallenge";
import { UserTechnology } from "./UserTechnology";

@Entity()
export class User {
    @PrimaryGeneratedColumn({name: "cd_usuario"})
    userID: number;

    @Column({name: "nm_usuario", type: "varchar", length: 100, nullable: false})
    name: string;

    @Column({name: "dt_nascimento", type: "date", nullable: false})
    birthday: string;

    @Column({name: "ds_email", type: "varchar", length: 100, unique: true, nullable: false})
    email: string;

    @Column({name: "ds_img_usuario", type: "varchar", length: 500, nullable: true})
    image: string;

    @Column({name: "nr_telefone", type: "varchar", length: 11, unique: true, nullable: false})
    phone: string;

    @Column({name: "ds_senha", type: "varchar", length: 100, nullable: false, select: false})
    password: string;

    @Column({name: "nr_vidas", type: "integer", nullable: false, default: 0})
    numberOfLifes: number;

    @CreateDateColumn({name: "dt_criacao"})
    createdAt: Date;

    @Column({name:"cod_alteracao_senha", type:"varchar", nullable:false, default: "", length: 4 })
    codeChangePassword: string;

    @Column({name: "dt_expiracao_senha", type: "date", nullable: true})
    expirationDate: Date;

    @ManyToOne(() => Goal,{eager: true})
    @JoinColumn({name: "cd_meta"})
    goal: Goal;

    @OneToOne(() => Statistics,{eager: true})
    @JoinColumn({name: "cd_estatistica"})
    statistics: Statistics;

    @OneToMany(() => UserTechnology, (userTechnology) => userTechnology.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: "cd_usuario"})
    technologies: UserTechnology[];

    @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: "cd_usuario"})
    challenges: UserChallenge[];

    @OneToMany(() => UserAchievement, (userAchievement) => userAchievement.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: "cd_usuario"})
    achievements: UserAchievement[];
}