
function SwitchPage2() {
    const page1 = document.getElementById("page-1");
    page1.style.display = 'none';
    const page2 = document.getElementById("page-2");
    page2.style.display = 'flex'; 
}

export function newProject() {
    SwitchPage2();
}