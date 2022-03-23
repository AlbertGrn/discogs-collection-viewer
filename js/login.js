//localStorage.setItem("storageName",getInput);

const login_username = document.getElementById("login-username-input");
const login_token = document.getElementById("login-token-input");
const login_button = document.getElementById("login-submit-button");


login_button.addEventListener("click", function() {
    let userName = login_username.value;
    let userToken = login_token.value;
    
    if(userName != "" && userToken != "") {
        let profile_url = getProfileUrl(userName);
        let collection_url = getCollectionUrl(userName, userToken);
        
        localStorage.setItem("profile_url", profile_url);
        localStorage.setItem("collection_url", collection_url);
        
        location.href = "collection.html"; 
    }
});


function getProfileUrl(userName) {
    let profile_url = 'https://api.discogs.com//users/'.concat(userName);
    return profile_url;
}

function getCollectionUrl(userName, userToken) {
    let collection_url = 'https://api.discogs.com/users/'.concat(userName).concat('/collection?folders/0&token=').concat(userToken);
    return collection_url;
}