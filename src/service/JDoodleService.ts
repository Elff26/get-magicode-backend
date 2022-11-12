import axios from "axios";
import HttpError from "../exceptions/HttpError";
import IJdoodleResponseCodeProperties from "../interfaceType/IJdoodleResponseCodeProperties";
import LanguageCodeDictionary from "../utils/LanguageCodeDictionary";
import Messages from "../utils/Messages";

export default class JDoodleService {
    constructor() {}

    sendCode = async (userCode: string, language: string, input: string) => {
        let responseData: IJdoodleResponseCodeProperties = (await axios.post(`https://api.jdoodle.com/v1/execute`, {
            script : userCode,
            stdin: input,
            language: LanguageCodeDictionary[language],
            versionIndex: "0",
            clientId: process.env.CLIENTE_ID,
            clientSecret: process.env.CLIENT_SECRET
        })).data;

        if(!responseData) {
            throw new HttpError(Messages.GENERIC_SERVER_ERROR, 500);
        }

        return responseData;
    }
}