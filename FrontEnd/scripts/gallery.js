import { uniqueWorks, addWorkToGallery } from "./utils.js";

// generate some works in the gallery
function generateWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    const uniqueWorksList = uniqueWorks(works);

    uniqueWorksList.forEach(work => {
        addWorkToGallery(work);
    });
}


// generate some works in the gallery, but with a filter
export function generateFilteredWorks(works) {
    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            try {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");

                if (this.textContent === "Tous") {
                    generateWorks(works);
                    return;
                } else {
                    const worksFiltres = works.filter(work => work.category.name === this.textContent);
                    generateWorks(worksFiltres);
                }
            } catch (error) {
                console.error('Erreur lors du filtrage par catégorie :', error);
            }
        });
    });
}


// generate filters buttons
export function generateButton(categories) {

    try {
        const filters = document.querySelector(".filters");

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const button = document.createElement("button");
            button.textContent = category.name;

            filters.appendChild(button);
        }
    } catch (error) {
        console.error('Erreur lors de la génération des boutons filtres :', error);
    }
}

// Fetch categories from the API
export async function fetchCategories() {
    let categories = window.localStorage.getItem('categories');

    if (categories === null) {
        try {
            const response = await fetch('http://localhost:5678/api/categories');           
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des catégories');
            }

            categories = await response.json();
            const valeurCategories = JSON.stringify(categories);
            window.localStorage.setItem("categories", valeurCategories);

        } catch (error) {
            console.error('Erreur lors du traitement des catégories :', error);
            return [];
        }
    } else {
        categories = JSON.parse(categories);
    }

    return categories;
}


// call all our functions for generating gallery
export async function generateGallery(works) {

    generateButton(await fetchCategories());
    generateWorks(works);
    generateFilteredWorks(works);

}

