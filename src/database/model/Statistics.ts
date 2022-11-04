import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import IStatisticsProperties from "../../interfaceType/IStatisticsProperties";
import { Level } from "./Level";

import { User } from "./User";

@Entity()
export class Statistics {
    constructor(statistics?: IStatisticsProperties){
        if(statistics) {
            this.statisticID = statistics.statisticID;
            this.currentXp = statistics.currentXp;
            this.totalXp = statistics.totalXp;
            this.monthXp = statistics.monthXp;
            this.dayXp = statistics.dayXp;
            this.completedClasses = statistics.completedClasses;
            this.numberOfHits = statistics.numberOfHits;
            this.numberOfMistakes = statistics.numberOfMistakes;
            this.completedGoal = statistics.completedGoal;
            this.user = statistics.user;
            this.level = statistics.level;
        }
    }

    @PrimaryGeneratedColumn({name: "cd_estatistica"})
    statisticID: number;

    @Column({name: "nr_xp_atual", type: "integer", default: 0})
    currentXp: number;

    @Column({name: "nr_xp_total", type: "integer", default: 0})
    totalXp: number;

    @Column({name: "nr_xp_mes", type: "integer", default: 0})
    monthXp: number;

    @Column({name: "nr_xp_dia", type: "integer", default: 0})
    dayXp: number;

    @Column({name: "nr_aulas_completas", type: "integer", default: 0})
    completedClasses: number;

    @Column({name: "nr_acertos", type: "integer", default: 0})
    numberOfHits: number;

    @Column({name: "nr_error", type: "integer", default: 0})
    numberOfMistakes: number;

    @Column({name: "meta_completa", type: "boolean", nullable: false, default: false})
    completedGoal: boolean;

    @OneToOne(() => User, (user) => user.statistics)
    user: User;

    @ManyToOne(() => Level, {eager: true})
    @JoinColumn({name: "cd_nivel"})
    level: Level;

    initStatistics = (level: Level) => {
        this.level = level;
        this.currentXp = 0;
        this.totalXp = 0;
        this.dayXp = 0;
        this.monthXp = 0;
    }

    addExperienceToUser = (xpGain: number) => {
        const total = this.currentXp + xpGain;
        const rest = total - 150;

        if(total >= 150){
            this.currentXp = rest;
        }else{
            this.currentXp += xpGain;
        }
        
        this.totalXp += xpGain;
        this.dayXp += xpGain;
        this.monthXp += xpGain;
    }
}