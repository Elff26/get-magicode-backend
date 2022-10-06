export default interface IFacebookUserDataProperties {
    email: string,
    name: string,
    picture: {
        data: {
            height: number,
            is_silhouette: boolean,
            url: string,
            width: number
        }
    },
    id: string,
    error?: any
}