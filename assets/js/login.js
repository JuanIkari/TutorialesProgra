document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.querySelector("#usuario").value;
    const contraseña = document.querySelector("#contraseña").value;

    fetch("../data/user.json")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].user == usuario && data[i].password == contraseña) {
            sessionStorage.setItem("id", data[i].userId);
            sessionStorage.setItem("user", data[i].user);
            window.location.href = "index.html";
          }else{
            document.querySelector("#error").classList.remove("d-none");
          }
        }
      });
  });
});
