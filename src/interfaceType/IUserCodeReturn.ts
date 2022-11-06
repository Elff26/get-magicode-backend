import IJdoodleResponseCodeProperties from "./IJdoodleResponseCodeProperties";

export default interface IUserCodeReturn {
    isCorrect: boolean,
    jdoodleResponse: IJdoodleResponseCodeProperties[]
}