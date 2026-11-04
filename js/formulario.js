const formulario = document.getElementById("formulario-contacto");
const nivel = document.getElementById("valor");
const salidaNivel = document.getElementById("salida-nivel");
const mensajeFormulario = document.getElementById("mensaje-formulario");

nivel.addEventListener("input", () => {
    salidaNivel.textContent = nivel.value;
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mensajeFormulario.textContent = `Gracias, ${formulario.nombre.value}. Este formulario es una demostración y los datos no se guardan.`;
});

formulario.addEventListener("reset", () => {
    mensajeFormulario.textContent = "";
    salidaNivel.textContent = nivel.defaultValue;
});
