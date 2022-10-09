import IStatisticsProperties from "../interfaceType/IStatisticsProperties";
import UserModel from "../model/UserModel";

export default class StatisticsModel {
    constructor(statistics?: IStatisticsProperties){
        if(statistics) {
            this.statisticID = statistics.statisticID;
            this.currentXp = statistics.currentXp;
            this.totalXp = statistics.totalXp;
            this.mounthXp = statistics.mounthXp;
            this.dayXp = statistics.dayXp;
            this.completedClasses = statistics.completedClasses;
            this.numberOfHits = statistics.numberOfHits;
            this.numberOfMistakes = statistics.numberOfMistakes;
            this.user = statistics.user;
        } 
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
        this.mounthXp += xpGain;
    }

    statisticID: number;
    currentXp: number;
    totalXp: number;
    mounthXp: number;
    dayXp: number;
    completedClasses: number;
    numberOfHits: number;
    numberOfMistakes: number;
    user: UserModel;
}
