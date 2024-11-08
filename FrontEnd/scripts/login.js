


export function dataProcess(loginData) {

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
        if (data.success) {
            console.log("success")
            localStorage.setItem("authToken", data.token);
            window.location.href = "index.html";
        } else {
            console.log("Identifiants incorrects. Veuillez réessayer.");
        }
    })
    .catch(error => console.error('Erreur :', error));

}


export function login() {

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
