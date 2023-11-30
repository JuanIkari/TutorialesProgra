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
        <div class="fondo1 dropdown">
          <a href="#" class="nav-link mx-3 dropdown-toggle" id="perfilDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="assets/images/perfil.jpg" alt="Perfil" class="perfil-imagen"> ${usuarioActual}
          </a>
          <ul class="dropdown-menu navbar-dark bg-dark" aria-labelledby="perfilDropdown">
            <li><a class="fondo2 dropdown-item" href="perfil.html" style="color: white;"><i class="bi bi-person-circle"></i> Ver perfil</a></li>
            <li><a class="fondo2 dropdown-item" href="#" onclick="cerrarSesion()" style="color: white;"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</a></li>
          </ul>
        </div>
      /li>
    `;
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
