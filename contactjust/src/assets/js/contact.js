// START CODING
window.onload = function() {
    
    // GLOBAL VARIABLES
    let nameEl = document.querySelector("#name");
    let mobileEl = document.querySelector('#mobile');
    let usernameEl = document.querySelector("#username");
    let passwordEl = document.querySelector("#password");
    let signupBtn = document.querySelector('#signup-btn');
    let notice = document.querySelector("#signup-notice");

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
}