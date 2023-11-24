document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formulario = document.querySelector("#form");

  console.log(formulario);
  const datos = new FormData(e.target);

  const datosCompletos = Object.fromEntries(datos.entries());
  console.log(datosCompletos);
});
