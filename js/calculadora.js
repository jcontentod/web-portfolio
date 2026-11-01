let valorGuardado = null;
let operacion = null;
let reemplazarPantalla = true;

const OPERADORES = ["+", "-", "*", "/"];
const SIMBOLOS = { "+": "+", "-": "−", "*": "×", "/": "÷" };
const MAX_DIGITOS = 12;

function mostrarOperacion(texto) {
    document.getElementById("operacion-actual").textContent = texto;
}

function operar(primerValor, segundoValor, signo) {
    switch (signo) {
        case "+":
            return primerValor + segundoValor;
        case "-":
            return primerValor - segundoValor;
        case "*":
            return primerValor * segundoValor;
        case "/":
            return segundoValor === 0 ? NaN : primerValor / segundoValor;
    }
}

// Quita los decimales falsos de las operaciones, como 0.1 + 0.2 = 0.30000000000000004
function formatear(numero) {
    return Number.isFinite(numero) ? String(parseFloat(numero.toPrecision(MAX_DIGITOS))) : "Error";
}

function escribir(valor) {
    const pantalla = document.getElementById("pantalla");

    if (pantalla.value === "Error") {
        borrar();
    }

    if (OPERADORES.includes(valor)) {
        // Si ya hay una operación pendiente se resuelve primero: 2 + 3 + 4 = 9
        if (operacion !== null && !reemplazarPantalla) {
            calcular();
            if (pantalla.value === "Error") {
                return;
            }
        }

        valorGuardado = Number(pantalla.value);
        operacion = valor;
        reemplazarPantalla = true;
        mostrarOperacion(`${pantalla.value} ${SIMBOLOS[valor]}`);
        return;
    }

    if (reemplazarPantalla) {
        pantalla.value = valor === "." ? "0." : valor;
        reemplazarPantalla = false;
        return;
    }

    if (valor === "." && pantalla.value.includes(".")) {
        return;
    }

    if (pantalla.value.replace(/\D/g, "").length >= MAX_DIGITOS) {
        return;
    }

    pantalla.value = pantalla.value === "0" && valor !== "." ? valor : pantalla.value + valor;
}

function calcular() {
    const pantalla = document.getElementById("pantalla");

    if (valorGuardado === null || operacion === null) {
        return;
    }

    const segundoValor = Number(pantalla.value);
    const resultado = operar(valorGuardado, segundoValor, operacion);

    mostrarOperacion(`${valorGuardado} ${SIMBOLOS[operacion]} ${segundoValor} =`);
    pantalla.value = formatear(resultado);
    valorGuardado = null;
    operacion = null;
    reemplazarPantalla = true;
}

function borrar() {
    document.getElementById("pantalla").value = "0";
    mostrarOperacion("");
    valorGuardado = null;
    operacion = null;
    reemplazarPantalla = true;
}

// La calculadora también se puede usar con el teclado
document.addEventListener("keydown", (evento) => {
    const tecla = evento.key;

    if (evento.ctrlKey || evento.metaKey || evento.altKey || evento.target.closest("a, summary")) {
        return;
    }

    if (/^[0-9]$/.test(tecla) || OPERADORES.includes(tecla) || tecla === ".") {
        evento.preventDefault();
        escribir(tecla);
    } else if (tecla === ",") {
        escribir(".");
    } else if (tecla === "Enter" || tecla === "=") {
        evento.preventDefault();
        calcular();
    } else if (tecla === "Escape") {
        borrar();
    }
});
