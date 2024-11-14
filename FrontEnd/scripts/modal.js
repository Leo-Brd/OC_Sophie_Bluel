import { uniqueWorks, resetInputs, deleteProject, addWorkToModalGallery } from "./utils.js";
import { newProject } from "./modal_2.js";
import { switchPage1 } from "./modal_2.js";


/* open the modal */
function openModal() {
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
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
    resetInputs(modal);
    switchPage1();
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
        addWorkToModalGallery(work);
    });
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

        const addProjectButton = document.getElementById("add-project-button");
        addProjectButton.addEventListener("click", () => {
            newProject();
        })
    });
}



