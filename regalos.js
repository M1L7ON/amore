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

// El buscador todavía no tiene funcionamiento.

document.addEventListener("DOMContentLoaded", function () {

    const buscador = document.getElementById("buscarProducto");
    const botonBuscar = document.getElementById("botonBuscar");
    const mensaje = document.getElementById("mensajeBusqueda");

    function buscarProductos() {

        const texto = buscador.value.toLowerCase().trim();

        const productos = document.querySelectorAll(
            ".productos .tarjeta-producto"
        );

        let encontrados = 0;

        productos.forEach(function (producto) {

            const nombre = producto.querySelector("h2").textContent.toLowerCase();
            const descripcion = producto.querySelector("p").textContent.toLowerCase();
            const precio = producto.querySelector(".precio").textContent.toLowerCase();

            const coincide =
                nombre.includes(texto) ||
                descripcion.includes(texto) ||
                precio.includes(texto);

            if (coincide) {
                producto.style.display = "";
                encontrados++;
            } else {
                producto.style.display = "none";
            }

        });

        // Mostrar u ocultar el mensaje según los resultados
        if (encontrados === 0) {
            mensaje.style.display = "flex";
        } else {
            mensaje.style.display = "none";
        }

    }

    // Buscar mientras se escribe
    buscador.addEventListener("input", buscarProductos);

    // Buscar al presionar el botón
    botonBuscar.addEventListener("click", buscarProductos);

});

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