
class ApiManager {

    static async validateURL(url) {
        let isValid = false;
    
        await fetch(url)
        .then((response) => {
            if(response.status == 200) {
                isValid = true;
            } else {
                isValid = false;
            }
        })
    
        return isValid;
    }

}


export default ApiManager;