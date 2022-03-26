const login_username = document.getElementById("login-username-input");
const login_token = document.getElementById("login-token-input");
const login_button = document.getElementById("login-submit-button");

const login_box_input = document.getElementsByClassName("login-box-input");


//change border of input boxes on focus
login_box_input[0].addEventListener("focusin", function() {
    login_box_input[0].style.border = '3px solid var(--main-accent-color)'
})

login_box_input[0].addEventListener("focusout", function() {
    login_box_input[0].style.border = '3px solid var(--main-dark-color)'
})

login_box_input[1].addEventListener("focusin", function() {
    login_box_input[1].style.border = '3px solid var(--main-accent-color)'
})

login_box_input[1].addEventListener("focusout", function() {
    login_box_input[1].style.border = '3px solid var(--main-dark-color)'
})

login_button.addEventListener("click", function() {
    
    let userName = login_username.value;
    let userToken = login_token.value;
    
    login(userName, userToken)
});


async function login(userName, userToken) {
    if(userName != "" && userToken != "") {
        let profile_url = getProfileUrl(userName);
        let collection_url = getCollectionUrl(userName, userToken);
        
        let inputsAreValid = await validateUserData(profile_url, collection_url);

        if(inputsAreValid[0] = true && inputsAreValid[1] == true) {
            //profile valid, token valid
            localStorage.setItem("profile_url", profile_url);
            localStorage.setItem("collection_url", collection_url);
        
            location.href = "collection.html"; 

        } else {

            login_box_input[0].style.border = '3px solid var(--main-invalid-color)'
            login_box_input[1].style.border = '3px solid var(--main-invalid-color)'

            login_box_input[0].value = "";
            login_box_input[1].value = "";

            login_box_input[0].placeholder = "Invalid Input";
            login_box_input[1].placeholder = "Invalid Input";
        }
    }
}

async function validateUserData(profile_url, collection_url) {

    let profileIsValid = false;
    let collectionIsValid = false;

    await fetch(profile_url)
    .then((response) => {
        if(response.status == 200) {
            profileIsValid = true;
        } else {
            profileIsValid = false;
        }
    });

    await fetch(collection_url)
    .then((response) => {
        if(response.status == 200) {
            collectionIsValid = true;
        } else if(response.status == 401) {
            collectionIsValid = false;
        }
    })
    
    return [profileIsValid, collectionIsValid];
}


function getProfileUrl(userName) {
    let profile_url = 'https://api.discogs.com//users/'.concat(userName);
    return profile_url;
}

function getCollectionUrl(userName, userToken) {
    let collection_url = 'https://api.discogs.com/users/'.concat(userName).concat('/collection?folders/0&token=').concat(userToken);
    return collection_url;
}