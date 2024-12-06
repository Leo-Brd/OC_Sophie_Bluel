import { generateGallery } from "./gallery.js"
import { checkAuthentication } from "./login.js"
import { manageModal } from "./modalGallery.js"

// load the works to print the gallery
async function loadWorks() {

    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des works');
        } else {
            const works = await response.json();
            localStorage.setItem('works', JSON.stringify(works));
            generateGallery(works);
            return true;
        }

    } catch (error) {
        console.error('Erreur lors du chargement des works :', error);
        return false;
    }    
}

// If loading works is ok, we call the other files
if (loadWorks()) {
    checkAuthentication();
    manageModal();
}


