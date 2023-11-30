document.addEventListener("DOMContentLoaded", () => {
  var usuarioActual = sessionStorage.getItem("usuarioActual");
  document.getElementById("nombreUsuario").textContent = usuarioActual;
  document.getElementById("nombreUsuario2").textContent = usuarioActual;

  const urlParams = new URLSearchParams(window.location.search);
  const estado = urlParams.get("estado");

  actualizarHTML(estado);
});

function cerrarSesion() {
  sessionStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
}

const contenido = document.querySelector("#cardGroup");
const fragment = document.createDocumentFragment();

function actualizarHTML(estado) {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key !== "usuarios" && key !== "usuarioActual") {
      const tutorialesGuardados = JSON.parse(sessionStorage.getItem(key)) || [];

      if (estado === "Guardado" && tutorialesGuardados.estado === "Guardado") {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
          <div class="card-tuto m-2">
            <div class="card-body">
              <h5 class="card-title">${tutorialesGuardados.titulo}</h5>
              <iframe loading="lazy" type="text/html" width="100%" height="280" src="${key}" allowfullscreen frameborder="0"></iframe>
            </div>
            <div class="card-footer">
              <button type="button" class="tutorial-button btn btn-warning" onclick="eliminarTutorial('${key}')" data-tutorial-state="Guardado">
                <i class="bi bi-bookmark"></i>
              </button>
            </div>
          </div>
        `;
        fragment.appendChild(card);
      } else if (
        estado === "Pendiente" &&
        tutorialesGuardados.estado === "Pendiente"
      ) {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
        <div class="card-tuto m-2">
          <div class="card-body">
            <h5 class="card-title">${tutorialesGuardados.titulo}</h5>
            <iframe loading="lazy" type="text/html" width="100%" height="280" src="${key}" allowfullscreen frameborder="0"></iframe>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-primary tutorial-button" data-tutorial-state="Pendiente">
              <i class="bi bi-play-circle"></i>
            </button>
          </div>
        </div>
      `;
        fragment.appendChild(card);
      } else if (
        estado === "VerMastarde" &&
        tutorialesGuardados.estado === "VerMastarde"
      ) {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
        <div class="card-tuto m-2">
          <div class="card-body">
            <h5 class="card-title">${tutorialesGuardados.titulo}</h5>
            <iframe loading="lazy" type="text/html" width="100%" height="280" src="${key}" allowfullscreen frameborder="0"></iframe>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-danger tutorial-button" data-tutorial-state="VerMastarde">
              <i class="bi bi-clock"></i>
            </button>
          </div>
        </div>
      `;
        fragment.appendChild(card);
      }
      contenido.appendChild(fragment);
    }
  }
}
