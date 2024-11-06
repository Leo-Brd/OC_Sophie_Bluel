
export function generateFilteredWorks(works) {
    console.log("test");
}

export function filters(works) {
    const filterButtons = document.querySelectorAll(".filters button");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            generateFilteredWorks(works);
        });
    });
}

