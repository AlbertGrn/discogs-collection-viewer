class ApiManager {

    static async validateURL(url) {
        let isValid = false;

        await fetch(url)
            .then((response) => {
                if (response.status == 200) {
                    isValid = true;
                } else {
                    isValid = false;
                }
            })

        return isValid;
    }
    
    static async getData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Collection Promise Rejected", error);
            throw error;
        }
    }

}


export default ApiManager;