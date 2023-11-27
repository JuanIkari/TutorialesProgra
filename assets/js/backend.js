const usuarioActual = sessionStorage.getItem("usuarioActual");

document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = sessionStorage.getItem("usuarioActual");
  const bienvenidoContainer = document.querySelector(
    ".bienvenido-container h1"
  );

  if (usuarioActual) {
    // Si hay un usuario, muestra un mensaje personalizado
    bienvenidoContainer.textContent = `Bienvenido ${usuarioActual}`;
  }
});

function cerrarSesion() {
  sessionStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const navbarNav = document.querySelector(".navbar-nav");

  if (usuarioActual) {
    navbarNav.innerHTML = `
        <li class="nav-item">
          <a href="#" class="nav-link mx-3" onclick="cerrarSesion()">Cerrar sesión (${usuarioActual})</a>
        </li>`;
  } else {
    navbarNav.innerHTML = `
        <li class="nav-item">
          <a href="login.html" class="nav-link">Iniciar sesión</a>
        </li>
        <li class="nav-item">
          <a href="register.html" class="nav-link mx-3">Registrarse</a>
        </li>`;
  }
});