
export function generateFilteredWorks(works, categories) {

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

export function filters(works) {
    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            generateFilteredWorks(works, fetchCategories());
        });
    });
}

