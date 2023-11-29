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
      card.innerHTML = `
        <div class="card m-2">
          <div class="card-body">
            <h5 class="card-title">${element.titulo}</h5>
            <iframe allowfullscreen="true" width="100%" height="280" frameborder="0"></iframe>
          </div>
        </div>
      `;

      fragment.appendChild(card);

      const iframe = card.querySelector("iframe");
      iframe.src = element.url;
    });

    tutosContainer.appendChild(fragment);
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

