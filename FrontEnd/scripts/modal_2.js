
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

        categorySelect.appendChild(option);
    });
}

/* print the preview image when a file is choosed */
function listenPreviewImage() {
    const fileInput = document.getElementById("file-input");

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

/* call all the functions */
export function newProject() {
    managePages();
    loadCategories();
    listenPreviewImage();
}