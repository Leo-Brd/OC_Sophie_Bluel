import { uniqueWorks } from "./utils.js";

/* open the modal */
function openModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

/* close the modal */ 
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/* listen for closing and opening the modal */
function listenOpenCloseModal() {
    const openModalButton = document.getElementById('open-modal-button');
    if (openModalButton) {
        openModalButton.addEventListener('click', openModal);
    }

    const closeModalIcon = document.querySelector('.close-modal');
    if (closeModalIcon) {
        closeModalIcon.addEventListener('click', closeModal);
    }

    const modal = document.querySelector('.modal');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
}

/* generate the gallery in the modal */
function generateModalGallery() {
    let works = JSON.parse(window.localStorage.getItem('works')) || [];

    const modalGallery = document.querySelector(".modal-gallery");
    if (!modalGallery) {
        console.error("Élément '.modal-gallery' non trouvé.");
        return;
    }
    modalGallery.innerHTML = "";

    const uniqueWorksList = uniqueWorks(works);

    uniqueWorksList.forEach(work => {
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
    });
}

/* delete a project */
async function deleteProject(projectElement, projectId) {
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

/* listen the deletion of a project */
function listenDeleteProject() {
    const trashIcons = document.querySelectorAll(".delete-project");

    trashIcons.forEach(icon => {
        icon.addEventListener("click", async (event) => {
            event.preventDefault();

            const projectElement = event.target.closest(".modal-gallery-project");
            const projectId = projectElement.dataset.projectId;

            if (!projectId) {
                console.error("Aucun ID de projet trouvé.");
                return;
            }

            if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
                return;
            }

            try {
                deleteProject(projectElement, projectId);
            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        });
    });
}


/* call all modal functions */
export function modal() {
    document.addEventListener('DOMContentLoaded', () => {
        listenOpenCloseModal();
        generateModalGallery();
        listenDeleteProject();
    });
}



