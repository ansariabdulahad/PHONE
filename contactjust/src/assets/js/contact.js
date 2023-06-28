// START CODING
window.onload = function() {
    
    // GLOBAL VARIABLES
    let nameBox = document.querySelector('#name-box');
    let nameEl = document.querySelector("#name");
    let mobileBox = document.querySelector("#mobile-box");
    let mobileEl = document.querySelector('#mobile');
    let usernameEl = document.querySelector("#username");
    let passwordEl = document.querySelector("#password");
    let signupBtn = document.querySelector('#signup-btn');
    let notice = document.querySelector("#signup-notice");
    let loginBtn = document.querySelector("#login-btn");

    // CHECK LOCAL STORAGE IS EMPTY OR NOT AND PERFORM SOME ACTION
    function checkSignup() {
        if(localStorage.getItem('userData') != null) {
            setTimeout(() => {
                signupBtn.style.display = "none";
                nameBox.style.display = "none";
                mobileBox.style.display = "none";
                loginBtn.style.display = "block";
            }, 500);
        }
        else {
            setTimeout(() => {
                signupBtn.style.display = "block";
                nameBox.style.display = "block";
                mobileBox.style.display = "block";
                loginBtn.style.display = "none";
            }, 500);
        }
    }

    checkSignup(); // calling...

    // SIGN UP BTN CODING
    signupBtn.onclick = function(e) {
        e.preventDefault();

        // CHECK AND STORE DATA IN LOCALSTORAGE
        if(nameEl.value && mobileEl.value && usernameEl.value && passwordEl.value != "") {
            let data = {
                name: nameEl.value,
                mobile: mobileEl.value,
                username: usernameEl.value,
                password: passwordEl.value
            };

            localStorage.setItem("userData", JSON.stringify(data));
            
            // EMPTY INPUT FIELDS AFTER SIGNUP
            setTimeout(() => {
                nameEl.value = '';
                mobileEl.value = '';
                usernameEl.value = '';
                passwordEl.value = '';

                checkSignup(); // calling...
            }, 500);
        }
        else {
            // GIVE NOTICE TO USER IF FIELDS ARE EMPTY
            notice.style.display = "block";
            setTimeout(() => {
                notice.style.display = "none";
            }, 3000);
        }
    }

    // LOGIN BTN CODING
    loginBtn.onclick = function (e) { 
        e.preventDefault();

        if(localStorage.getItem("userData") != null) {
            let userData = JSON.parse(localStorage.getItem("userData"));

            if(usernameEl.value == userData.username) {
                if(passwordEl.value == userData.password) {
                    presentAlert("SUCCESS", "SUCCESS !");
                }
                else {
                    presentAlert("Password is incorrect !", "Warning !");
                }
            }            
            else {
                presentAlert("Username not found !", "Warning !");
            }
        }        
    }

    // PRESENT ALERT FUNCTION CODING
    async function presentAlert(message, header) {
        let alert = document.createElement("ion-alert");
        alert.header = header;
        alert.message = message;
        alert.buttons = ["OK"];

        document.body.appendChild(alert);
        await alert.present();
    }
}