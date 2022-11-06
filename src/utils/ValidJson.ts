const validJson = (stringToVerify: string) => {
    try {
        JSON.parse(stringToVerify);
    } catch(e: any) {
        return false;
    }

    return true;
}

export default validJson;