// Cierra los submenús al pulsar fuera de ellos o la tecla Escape
const menus = document.querySelectorAll(".menu-desplegable");

document.addEventListener("click", (evento) => {
    menus.forEach((menu) => {
        if (!menu.contains(evento.target)) {
            menu.open = false;
        }
    });
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        menus.forEach((menu) => {
            menu.open = false;
        });
    }
});
