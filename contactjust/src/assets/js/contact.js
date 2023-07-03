// START CODING
window.onload = function() {
    
    // GLOBAL VARIABLES
    let page = document.querySelector("#page");
    let allContactBox = document.querySelector(".all-contact");
    let addBtn = document.querySelector("#add-btn");
    let container = document.querySelector("#container");
    let nameBox = document.querySelector('#name-box');
    let nameEl = document.querySelector("#name");
    let mobileBox = document.querySelector("#mobile-box");
    let mobileEl = document.querySelector('#mobile');
    let usernameEl = document.querySelector("#username");
    let passwordEl = document.querySelector("#password");
    let signupBtn = document.querySelector('#signup-btn');
    let notice = document.querySelector("#signup-notice");
    let loginBtn = document.querySelector("#login-btn");
    let search = document.querySelector("#search");

    let allContacts = [];

    // CHECK LOCAL STORAGE IS EMPTY OR NOT AND PERFORM SOME ACTION
    function checkSignup() {
        if(localStorage.getItem('userData') != null) {
            setTimeout(() => {
                signupBtn.style.display = "none";
                nameBox.style.display = "none";
                mobileBox.style.display = "none";
                loginBtn.style.display = "block";
            }, 500);

            // CHECK SESSION STORAGE
            if(sessionStorage.getItem("username") != null) {
                container.style.display = "none";
                page.style.display = "block";
            }
            else {
                container.style.display = "block";
                page.style.display = "none";
            }
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
                    sessionStorage.setItem("username", usernameEl.value);
                    
                    setTimeout(() => {
                        container.style.display = "none";
                        page.style.display = "block";
                    }, 500);
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

    // START CODING OF STORING CONTACT DATA
    addBtn.onclick = function() {
        modelAlert(); // calling...
    }

    // MODEL ALERT FUNCTION CODING
    async function modelAlert() {
        let alert = document.createElement("ion-alert");

        alert.header = "Please enter your contact details !";
        alert.buttons = ["CANCLE", "UPLOAD"];
        alert.inputs = [
            {
                type: "text",
                class: "name",
                placeholder: "Enter Your Name"
            },
            {
                type: "tel",
                class: "number",
                placeholder: "Enter your number"
            }
        ];

        document.body.appendChild(alert);
        await alert.present();

        uploadData(alert); // calling...
    }

    // GET STORED CONTACT DATA
    if (localStorage.getItem("allContacts") != null) {
        allContacts = JSON.parse(localStorage.getItem("allContacts"));
    }

    // UPLOAD DATA FUNCTION CODNG
    function uploadData(alert) { 
        let inputEl = alert.querySelectorAll("input");
        let allBtn = alert.querySelectorAll("button");

        allBtn[1].onclick = function(e) {
            e.preventDefault();

            allContacts.push({
                name: inputEl[0].value,
                number: inputEl[1].value
            });

            localStorage.setItem("allContacts", JSON.stringify(allContacts));

            getContactFunc(); // calling...
        }
    }

    // GET CONTACT FUNCTION CODING
    const getContactFunc = () => {
        allContactBox.innerHTML = "";
        allContacts.forEach((contact, index) => {
            allContactBox.innerHTML += `

                <ion-item-sliding index=${index}>
                
                    <ion-item>
                        <ion-label>${contact.name}</ion-label>
                        <ion-label>${contact.number}</ion-label>
                        <a href="tel:${contact.number}">
                            <ion-icon name="call" color="success" style="font-size:25px;"></ion-icon>
                        </a>
                    </ion-item>
            
                    <ion-item-options>
                        <ion-item-option class="update-btn">
                            <ion-icon name="create-outline"></ion-icon>
                        </ion-item-option>
                        <ion-item-option class="del-btn" color="danger">
                            <ion-icon name="trash"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
            
                </ion-item-sliding>

            `;
        });

        // DEL BTN CODING
        let i;
        let allDelBtn = document.querySelectorAll(".del-btn");
        
        for(i = 0; i < allDelBtn.length; i++) {
            allDelBtn[i].onclick = function() {
                let parent = this.parentElement.parentElement;
                let id = parent.getAttribute("index");
                allContacts.splice(id, 1);
                localStorage.setItem("allContacts", JSON.stringify(allContacts));

                getContactFunc(); // calling... 
            }
        }

        // UPDATE BTN CODING
        let allUpdateBtn = document.querySelectorAll(".update-btn");

        for(i = 0; i < allUpdateBtn.length; i++) {
            allUpdateBtn[i].onclick = function() {
                let parent = this.parentElement.parentElement;
                let index = parent.getAttribute("index");
                let label = parent.querySelectorAll("ion-label");
                let name = label[0].innerHTML;
                let number = label[1].innerHTML;

                updateAlertFunc(index, name, number);
            }
        }
    }

    getContactFunc(); // calling...

    // UPDATE ALERT FUNCTION CODING
    async function updateAlertFunc(index, name, number) {
        let up_alert = document.createElement("ion-alert");
        up_alert.header = "Please Update Your Info";
        up_alert.buttons = ["CANCLE", "UPDATE"];
        up_alert.inputs = [
            {
                type: "text",
                "id": "up-name",
                value: name
            },
            {
                type: "tel",
                id: "up-number",
                value: number
            }
        ];

        document.body.appendChild(up_alert);
        await up_alert.present();

        let upNameEl = up_alert.querySelector("#up-name");
        let upNumberEl = up_alert.querySelector("#up-number");
        let allBtn = up_alert.querySelectorAll("button");

        allBtn[1].onclick = function() {
            allContacts[index] = {
                name: upNameEl.value,
                number: upNumberEl.value
            }

            localStorage.setItem("allContacts", JSON.stringify(allContacts));

            getContactFunc(); // CALLING...
        }
    }

    // BACK BUTTON CODING FOR MOBILE PHONE
    document.addEventListener("backbutton", function() {
        navigator.app.exitApp();
    });

    // SEARCH FACILITY
    search.oninput = function() {
        let i;
        let filter = search.value.toLowerCase();
        let itemEl = document.querySelectorAll("ion-item-sliding");

        for(i = 0; i < itemEl.length; i++) {
            let label = itemEl[i].getElementsByTagName("ion-label");
            let data = label[0].innerHTML;

            if(data.toLowerCase().indexOf(filter) > -1) {
                itemEl[i].style.display = "";
            }
            else {
                itemEl[i].style.display = "none";
            }
        }
    }
}