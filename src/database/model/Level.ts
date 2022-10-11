import { 
    Column, 
    Entity, 
    JoinColumn, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import ILevelProperties from "../../interfaceType/ILevelProperties";
import { Statistics } from "./Statistics";

@Entity()
export class Level {
    constructor(level?: ILevelProperties){
        if(level) {
            this.levelID = level.levelID;
            this.levelNumber = level.levelNumber;
            this.valueXp = level.valueXp;
            this.statistics = level.statistics;
        }
    }

    @PrimaryGeneratedColumn({name: "cd_nivel"})
    levelID?: number;

    @Column({name: "nr_nivel", type: "integer", nullable: false, unique: true})
    levelNumber: number;

    @Column({name: "vl_xp", type: "integer", default: 150})
    valueXp: number;

    @OneToMany(() => Statistics, (statistic) => statistic.statisticID)
    @JoinColumn({name: "cd_level"})
    statistics: Statistics[];
}

