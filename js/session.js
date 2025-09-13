document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const loginBtns = document.querySelectorAll('.login-btn');
  const registerBtns = document.querySelectorAll('.register-btn');

  const navbar = document.querySelector('.navbar-nav');

  if(loggedInUser){
    // Ocultar login y registro
    loginBtns.forEach(btn => btn.style.display = 'none');
    registerBtns.forEach(btn => btn.style.display = 'none');

    // Nombre de usuario con enlace a perfil
    const liUser = document.createElement('li');
    liUser.classList.add('nav-item');
    liUser.innerHTML = `<a class="nav-link btn btn-warning text-white px-3 ms-2" href="perfil.html">${loggedInUser.name}</a>`;
    navbar.appendChild(liUser);

    // Botón de cerrar sesión
    const liLogout = document.createElement('li');
    liLogout.classList.add('nav-item');
    liLogout.innerHTML = `<a class="nav-link btn btn-danger text-white px-3 ms-2" id="logoutBtn" href="#">Cerrar Sesión</a>`;
    navbar.appendChild(liLogout);

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = "index.html";
    });

  } else {
    loginBtns.forEach(btn => btn.style.display = 'block');
    registerBtns.forEach(btn => btn.style.display = 'block');
  }
});
