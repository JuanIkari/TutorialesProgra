document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Obtén la información almacenada en sessionStorage
    const usuariosRegistrados = JSON.parse(sessionStorage.getItem('usuarios')) || [];

    // Verifica si las credenciales coinciden con algún usuario registrado
    const usuarioExistente = usuariosRegistrados.find(user => user.usuario === data.usuario && user.contraseña === data.contraseña);

    if (usuarioExistente) {
      // Inicia sesión exitosamente
      sessionStorage.setItem('usuarioActual', data.usuario);
      window.location.href = 'index.html';
    } else {
      // Credenciales incorrectas
      const danger = document.querySelector("#danger");
      danger.innerHTML = `<div class="alert alert-danger , text-center">ACCESO DENEGADO</div>`;
    }
  });
});
