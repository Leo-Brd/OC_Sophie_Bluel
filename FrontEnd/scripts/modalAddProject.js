import { activeButton, desactiveButton, addWorkToGallery, addWorkToModalGallery, switchPage1, switchPage2, closeModal, verifInputs } from "./utils.js"

/* add a project */
async function addProject(imageFile, title, category) {

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('category', category);

    const response = await fetch(`http://localhost:5678/api/works/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json'
        },
        body: formData
    });

    if (response.ok) {
        const result = await response.json();
        addWorkToModalGallery(result);
        addWorkToGallery(result);

        let works = JSON.parse(localStorage.getItem('works')) || [];
        works.push(result);
        localStorage.setItem('works', JSON.stringify(works));
    } else {
        const error = await response.json();
        console.error('Erreur lors de l\'ajout du projet :', error);
    }
}

/* load the categories in the select input */
function loadCategories(categorySelect) {
    const categories = JSON.parse(window.localStorage.getItem('categories')) || [];
    categorySelect.innerHTML = "";

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
        option.setAttribute("data-id", category.id);

        categorySelect.appendChild(option);
    });
}

/* print the preview image when a file is choosed */
function listenPreviewImage(fileInput) {

    fileInput.addEventListener('change', (event) => {
        const previewImage = document.getElementById("preview-image");
        const otherElements = document.querySelectorAll('.add-file > *:not(#preview-image)');
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                otherElements.forEach(element => {
                    if (element !== previewImage) {
                        element.style.display = 'none';
                    }
                });
            };            
            reader.readAsDataURL(file);
        }
    });
}

/* listen when the button need to be active*/
function listenButtonActivation(fileInput, titleInput, categoryInput) {
    const form = document.getElementById("new-project");
    const submitButton = document.getElementById("validate-button");

    const inputs = form.querySelectorAll('.modal-input input, .modal-input select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (verifInputs(fileInput, titleInput, categoryInput)) {
                activeButton(submitButton);
            } else {
                desactiveButton(submitButton);
            }
        });
    });
}

/* manage the pages */
function managePages() {
    switchPage2();
    const backArrow = document.querySelector(".back-page");
    backArrow.addEventListener("click", switchPage1);
}

/* call all the functions */
export function newProject() {
    const fileInput = document.getElementById("file-input");
    const titleInput = document.getElementById("title-input");
    const categoryInput = document.getElementById("category-select");

    managePages();
    loadCategories(categoryInput);
    listenPreviewImage(fileInput);
    listenButtonActivation(fileInput, titleInput, categoryInput);

    const form = document.getElementById("new-project");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectedCategory = categoryInput.options[categoryInput.selectedIndex];
        const categoryId = selectedCategory.getAttribute("data-id");

        await addProject(fileInput.files[0], titleInput.value, categoryId);
        closeModal();
    });
}

