import { 
    Column, 
    Entity, 
    JoinColumn, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Statistics } from "./Statistics";

@Entity()
export class Level {
    @PrimaryGeneratedColumn({name: "cd_nivel"})
    levelID: number;

    @Column({name: "nr_nivel", type: "integer", nullable: false, unique: true})
    levelNumber: number;

    @Column({name: "vl_xp", type: "integer", default: 150})
    valueXp: number;

    @OneToMany(() => Statistics, (statistic) => statistic.statisticID)
    @JoinColumn({name: "cd_level"})
    statistics: Statistics[];
}

