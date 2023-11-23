const formulario = document.querySelector('#formulario');

const procesaTodo = (e) => {
    e.preventDefault();
    const datos = new FormData(e.target);
    console.log(e.target);
}