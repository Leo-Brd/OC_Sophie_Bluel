
export function onLoginSuccess(data) {

    localStorage.setItem("authToken", data.token);
    window.location.href = "index.html";
}


export function onLoginError() {
    console.log("Identifiants incorrects. Veuillez réessayer.");
}


export async function dataProcess(loginData) {

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            onLoginSuccess(data);
        } else {
            console.log(data)
            onLoginError();
        }
    })
    .catch(error => console.error('Erreur :', error));
}


export async function login() {

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

document.addEventListener('DOMContentLoaded', ()=> {
    login();
});



/* Functions for the main page */
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

export function checkAuthentication() {
    const token = localStorage.getItem("authToken");
    if (token) {
        showLoggedInUI();
    } else {
        console.log("Aucun utilisateur connecté.");
    }
}
