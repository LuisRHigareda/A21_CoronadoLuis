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

function llenarNacionalidad(){
    const nacionalidad = document.getElementById("nationality");
    
    for(let{key, name} of NACIONALIDADES_ACEPTADAS){
        const option = document.createElement("option");
        option.value = key;
        option.innerHTML = name;
        nacionalidad.appendChild(option);
    }
}

function resaltar(evento){
    evento.target.classList.add("selected");
}

function noResaltar(evento){
    const clase = evento.target.classList.contains("selected");
    if(clase){
        evento.target.classList.remove("selected");
    }
}

function resaltarDesresaltar(evento){
    evento.target.classList.toggle("selected");
}