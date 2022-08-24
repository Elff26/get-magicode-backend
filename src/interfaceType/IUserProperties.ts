export default interface IUserProperties {
    cd_usuario: number;
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