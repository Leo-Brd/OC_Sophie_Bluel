import { generateGallery } from "./gallery.js"
import { checkAuthentication } from "./login.js"
import { modal } from "./modal.js"

async function fetchWorks() {
    let works = window.localStorage.getItem('works');

    if (works === null) {
        const reponse = await fetch('http://localhost:5678/api/works');
        works = await reponse.json();

        const valeurWorks = JSON.stringify(works);
        window.localStorage.setItem("works", valeurWorks);
    } else {
        works = JSON.parse(works);
    }
    generateGallery(works);
}


fetchWorks().catch(error => console.error("Erreur :", error));
checkAuthentication();
modal();

