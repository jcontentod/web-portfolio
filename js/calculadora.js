let valorGuardado = null;
let operacion = null;
let reemplazarPantalla = true;

function escribir(valor) {
    const pantalla = document.getElementById("pantalla");

    if (["+", "-", "*", "/"].includes(valor)) {
        valorGuardado = Number(pantalla.value);
        operacion = valor;
        reemplazarPantalla = true;
        return;
    }

    if (valor === "." && !reemplazarPantalla && pantalla.value.includes(".")) {
        return;
    }

    pantalla.value = reemplazarPantalla
        ? valor === "." ? "0." : valor
        : pantalla.value + valor;
    reemplazarPantalla = false;
}

function calcular() {
    const pantalla = document.getElementById("pantalla");
    const segundoValor = Number(pantalla.value);
    let resultado;

    if (valorGuardado === null || operacion === null) {
        return;
    }

    switch (operacion) {
        case "+":
            resultado = valorGuardado + segundoValor;
            break;
        case "-":
            resultado = valorGuardado - segundoValor;
            break;
        case "*":
            resultado = valorGuardado * segundoValor;
            break;
        case "/":
            resultado = segundoValor === 0 ? NaN : valorGuardado / segundoValor;
            break;
    }

    pantalla.value = Number.isFinite(resultado) ? String(resultado) : "Error";
    valorGuardado = null;
    operacion = null;
    reemplazarPantalla = true;
}

function borrar() {
    document.getElementById("pantalla").value = "0";
    valorGuardado = null;
    operacion = null;
    reemplazarPantalla = true;
}
