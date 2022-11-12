import bcrypt from 'bcrypt';
import HttpError from '../exceptions/HttpError';
import Messages from './Messages';

export default class Crypt {
    static async encrypt (data: string) {
        let result = await bcrypt.hash(data, Number(process.env.SALT));

        if(!result) {
            throw new HttpError(Messages.GENERIC_SERVER_ERROR, 500);
        }

        return result;
    }

    static async decrypt (inputData: string, dataEnctypted: string) {
        let result = await bcrypt.compare(inputData, dataEnctypted);

        if(!result) {
            throw new HttpError(Messages.EMAIL_OR_PASSWORD_INVALID, 400);
        }

        return result;
    }
}