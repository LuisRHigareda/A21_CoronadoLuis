const NACIONALIDADES_ACEPTADAS = [
    {key: 'AU', name: "Australia"},
    {key: 'BR', name: "Brasil"},
    {key: 'CA', name: "Canadá"},
    {key: 'CH', name: "Suiza"},
    {key: 'DE', name: "Alemania"},
    {key: 'DK', name: "Dinamarca"},
    {key: 'ES', name: "España"},
    {key: 'FI', name: "Finlandia"},
    {key: 'FR', name: "Francia"},
    {key: 'GB', name: "Reino Unido"},
    {key: 'IE', name: "Irlanda"},
    {key: 'IN', name: "India"},
    {key: 'IR', name: "Irán"},
    {key: 'MX', name: "México"},
    {key: 'NL', name: "Países Bajos"},
    {key: 'NO', name: "Noruega"},
    {key: 'NZ', name: "Nueva Zelanda"},
    {key: 'RS', name: "Serbia"},
    {key: 'TR', name: "Turquía"},
    {key: 'UA', name: "Ucrania"},
];

var regexSoloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

window.onload = function () {
    const forms = document.getElementsByTagName("form");

    if (forms.length === 0) {
        return;
    }

    const form = forms[0];
    const inputs = form.getElementsByTagName("input");
    const selects = form.getElementsByTagName("select");

    // Resaltar inputs y selects al enfocar
    for (let input of inputs) {
        input.onfocus = resaltarDesresaltar;
        input.addEventListener("blur", noResaltar);
    }

    for (let select of selects) {
        select.onfocus = resaltar;
        select.addEventListener("blur", noResaltar);
    }

    // Validación en tiempo real
    const nombreInput = document.getElementById("first-name");
    const apellidoInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");

    if (nombreInput) {
        nombreInput.addEventListener("input", function () {
            validarNombre(this);
        });
        nombreInput.addEventListener("blur", function () {
            validarNombre(this);
        });
    }

    if (apellidoInput) {
        apellidoInput.addEventListener("input", function () {
            validarNombre(this);
        });
        apellidoInput.addEventListener("blur", function () {
            validarNombre(this);
        });
    }

    if (emailInput) {
        emailInput.addEventListener("input", function () {
            validarNoVacio(this);
        });
        emailInput.addEventListener("blur", function () {
            validarNoVacio(this);
        });
    }

    llenarNacionalidad();
};

function llenarNacionalidad() {
    const nacionalidad = document.getElementById("nationality");

    if (!nacionalidad) {
        return;
    }

    for (let { key, name } of NACIONALIDADES_ACEPTADAS) {
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = name;
        nacionalidad.appendChild(option);
    }
}

// Manejo de focus / blur y labels 

function resaltar(evento) {
    const elemento = evento.target;
    elemento.classList.add("selected");
    cambiarColorLabel(elemento, true);
}

function noResaltar(evento) {
    const elemento = evento.target;

    if (elemento.classList.contains("selected")) {
        elemento.classList.remove("selected");
    }

    cambiarColorLabel(elemento, false);
}

function resaltarDesresaltar(evento) {
    const elemento = evento.target;
    elemento.classList.toggle("selected");
    const estaSeleccionado = elemento.classList.contains("selected");
    cambiarColorLabel(elemento, estaSeleccionado);
}

function cambiarColorLabel(campo, encender) {
    if (!campo.id) {
        return;
    }

    const label = document.querySelector('label[for="' + campo.id + '"]');

    if (!label) {
        return;
    }

    if (encender) {
        label.classList.add("label-focus");
    } else {
        label.classList.remove("label-focus");
    }
}

// Validaciones 

function validarNombre(campo) {
    const valor = campo.value.trim();

    if (valor === "") {
        mostrarError(campo, "Este campo no puede estar vacío.");
        campo.classList.add("input-error");
        return false;
    }

    if (!regexSoloLetras.test(valor)) {
        mostrarError(campo, "Solo se permiten letras (puedes usar acentos).");
        campo.classList.add("input-error");
        return false;
    }

    mostrarError(campo, "");
    campo.classList.remove("input-error");
    return true;
}

function validarNoVacio(campo) {
    const valor = campo.value.trim();

    if (valor === "") {
        mostrarError(campo, "Este campo no puede estar vacío.");
        campo.classList.add("input-error");
        return false;
    }

    mostrarError(campo, "");
    campo.classList.remove("input-error");
    return true;
}

function mostrarError(campo, mensaje) {
    if (!campo.id) {
        return;
    }

    const spanError = document.getElementById(campo.id + "-error");

    if (!spanError) {
        return;
    }

    spanError.textContent = mensaje || "";
}
