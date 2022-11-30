export default class CodeAndDataGenerator {
    codeGenerator(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);

        const code = (Math.floor(Math.random() * (max - min) + min)).toString();

        return code;
    }

    datePlusHours(hours: number) {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + hours);

        return currentDate.toLocaleDateString('pt-BR');
    }
}
