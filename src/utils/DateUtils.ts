export default class DateUtils {
    dateConvertToEUA(date: String) {
        console.log("antes ", date);
        let separatedDate = date.split('/');
        let data = new Date(Number(separatedDate[2]), Number(separatedDate[1]) - 1, Number(separatedDate[0])).toLocaleString('en-US');
    
        console.log("convertida", data);
        return data;
    }

    dateConvertToBrasil(date: String) {
        let separatedDate = date.split('-');
        let data = new Date(Number(separatedDate[0]), Number(separatedDate[1]) - 1, Number(separatedDate[2]));

        return data.getDate() + "/" + data.getMonth() + 1 + "/" + data.getFullYear();

        
    }
}