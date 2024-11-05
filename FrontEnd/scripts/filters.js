
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(button => {
    button.addEventListener("click", function() {
        
        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

    });
});
