import bcrypt from 'bcrypt';
import HttpError from '../exceptions/HttpError';

export default class Crypt {
    static async encrypt (data: string) {
        let result = await bcrypt.hash(data, Number(process.env.SALT));

        if(!result) {
            throw new HttpError('Intern error, try again later!', 500);
        }

        return result;
    }

    static async decrypt (inputData: string, dataEnctypted: string) {
        let result = await bcrypt.compare(inputData, dataEnctypted);

        if(!result) {
            throw new HttpError('Incorrect email/password!', 400);
        }

        return result;
    }
}