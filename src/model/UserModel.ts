interface UserPropety{
    cd_usuario?: number;
    nm_usuario: string
    dt_nascimento: string
    ds_email: string
    nr_telefone: string
    ds_senha: string
    nr_vidas: number
    nr_experiencia: number
    dt_criacao?: Date
    cd_meta: number
    cd_ranking: number
}

export default class UserModel{
    constructor(user: UserPropety){
        this.cd_usuario = user.cd_usuario;
        this.nm_usuario = user.nm_usuario;
        this.dt_nascimento = user.dt_nascimento;
        this.ds_email = user.ds_email;
        this.nr_telefone = user.nr_telefone;
        this.ds_senha = user.ds_senha;
        this.nr_vidas = user.nr_vidas;
        this.nr_experiencia = user.nr_experiencia;
        this.dt_criacao = user.dt_criacao;
        this.cd_meta = user.cd_meta;
        this.cd_ranking = user.cd_ranking;
    }

    cd_usuario?: number
    nm_usuario: string
    dt_nascimento: string
    ds_email: string
    nr_telefone: string
    ds_senha: string
    nr_vidas: number
    nr_experiencia: number
    dt_criacao?: Date
    cd_meta: number
    cd_ranking: number
}