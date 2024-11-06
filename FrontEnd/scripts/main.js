import { filters } from "./filters.js"

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

    generateWorks(works);
}


fetchWorks()
    .then(works => {
        filters(works);
    })
    .catch(error => console.error("Erreur :", error));
