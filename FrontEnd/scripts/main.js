import { generateGallery } from "./gallery.js"
import { checkAuthentication } from "./login.js"
import { modal } from "./modal.js"

async function fetchWorks() {

    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des works');
        }
        const works = await response.json();

        localStorage.setItem('works', JSON.stringify(works));
        generateGallery(works);
    } catch (error) {
        console.error('Erreur lors du chargement des works :', error);
    }
    
}


fetchWorks().catch(error => console.error("Erreur :", error));
checkAuthentication();
modal();

