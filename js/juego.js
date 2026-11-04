const ICONOS = { piedra: "✊", papel: "✋", tijera: "✌️" };

let victorias = 0;
let derrotas = 0;
let empates = 0;

function juego(jugador) {
    const opciones = ["piedra", "papel", "tijera"];
    const maquina = opciones[Math.floor(Math.random() * opciones.length)];
    let mensaje;
    let resultado;

    if (jugador === maquina) {
        mensaje = "¡Empate!";
        resultado = "ronda-empate";
        empates++;
    } else if (
        (jugador === "piedra" && maquina === "tijera") ||
        (jugador === "tijera" && maquina === "papel") ||
        (jugador === "papel" && maquina === "piedra")
    ) {
        mensaje = "¡Gana el jugador!";
        resultado = "ronda-victoria";
        victorias++;
    } else {
        mensaje = "¡Gana la máquina!";
        resultado = "ronda-derrota";
        derrotas++;
    }

    mostrarRonda(jugador, maquina, `${mensaje} La máquina eligió ${maquina}.`, resultado);
}

function mostrarRonda(jugador, maquina, mensaje, resultado) {
    const ronda = document.getElementById("ronda");

    document.getElementById("jugada-jugador").textContent = ICONOS[jugador];
    document.getElementById("jugada-maquina").textContent = ICONOS[maquina];
    document.getElementById("mensaje").textContent = mensaje;
    document.getElementById("puntos-jugador").textContent = victorias;
    document.getElementById("puntos-maquina").textContent = derrotas;
    document.getElementById("puntos-empates").textContent = empates;

    ronda.className = "ronda";
    void ronda.offsetWidth;
    ronda.classList.add(resultado, "ronda-animada");
}

function reiniciar() {
    victorias = 0;
    derrotas = 0;
    empates = 0;

    document.getElementById("ronda").className = "ronda";
    document.getElementById("jugada-jugador").textContent = "?";
    document.getElementById("jugada-maquina").textContent = "?";
    document.getElementById("mensaje").textContent = "Elige una opción para empezar.";
    document.getElementById("puntos-jugador").textContent = victorias;
    document.getElementById("puntos-maquina").textContent = derrotas;
    document.getElementById("puntos-empates").textContent = empates;
}
