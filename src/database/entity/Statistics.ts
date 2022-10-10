import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Level } from "./Level";

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
    monthXp: number;

    @Column({name: "nr_xp_dia", type: "integer", default: 0})
    dayXp: number;

    @Column({name: "nr_aulas_completas", type: "integer", default: 0})
    completedClasses: number;

    @Column({name: "nr_acertos", type: "integer", default: 0})
    numberOfHits: number;

    @Column({name: "nr_error", type: "integer", default: 0})
    numberOfMistakes: number;

    @OneToOne(() => User, (user) => user.statistics)
    user: User;

    @ManyToOne(() => Level, {eager: true})
    @JoinColumn({name: "cd_nivel"})
    level: Level;

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