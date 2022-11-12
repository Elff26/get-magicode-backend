import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    ManyToOne, 
    JoinColumn, 
    OneToMany, 
    OneToOne, 
    UpdateDateColumn
} from "typeorm";
import IUserProperties from "../../interfaceType/IUserProperties";

import { Goal } from "./Goal";
import { Statistics } from "./Statistics";
import { UserAchievement } from "./UserAchievement";
import { UserChallenge } from "./UserChallenge";
import { UserTechnology } from "./UserTechnology";

@Entity()
export class User {
    constructor(user?: IUserProperties){
        if(user) {
            this.userID = user.userID;
            this.name = user.name;
            this.birthday = user.birthday;
            this.email = user.email;
            this.phone = user.phone;
            this.password = user.password;
            this.numberOfLifes = user.numberOfLifes;
            this.lastUpdateNumberOfLifes = user.lastUpdateNumberOfLifes;
            this.createdAt = user.createdAt;
            this.codeChangePassword = user.codeChangePassword;
            this.expirationDate = user.expirationDate;
            this.goal = user.goal;
            this.technologies = user.technologies;
            this.statistics = user.statistics;
            this.externalID = user.externalID;
            this.externalToken = user.externalToken;
        }
    }

    @PrimaryGeneratedColumn({name: "cd_usuario"})
    userID?: number;

    @Column({name: "nm_usuario", type: "varchar", length: 100, nullable: false})
    name: string;

    @Column({name: "dt_nascimento", type: "date", nullable: true})
    birthday?: string;

    @Column({name: "ds_email", type: "varchar", length: 100, unique: true, nullable: false})
    email: string;

    @Column({name: "ds_img_usuario", type: "bytea", nullable: true, select: false})
    image?: Buffer | string;

    @Column({name: "nr_telefone", type: "varchar", length: 11, unique: true, nullable: true})
    phone?: string;

    @Column({name: "ds_senha", type: "varchar", length: 100, nullable: false, select: false})
    password: string;

    @Column({name: "nr_vidas", type: "integer", nullable: false, default: 5})
    numberOfLifes: number;

    @Column({name: "ultima_att_nr_vidas", type: "timestamp", nullable: true })
    lastUpdateNumberOfLifes?: Date;

    @CreateDateColumn({name: "dt_criacao"})
    createdAt?: Date;

    @Column({name:"cod_alteracao_senha", type:"varchar", nullable:false, default: "", length: 4 })
    codeChangePassword?: string;

    @Column({name: "dt_expiracao_senha", type: "date", nullable: true})
    expirationDate?: Date;

    @Column({name: "cd_externo", type: "varchar", length: 255, nullable: true, select: false})
    externalID?: string;

    @Column({name: "ds_token_externo", type: "varchar", length: 1000, nullable: true, select: false})
    externalToken?: string;
    
    @ManyToOne(() => Goal, (goal) => goal.users,{eager: true})
    @JoinColumn({name: "cd_meta"})
    goal?: Goal;

    @OneToOne(() => Statistics, (statistics) => statistics.user, {eager: true})
    @JoinColumn({name: "cd_estatistica"})
    statistics?: Statistics;

    @OneToMany(() => UserTechnology, (userTechnology) => userTechnology.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: "cd_usuario"})
    technologies?: UserTechnology[];

    @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: "cd_usuario"})
    challenges?: UserChallenge[];

    @OneToMany(() => UserAchievement, (userAchievement) => userAchievement.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn({name: "cd_usuario"})
    achievements?: UserAchievement[];
}