export default interface IFAcebookInspectTokenProperties {
    data: {
        app_id: string,
        type: string,
        application: string,
        data_access_expires_at: number,
        expires_at: number,
        is_valid: boolean,
        issued_at: number,
        scopes: [],
        user_id: number
        error?: {
            code: number,
            message: string
        }
    }
}