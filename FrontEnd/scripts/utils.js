
/* filter the works for be sure they are unique */
export function uniqueWorks(works) {
    const seenIds = new Set();

    return works.filter(work => {
        if (seenIds.has(work.id)) {
            return false;
        }
        seenIds.add(work.id);
        return true;
    });
}

/* clean the modal inputs */
export function resetInputs(modal) {
    const inputs = modal.querySelectorAll('input, select');

    inputs.forEach(input => {
        if (input.type === 'file') {
            input.value = '';
            const previewImage = document.getElementById('preview-image');
            if (previewImage) {
                previewImage.style.display = 'none';
                previewImage.src = '';
            }
            const otherElements = document.querySelectorAll('.add-file > *:not(#preview-image)');
            otherElements.forEach(element => {
                if (element !== previewImage) {
                    element.style.display = 'flex';
                }
            });
        } else if (input.type === 'text' || input.type === 'select-one') {
            input.value = '';
        }
    });
}

/* verif the modal inputs are filled */
export function verifInputs(fileInput, titleInput, categoryInput) {
    const inputs = [
        { element: fileInput, isValid: el => el.files && el.files.length > 0 },
        { element: titleInput, isValid: el => el.value.trim() !== "" },
        { element: categoryInput, isValid: el => el.value }
    ];

    const invalidInput = inputs.find(input => !input.isValid(input.element));
    return !invalidInput;
}


/* add a project to the modal gallery */
export function addWorkToModalGallery(work) {
    const modalGallery = document.querySelector(".modal-gallery");
    const projectBalise = document.createElement("div");
    projectBalise.classList.add("modal-gallery-project");
    projectBalise.dataset.projectId = work.id;

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can", "delete-project");

    projectBalise.appendChild(imageElement);
    projectBalise.appendChild(trashIcon);
    modalGallery.appendChild(projectBalise);
}


/* add a project to the main gallery */
export function addWorkToGallery(work) {
    const gallery = document.querySelector(".gallery");
    const figureBalise = document.createElement("figure");
    figureBalise.dataset.projectId = work.id;

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    const titreElement = document.createElement("figcaption");
    titreElement.innerText = work.title;

    figureBalise.appendChild(imageElement);
    figureBalise.appendChild(titreElement);
    gallery.appendChild(figureBalise);
}

/* active the validate button */
export function activeButton(button) {
    button.style.backgroundColor = "#1D6154";
    button.disabled = false;
}

/* desactive the validate button */
export function desactiveButton(button) {
    button.style.backgroundColor = "#A7A7A7";
    button.disabled = true;
}

/* open the modal */
export function openModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'block';
    }
    const backArrow = document.querySelector(".back-page");
    backArrow.style.visibility = 'hidden';
    const page2 = document.getElementById("page-2");
    page2.style.display = 'none';
}

/* close the modal */ 
export function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
    resetInputs(modal);
    switchPage1();
}

/* switch on page 2 */
export function switchPage2() {
    const page1 = document.getElementById("page-1");
    page1.style.display = 'none';
    const page2 = document.getElementById("page-2");
    page2.style.display = 'flex';

    const backArrow = document.querySelector(".back-page");
    backArrow.style.visibility = 'visible';
}

/* switch on page 1 */
export function switchPage1() {
    const submitButton = document.getElementById("validate-button");
    desactiveButton(submitButton);
    const page1 = document.getElementById("page-1");
    page1.style.display = 'flex';
    const page2 = document.getElementById("page-2");
    page2.style.display = 'none';

    const backArrow = document.querySelector(".back-page");
    backArrow.style.visibility = 'hidden';
}
