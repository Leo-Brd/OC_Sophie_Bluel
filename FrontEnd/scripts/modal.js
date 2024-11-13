
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

    const uniqueWorks = works.reduce((acc, work) => {
        if (!acc.some(item => item.id === work.id)) {
            acc.push(work);
        }
        return acc;
    }, []);

    uniqueWorks.forEach(work => {
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


export function modal() {
    document.addEventListener('DOMContentLoaded', () => {
        listenOpenCloseModal();
        generateModalGallery();
    });
}



