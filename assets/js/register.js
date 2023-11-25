const usuariosRegistrados = JSON.parse(sessionStorage.getItem("usuarios")) || [];

const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const usuarioExistente = usuariosRegistrados.find(
    (user) => user.usuario === data.usuario
  );

  if (usuarioExistente) {
    showErrorMessage("USUARIO YA REGISTRADO", "alert-danger");
    return;
  }

  if (data.contraseña !== data.confirmarContraseña) {
    showErrorMessage("LAS CONTRASEÑAS NO COINCIDEN", "alert-danger");
    return;
  }

  usuariosRegistrados.push({
    usuario: data.usuario,
    contraseña: data.contraseña,
  });

  sessionStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

  showErrorMessage("USUARIO REGISTRADO", "alert-info");
  return;
});

function showErrorMessage(message, alertClass) {
  const danger = document.querySelector("#danger");
  danger.innerHTML = `<div class="alert ${alertClass} text-center">${message}</div>`;
}
