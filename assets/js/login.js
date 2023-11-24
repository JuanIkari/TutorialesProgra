document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.querySelector("#usuario").value;
    const contraseña = document.querySelector("#contraseña").value;

    fetch("../data/users.json")
      .then((response) => response.json())
      .then((data) => {
        let accesoPermitido = false;

        for (let i = 0; i < data.length; i++) {
          if (data[i].user == usuario && data[i].password == contraseña) {
            sessionStorage.setItem("id", data[i].userId);
            sessionStorage.setItem("user", data[i].user);
            window.location.href = "index.html";
            accesoPermitido = true;
            break; // Salir del bucle si se encuentra un usuario válido
          }
        }

        if (!accesoPermitido) {
          let danger = document.querySelector("#form");
          danger.innerHTML = `<div class="alert alert-danger , text-center" >ACCESO DENEGADO</div>
          <div class="username">
          <label for="usuario">Usuario</label>
          <input id="usuario" type="text" required />
        </div>
        <div class="username">
          <label for="contraseña">Contraseña</label>
          <input id="contraseña" type="password" required />
        </div>
        <input type="submit" value="Ingresar" class="btn btn-primary" />
        <input type="reset" value="Limpiar" class="btn btn-secondary" />`;
        }
      });
  });
});
