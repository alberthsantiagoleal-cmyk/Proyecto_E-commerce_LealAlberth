const loginForm      = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const dashboard      = document.getElementById('dashboard');
const logoutBtn      = document.getElementById('logoutBtn');

// Credenciales definidas una sola vez como constantes del módulo
const ADMIN_EMAIL    = atob('YWRtaW5AbWFpbC5jb20=');
const ADMIN_PASSWORD = atob('MTIzNDU2');

checkLogin();

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem('isAdminLogged', 'true');
    showDashboard();
    showToast('Bienvenido administrador', 'success');
  } else {
    showToast('Correo o contraseña incorrectos', 'error');
  }
});

function checkLogin() {
  if (localStorage.getItem('isAdminLogged') === 'true') showDashboard();
}

function showDashboard() {
  loginContainer.classList.add('hidden');
  dashboard.classList.remove('hidden');
  initSidebar();
}

function initSidebar() {
  const items = document.querySelectorAll('.sidebar-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const module = item.dataset.module;
      document.querySelectorAll('.module').forEach(m => m.classList.add('hidden'));
      document.getElementById(`module-${module}`).classList.remove('hidden');
    });
  });
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('isAdminLogged');
  location.reload();
});
