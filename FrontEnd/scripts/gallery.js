
// generate some works in the gallery
function generateWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    const uniqueWorks = new Set();

    const worksUnique = works.filter(work => {
        if (uniqueWorks.has(work.id)) {
            return false;
        }
        uniqueWorks.add(work.id);
        return true;
    });

    worksUnique.forEach(work => {
        const figureBalise = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;

        const titreElement = document.createElement("figcaption");
        titreElement.innerText = work.title;

        figureBalise.appendChild(imageElement);
        figureBalise.appendChild(titreElement);
        gallery.appendChild(figureBalise);
    });
}


// generate some works in the gallery, but with a filter
export function generateFilteredWorks(works) {
    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            if (this.textContent === "Tous") {
                generateWorks(works);
                return;
            }
            const worksFiltres = works.filter(work => work.category.name === this.textContent);

            generateWorks(worksFiltres);
        });
    });
}


// generate filters buttons
export function generateButton(categories) {

    const filters = document.querySelector(".filters");

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const button = document.createElement("button");
        button.textContent = category.name;

        filters.appendChild(button)
    }
}

// fetch categories from the API
export async function fetchCategories() {
    let categories = window.localStorage.getItem('categories');

    if (categories === null) {
        const reponse = await fetch('http://localhost:5678/api/categories');
        categories = await reponse.json();

        const valeurCategories = JSON.stringify(categories);
        window.localStorage.setItem("categories", valeurCategories);
    } else {
        categories = JSON.parse(categories);
    }
    return (categories);
}

// call all our functions for generating gallery
export async function generateGallery(works) {

    generateButton(await fetchCategories())
    generateWorks(works);
    generateFilteredWorks(works);

}

