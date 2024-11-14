
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

/* clean the modal inputs and restore the files one */
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
