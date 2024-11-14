
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

/* delete a project */
export async function deleteProject(projectElement, projectId) {
    const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        projectElement.remove();

        const mainGallery = document.querySelector(".gallery");
        const mainProjectElement = mainGallery.querySelector(`[data-project-id="${projectId}"]`);
        if (mainProjectElement) {
            mainProjectElement.remove();
        }

        let works = JSON.parse(localStorage.getItem("works")) || [];
        works = works.filter(work => work.id !== parseInt(projectId));
        localStorage.setItem("works", JSON.stringify(works));
    }
}

/* add a project */
export async function addProject(imageFile, title, category) {

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('category', category);

    try {
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
            console.error('Erreur lors de la création du work :', error);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
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
