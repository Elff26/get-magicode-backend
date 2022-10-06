export default interface IGoogleTokens {
    access_token: string,
    expires_in: string,
    id_token: string
    refresh_token: string
    scope: string
    token_type: string
    error?: {
        status: string
    }
}