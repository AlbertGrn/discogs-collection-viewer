import LoginManager from "./login/LoginManager.js";

const login_username = document.getElementById("login-username-input");
const login_token = document.getElementById("login-token-input");
const login_button = document.getElementById("login-submit-button");

const login_box_input = document.getElementsByClassName("login-box-input");


var loginManager;

async function init() {
    loginManager = new LoginManager(login_username, login_token);

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
        let username = login_username.value;
        let password = login_token.value;
        loginManager.addEventListener("onLoginFailed", loginFailCss)
        loginManager.login(username, password);
    });
}


//Invalid Login
function loginFailCss(event) {

    login_box_input[0].style.border = '3px solid var(--main-invalid-color)'
    login_box_input[1].style.border = '3px solid var(--main-invalid-color)'

    login_box_input[0].value = "";
    login_box_input[1].value = "";

    login_box_input[0].placeholder = "Invalid Input";
    login_box_input[1].placeholder = "Invalid Input";
}

init();