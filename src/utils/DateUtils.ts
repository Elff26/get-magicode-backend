export default class DateUtils {
    dateConvertToEUA(date: String) {
        let separatedDate = date.split('/');
        let dateConverted = new Date(Number(separatedDate[2]), Number(separatedDate[1]) - 1, Number(separatedDate[0])).toISOString();

        return dateConverted.split('T')[0];
    }

    dateConvertToBrasil(date: String) {
        let separatedDate = date.split('-');
        let data = new Date(Number(separatedDate[0]), Number(separatedDate[1]) - 1, Number(separatedDate[2]));

        return data.getDate() + "/" + data.getMonth() + 1 + "/" + data.getFullYear();
    }

    databaseDateConvertToEua(date: Date) {
        let separatedDate = date.toString().split('-');

        return new Date(Number(separatedDate[0]), Number(separatedDate[1]) - 1, Number(separatedDate[2])).setHours(0, 0, 0);
    }
}