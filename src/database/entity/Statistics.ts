import { 
    Column, 
    Entity, 
    JoinColumn, 
    OneToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { User } from "./User";

@Entity()
export class Statistics {
    @PrimaryGeneratedColumn({name: "cd_estatistica"})
    statisticID: number;

    @Column({name: "nr_xp_atual", type: "integer", default: 0})
    currentXp: number;

    @Column({name: "nr_xp_total", type: "integer", default: 0})
    totalXp: number;

    @Column({name: "nr_xp_mes", type: "integer", default: 0})
    mounthXp: number;

    @Column({name: "nr_xp_dia", type: "integer", default: 0})
    dayXp: number;

    @Column({name: "nr_aulas_completas", type: "integer", default: 0})
    completedClasses: number;

    @Column({name: "nr_acertos", type: "integer", default: 0})
    numberOfHits: number;

    @Column({name: "nr_error", type: "integer", default: 0})
    numberOfMistakes: number;

    @OneToOne(() => User)
    @JoinColumn({name: "cd_usuario"})
    user: User;

    addExperienceToUser = (xpGain: number) => {
        this.currentXp += xpGain;
        this.totalXp += xpGain;
        this.dayXp += xpGain;
        this.mounthXp += xpGain;
    }
}