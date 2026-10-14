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


/* ==========================================
   CARRUSEL AUTOMÁTICO DE AMORE
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.getElementById("carruselAmore");

    if (!carrusel) return;

    const diapositivas = Array.from(
        carrusel.querySelectorAll(".inicio-diapositiva")
    );

    const puntos = Array.from(
        document.querySelectorAll(".carrusel-punto")
    );

    const anterior = carrusel.querySelector(".carrusel-anterior");
    const siguiente = carrusel.querySelector(".carrusel-siguiente");
    const botonPausa = document.getElementById("pausarCarrusel");

    if (diapositivas.length === 0) return;

    let indiceActual = 0;
    let temporizador = null;
    let pausado = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function mostrarDiapositiva(indice) {
        indiceActual =
            (indice + diapositivas.length) % diapositivas.length;

        diapositivas.forEach(function (diapositiva, i) {
            const activa = i === indiceActual;

            diapositiva.classList.toggle("activa", activa);
            diapositiva.setAttribute("aria-hidden", String(!activa));
        });

        puntos.forEach(function (punto, i) {
            const activo = i === indiceActual;

            punto.classList.toggle("activo", activo);
            punto.setAttribute("aria-current", String(activo));
        });
    }

    function detenerTemporizador() {
        if (temporizador !== null) {
            clearInterval(temporizador);
            temporizador = null;
        }
    }

    function iniciarTemporizador() {
        detenerTemporizador();

        if (pausado || document.hidden) return;

        temporizador = setInterval(function () {
            mostrarDiapositiva(indiceActual + 1);
        }, 5000);
    }

    function actualizarBotonPausa() {
        if (!botonPausa) return;

        botonPausa.textContent = pausado
            ? "▶ Reanudar"
            : "Ⅱ Pausar";

        botonPausa.setAttribute(
            "aria-pressed",
            String(pausado)
        );
    }

    if (anterior) {
        anterior.addEventListener("click", function () {
            mostrarDiapositiva(indiceActual - 1);
            iniciarTemporizador();
        });
    }

    if (siguiente) {
        siguiente.addEventListener("click", function () {
            mostrarDiapositiva(indiceActual + 1);
            iniciarTemporizador();
        });
    }

    puntos.forEach(function (punto, i) {
        punto.addEventListener("click", function () {
            mostrarDiapositiva(i);
            iniciarTemporizador();
        });
    });

    if (botonPausa) {
        botonPausa.addEventListener("click", function () {
            pausado = !pausado;
            actualizarBotonPausa();
            iniciarTemporizador();
        });
    }

    // Pausar mientras el cursor está sobre el carrusel.
    carrusel.addEventListener("mouseenter", detenerTemporizador);

    carrusel.addEventListener("mouseleave", iniciarTemporizador);

    // Evitar que cambie de diapositiva mientras la página está oculta.
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            detenerTemporizador();
        } else {
            iniciarTemporizador();
        }
    });

    mostrarDiapositiva(0);
    actualizarBotonPausa();
    iniciarTemporizador();
});


function aplicarModoOscuro(activar) {
    document.documentElement.classList.toggle("modo-oscuro", activar);
    document.body.classList.toggle("modo-oscuro", activar);

    localStorage.setItem("modoOscuro", activar ? "true" : "false");
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
