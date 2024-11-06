

function generateWorks(works) {

    for (let i = 0; i < works.length; i++) {

        const work = works[i];

        const gallery = document.querySelector(".gallery");
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

export function generateFilteredWorks(works, categories) {
    generateWorks(works);
}

export function generateButton(categories) {

    const filters = document.querySelector(".filters");

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const button = document.createElement("button");
        button.textContent = category.name;

        filters.appendChild(button)
    }
}

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

export async function filters(works) {

    const categories = await fetchCategories();
    generateButton(categories)
    generateWorks(works);

    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            generateFilteredWorks(works, categories);
        });
    });
}

