
// generate some works
function generateWorks(works) {

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {

        const work = works[i];

        const figureBalise = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = work.title;

        figureBalise.appendChild(imageElement);
        figureBalise.appendChild(titreElement);
        gallery.appendChild(figureBalise);
    }
}

// generate some works, but with a filter
export function generateFilteredWorks(works) {
    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

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

// call all our functions
export async function filters(works) {

    const categories = await fetchCategories();
    generateButton(categories)
    generateWorks(works);
    generateFilteredWorks(works);

}

