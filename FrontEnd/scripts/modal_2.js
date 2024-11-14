
/* switch on page 2 */
function switchPage2(backArrow) {
    const page1 = document.getElementById("page-1");
    page1.style.display = 'none';
    const page2 = document.getElementById("page-2");
    page2.style.display = 'flex';
    backArrow.style.visibility = 'visible';
}

/* switch on page 1 */
export function switchPage1(backArrow) {
    const page1 = document.getElementById("page-1");
    page1.style.display = 'flex';
    const page2 = document.getElementById("page-2");
    page2.style.display = 'none';
    backArrow.style.visibility = 'hidden';
}

/* manage the pages */
function managePages() {
    const backArrow = document.querySelector(".back-page");
    switchPage2(backArrow);
    backArrow.addEventListener("click", () => {
        switchPage1(backArrow);
    })
}

/* load the categories in the select input */
function loadCategories() {
    const categories = JSON.parse(window.localStorage.getItem('categories')) || [];
    const categorySelect = document.getElementById("category-select");

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Choisissez une catégorie";
    categorySelect.appendChild(defaultOption);

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;

        categorySelect.appendChild(option);
    });
}

/* call all the functions */
export function newProject() {
    managePages();
    loadCategories();
}