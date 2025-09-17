// Este script se encarga de eliminar la clase "container" del body al cargar la página.
// Esto se hace para evitar conflictos de estilos o para aplicar un estilo específico
// que no debe ser afectado por la clase "container" definida en otros CSS.
onload = () => {
    document.body.classList.remove("container");
};