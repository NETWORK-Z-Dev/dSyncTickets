document.addEventListener("DOMContentLoaded", event => {
    displayAdminMenu();
})

function getDashboardContentElement(){
    return document.querySelector(".layout.admin .page-content.admin")
}

function letterColor(input) {
    const text = String(input).slice(0, 2).toUpperCase();

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 45%)`;
}