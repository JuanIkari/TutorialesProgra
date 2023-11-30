const getTutos = async () => {
  const data = await fetch("tutoriales.json");
  const tutorialesData = await data.json();

  for (let i = 0; i < tutorialesData.tutoriales.length; i++) {
    const section = tutorialesData.tutoriales[i];
    const tutosContainer = document.getElementById(`${i + 1}cardGroup`);

    const tutoriales = section.tutoriales;

    const fragment = document.createDocumentFragment();

    tutoriales.forEach((element) => {
      const card = document.createElement("div");
      card.className = "col";
      titulo = element.titulo;
      card.innerHTML = `
      <div class="card-tuto m-2" data-tutorial-id="${element.url}">
        <div class="card-body">
          <h5 class="card-title" data-tutorial-titulo="${element.titulo}">${element.titulo}</h5>
          <iframe loading="lazy" type="text/html" width="100%" height="280" src="${element.url}" allowfullscreen frameborder="0"></iframe>
        </div>
        <div class="card-footer">
          <button type="button" class="tutorial-button btn btn-warning " data-tutorial-state="Guardado">
            <i class="bi bi-bookmark"></i>
          </button>
          <button type="button" class="btn btn-primary tutorial-button" data-tutorial-state="Pendiente">
            <i class="bi bi-play-circle"></i>
          </button>
          <button type="button" class="btn btn-danger tutorial-button" data-tutorial-state="VerMastarde">
            <i class="bi bi-clock"></i>
          </button>
        </div>
      </div>
      `;

      fragment.appendChild(card);
    });
    tutosContainer.appendChild(fragment);

    const tutorialButtons = document.querySelectorAll(".tutorial-button");

    tutorialButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const tutorialState = event.currentTarget.getAttribute(
          "data-tutorial-state"
        );
        const tutorialId = event.currentTarget
          .closest(".card-tuto")
          .getAttribute("data-tutorial-id");

        const tutorialtitulo = event.currentTarget
          .closest(".card-tuto")
          .querySelector(".card-title")
          .getAttribute("data-tutorial-titulo");

        const existingEntry = sessionStorage.getItem(`${tutorialId}`);
        console.log(existingEntry);

        if (tutorialState === "Guardado") {
            sessionStorage.removeItem(`${tutorialId}`);
            sessionStorage.setItem(
              `${tutorialId}`,
              JSON.stringify({ estado: "Guardado", titulo: tutorialtitulo })
            );
        } else if (tutorialState === "Pendiente") {
          sessionStorage.setItem(
            `${tutorialId}`,
            JSON.stringify({ estado: "Pendiente", titulo: tutorialtitulo })
          );
        } else if (tutorialState === "VerMastarde") {
          sessionStorage.setItem(
            `${tutorialId}`,
            JSON.stringify({ estado: "VerMastarde", titulo: tutorialtitulo })
          );
        }
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") e.target.value = "";

    if (e.target.matches("#searchInput")) {
      const searchTerm = e.target.value.toLowerCase();
      const cards = document.querySelectorAll(".card-body");

      cards.forEach((card) => {
        const title = card
          .querySelector(".card-title")
          .textContent.toLowerCase();
        const containsTerm = title.includes(searchTerm);

        card.classList.toggle("filtro", !containsTerm);

        const colDiv = card.closest(".col");
        if (colDiv) {
          colDiv.classList.toggle("filtro", !containsTerm);
        }
      });
    }
  });
  getTutos();
});

const usuarioActual = sessionStorage.getItem("usuarioActual");

function cerrarSesion() {
  sessionStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
}

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
    </li>
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

function toggleDropdown(clickedElement) {
  const dropdownContent = clickedElement.nextElementSibling;
  if (usuarioActual == null) {
    window.location.href = "register.html?from=frontend";
  } else if (dropdownContent.style.display === "") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "";
  }
}
