interface TipProperty{
    cd_dica: number;
    ds_dica: string;
    cd_exercicio: number;
}

export default class TipModel{
    constructor(tip: TipProperty){
        this.cd_dica = tip.cd_dica;
        this.ds_dica = tip.ds_dica;
        this.cd_exercicio = tip.cd_exercicio;
    }

    cd_dica: number;
    ds_dica: string;
    cd_exercicio: number;
}