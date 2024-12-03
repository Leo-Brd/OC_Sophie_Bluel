
/* when login success, we redirect to main page and add the token */
function onLoginSuccess(data) {
    localStorage.setItem("authToken", data.token);
    window.location.href = "index.html";
}

/* when login fail, we print an error message */
function onLoginError() {
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
async function dataProcess(loginData) {

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(loginData)
        })
        const data = await response.json();
    
        if (data.token) {
            onLoginSuccess(data);
        } else {
            onLoginError();
        }
    } catch (error) {
        console.error('Erreur lors du traitement des données du formulaire :', error);
    }
}

/* we get the datas from the form */
async function listenLogin() {

    const form = document.getElementById("login");

    form.addEventListener('submit', (event)=> {
        event.preventDefault();

        try {
            const loginData = {
                email: document.querySelector('#email').value,
                password: document.querySelector('#password').value
            };
            dataProcess(loginData);

        } catch (error) {
            console.error('Erreur lors de la récupération des valeurs du formulaire :', error);
        }
    })
}

/* we call the functions when login page is charged */
document.addEventListener('DOMContentLoaded', ()=> {
    listenLogin();
});



/***** Functions for the main page *****/

/* show more elements when user is connected */
function showLoggedInUI() {

    try {
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

        const filtersButtons = document.querySelector(".filters");
        filtersButtons.style.display = 'none';
    } catch (error) {
        console.error('Erreur lors de l\'affichage de l\'interface du mode connecté :', error);
    }

}

/* check if user is connected */
export function checkAuthentication() {
    const token = localStorage.getItem("authToken");
    if (token) {
        showLoggedInUI();
        console.log("Utilisateur connecté.");
    } else {
        console.log("Aucun utilisateur connecté.");
    }
}
