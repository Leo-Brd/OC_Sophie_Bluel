
export function onLoginSuccess(data) {

    localStorage.setItem("authToken", data.token);
    window.location.href = "index.html";
    
    const loginHeader = document.getElementById("login-header");
    if (loginHeader) {
        loginHeader.style.display = "flex";
    } else {
        console.log("Élément 'login-header' non trouvé.");
    }

    const portfolioButton = document.querySelector(".portfolio-title button");
    if (portfolioButton) {
        portfolioButton.style.display = "flex";
    } else {
        console.log("Élément 'portfolio-button' non trouvé.");
    }

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

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const loginData = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        };

        dataProcess(loginData);
    })

}
