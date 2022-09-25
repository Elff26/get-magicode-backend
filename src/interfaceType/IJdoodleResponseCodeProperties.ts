export default interface IJdoodleResponseCodeProperties {
    output: string,
    statusCode: number,
    memory: string,
    cpuTime: string,
    isCorrect?: boolean,
    message?: string
}