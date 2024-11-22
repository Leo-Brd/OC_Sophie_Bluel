
/* when login success, we redirect to main page and add the token */
export function onLoginSuccess(data) {
    localStorage.setItem("authToken", data.token);
    window.location.href = "index.html";
}

/* when login fail, we print an error message */
export function onLoginError() {
    const form = document.getElementById("login");

    let errorMessage = document.querySelector(".login-error");
    if (!errorMessage) {
        errorMessage = document.createElement("p");
        errorMessage.classList.add("login-error");
        errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
        
        form.appendChild(errorMessage);
    }
}


/* we send our login data to API and process the answer */
export async function dataProcess(loginData) {

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(loginData)
    })
    .then(answer => answer.json())
    .then(data => {
        if (data.token) {
            onLoginSuccess(data);
        } else {
            onLoginError();
        }
    })
    .catch(error => console.error('Erreur :', error));
}

/* we get the datas from the form */
export async function listenLogin() {

    const form = document.getElementById("login");

    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        const loginData = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        };

        dataProcess(loginData);
    })
}

/* we call the functions when login page is charged */
document.addEventListener('DOMContentLoaded', ()=> {
    listenLogin();
});



/***** Functions for the main page *****/

/* show more elements when user is connected */
export function showLoggedInUI() {

    const loginHeader = document.getElementById("login-header");
    loginHeader.style.display = "flex";

    const logoutButton = document.getElementById("login-logout");
    logoutButton.innerHTML = "logout";
    logoutButton.href = "#";
    logoutButton.addEventListener("click", ()=> {
        localStorage.removeItem("authToken");
        window.location.href = "index.html";
    });

    const portfolioButton = document.querySelector(".portfolio-title button");
    portfolioButton.style.display = "flex";
}

/* check if user is connected */
export function checkAuthentication() {
    const token = localStorage.getItem("authToken");
    if (token) {
        showLoggedInUI();
    } else {
        console.log("Aucun utilisateur connecté.");
    }
}
