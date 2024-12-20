import { uniqueWorks, addWorkToModalGallery, openModal, closeModal, confirmDelete, switchPage2 } from "./utils.js";
import { newProject } from "./modalAddProject.js";

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
    } else {
        console.error("Une erreur s'est produite lors de la requête de suppression :", error);
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
    try {
        let works = JSON.parse(window.localStorage.getItem('works')) || [];

        const modalGallery = document.querySelector(".modal-gallery");
        modalGallery.innerHTML = "";

        const uniqueWorksList = uniqueWorks(works);

        uniqueWorksList.forEach(work => {
            addWorkToModalGallery(work);
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la génération des travaux :", error);
    }
}

/* Wait user confirmation then delete or not a project*/
function askAndDeleteProject(projectElement, projectId) {
    confirmDelete((confirmed) => {
        if (confirmed) {
            try {
                deleteProject(projectElement, projectId);
            } catch (error) {
                console.error("Une erreur s'est produite lors de la suppression :", error);
            }
        } else {
            console.log("Suppression annulée.");
        }
    });
}

/* listen the deletion of a project */
function listenDeleteProject() {
    const trashIcons = document.querySelectorAll(".delete-project");

    trashIcons.forEach(icon => {
        icon.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();

            try {
                const projectElement = event.target.closest(".modal-gallery-project");
                const projectId = projectElement.dataset.projectId;
                askAndDeleteProject(projectElement, projectId);
            } catch (error) {
                console.error("Une erreur s'est produite lors de la demande de confirmation :", error);
            }
        });
    });
}


/* call all modal functions */
export function manageModal() {
    
    document.addEventListener('DOMContentLoaded', () => {
        listenOpenCloseModal();
        generateModalGallery();
        listenDeleteProject();

        newProject();

        const addProjectButton = document.getElementById("add-project-button");
        addProjectButton.addEventListener("click", () => {
            switchPage2();
        })
    });
}



