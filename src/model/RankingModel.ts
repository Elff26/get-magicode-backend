interface RankingProperty{
    cd_ranking: number;
    vl_xp:number
}

export default class RankingModel{
    constructor(ranking:RankingProperty) {
        this.cd_ranking = ranking.cd_ranking
        this.vl_xp = ranking.vl_xp
    }

    cd_ranking: number;
    vl_xp:number
}