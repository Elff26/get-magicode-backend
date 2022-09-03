const codeAndDateGenerator = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const code = Math.floor(Math.random() * (max - min) + min);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours()+24);

    return {
        "code": code,
        "expirationDate": currentDate.toLocaleDateString()
    };
}

export default codeAndDateGenerator;
