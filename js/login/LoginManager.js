import { Observable, Event } from "../utils/Observable.js";
import ApiManager from "../api/ApiManager.js";


class LoginManager extends Observable {

    constructor() {
        super();
    }

    async login(username, password) {
        let loginSuccess = false;
        if(username != "" && password != "") {
            let profile_url = getProfileUrl(username);
            let collection_url = getCollectionUrl(username, password);
            let wishlist_url = getWishlistUrl(username, password);
            
            let inputsAreValid = await validateUserData(profile_url, collection_url);
    
            if(inputsAreValid[0] = true && inputsAreValid[1] == true) {
                //profile valid, token valid
                loginSuccess = true;

                localStorage.setItem("profile_url", profile_url);
                localStorage.setItem("collection_url", collection_url);
                localStorage.setItem("wishlist_url", wishlist_url)
            
                location.href = "collection.html"; 
            } else {
                loginSuccess = false;
                let loginFailEvent = new Event("onLoginFailed", loginSuccess);
                this.notifyAll(loginFailEvent)
            }
        }
    }

}

async function validateUserData(profile_url, collection_url) {

    let profileIsValid = false;
    let collectionIsValid = false;

    profileIsValid = await ApiManager.validateURL(profile_url);
    collectionIsValid = await ApiManager.validateURL(collection_url);
    
    return [profileIsValid, collectionIsValid];
}


function getProfileUrl(username) {
    let profile_url = 'https://api.discogs.com//users/'.concat(username);
    return profile_url;
}

function getCollectionUrl(username, password) {
    let collection_url = 'https://api.discogs.com/users/'.concat(username).concat('/collection?folders/0&token=').concat(password);
    return collection_url;
}

function getWishlistUrl(username, password) {
    let wishlist_url = 'https://api.discogs.com/users/'.concat(username).concat('/wants?token=').concat(password);
    return wishlist_url;
}

export default LoginManager;