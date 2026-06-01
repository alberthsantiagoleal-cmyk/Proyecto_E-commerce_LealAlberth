// ══════════════════════════════════════════════
// FUNCIONALIDAD: MODO OSCURO / CLARO
// ══════════════════════════════════════════════
// Agrega un botón en la barra de navegación para
// cambiar entre modo oscuro y claro. La preferencia
// se guarda y se recuerda al recargar la página.
//
// PASO 1 — Abre index.html
//   Busca la línea:  <script src="./js/app.js"></script>
//   Agrega DESPUÉS:  <script src="./theme.js"></script>
//
// PASO 2 — Abre product-detail.html
//   Busca la línea:  <script src="./js/product-detail.js"></script>
//   Agrega DESPUÉS:  <script src="./theme.js"></script>
//
// Eso es todo. No hay que tocar ningún otro archivo.
// ══════════════════════════════════════════════

(function () {
  const navbar = document.querySelector('.navbar');
  const btn = document.createElement('button');
  btn.id = 'themeToggle';
  btn.setAttribute('aria-label', 'Cambiar tema');
  navbar.appendChild(btn);

  const lightVars = {
    '--bg':           '#f4f4f4',
    '--surface':      '#ffffff',
    '--surface2':     '#ebebeb',
    '--border':       '#d0d0d0',
    '--text':         '#111111',
    '--muted':        '#666666',
    '--glass':        'rgba(0,0,0,0.03)',
    '--glass-border': 'rgba(0,0,0,0.1)',
  };

  function applyTheme(dark) {
    const root = document.documentElement;
    if (dark) {
      Object.keys(lightVars).forEach(k => root.style.removeProperty(k));
      btn.textContent = '☀ Claro';
    } else {
      Object.entries(lightVars).forEach(([k, v]) => root.style.setProperty(k, v));
      btn.textContent = '🌙 Oscuro';
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : true;
  applyTheme(isDark);

  btn.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'dark';
    applyTheme(current !== 'dark');
  });
})();
