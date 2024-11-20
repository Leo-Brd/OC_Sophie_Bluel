import { addProject } from "./utils.js";

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
    const submitButton = document.getElementById("validate-button");
    desactiveButton(submitButton);
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

/* verif the modal inputs are filled */
function verifInputs(fileInput, titleInput, categoryInput) {
    const inputs = [
        { element: fileInput, isValid: el => el.files && el.files.length > 0 },
        { element: titleInput, isValid: el => el.value.trim() !== "" },
        { element: categoryInput, isValid: el => el.value }
    ];

    const invalidInput = inputs.find(input => !input.isValid(input.element));
    return !invalidInput;
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

/* active the button */
function activeButton(button) {
    button.style.backgroundColor = "#1D6154";
    button.disabled = false;
}

/* desactive the button */
function desactiveButton(button) {
    button.style.backgroundColor = "#A7A7A7";
    button.disabled = true;
}

/* call all the functions */
export function newProject() {
    const form = document.getElementById("new-project");
    const fileInput = document.getElementById("file-input");
    const titleInput = document.getElementById("title-input");
    const categoryInput = document.getElementById("category-select");

    managePages();
    loadCategories(categoryInput);
    listenPreviewImage(fileInput);
    listenButtonActivation(fileInput, titleInput, categoryInput);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectedCategory = categoryInput.options[categoryInput.selectedIndex];
        const categoryId = selectedCategory.getAttribute("data-id");

        addProject(fileInput.files[0], titleInput.value, categoryId);
    })
}

