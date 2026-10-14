
/* MODO CLARO / MODO OSCURO AMORE */
const botonModo = document.getElementById("modoOscuro");
const modoGuardado = localStorage.getItem("modoAMORE");
const oscuro = modoGuardado === "oscuro";

// Aplicar el tema guardado
document.documentElement.classList.toggle("modo-oscuro", oscuro);
document.body.classList.toggle("modo-oscuro", oscuro);

if (botonModo) {
    botonModo.textContent = oscuro ? "☀ Claro" : "☾ Oscuro";

    botonModo.addEventListener("click", function () {
        const activar = !document.body.classList.contains("modo-oscuro");

        document.documentElement.classList.toggle("modo-oscuro", activar);
        document.body.classList.toggle("modo-oscuro", activar);

        botonModo.textContent = activar ? "☀ Claro" : "☾ Oscuro";
        localStorage.setItem("modoAMORE", activar ? "oscuro" : "claro");
    });
}

window.addEventListener("load", function () {
    requestAnimationFrame(function () {
        document.documentElement.classList.remove("tema-preparando");
    });
});
// BOTÓN PARA VOLVER ARRIBA

const botonVolverArriba = document.getElementById("volverArriba");

if (botonVolverArriba) {
    window.addEventListener("scroll", function () {
        botonVolverArriba.classList.toggle(
            "visible",
            window.scrollY > 250
        );
    });

    botonVolverArriba.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}