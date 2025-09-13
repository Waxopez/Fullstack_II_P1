// ======================
// Manejo de Usuarios
// ======================
let users = JSON.parse(localStorage.getItem('users')) || [];

// ------------------ FUNCIÓN PARA MOSTRAR MENSAJES ------------------
function showMessage(containerId, type, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
  }
}

// ------------------ REGISTRO ------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Validaciones
    if (name.length < 3) {
      showMessage("registerMessage", "danger", "El nombre debe tener al menos 3 caracteres.");
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      showMessage("registerMessage", "danger", "Por favor, ingresa un correo válido.");
      return;
    }
    if (password.length < 6) {
      showMessage("registerMessage", "danger", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      showMessage("registerMessage", "danger", "Las contraseñas no coinciden.");
      return;
    }

    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      showMessage("registerMessage", "warning", "⚠️ El usuario ya existe. Intenta con otro correo o inicia sesión.");
      return;
    }

    // Guardar usuario
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    showMessage("registerMessage", "success", "✅ Registro exitoso. Redirigiendo al login...");

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
}

// ------------------ LOGIN ------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email);

    if (!user) {
      showMessage("loginMessage", "danger", "Usuario no encontrado. Por favor regístrate primero.");
      return;
    }

    if (user.password !== password) {
      showMessage("loginMessage", "danger", "Contraseña incorrecta.");
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
    window.location.href = "perfil.html";
  });
}

// ------------------ PERFIL ------------------
const userInfo = document.getElementById('userInfo');
if (userInfo) {
  const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedUser) {
    userInfo.innerHTML = `Hola <strong>${loggedUser.name}</strong> (${loggedUser.email})`;
  } else {
    window.location.href = "login.html";
  }
}

// ------------------ LOGOUT ------------------
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
  });
}
