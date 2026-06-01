// ══════════════════════════════════════════════
// FUNCIONALIDAD: BÚSQUEDA AVANZADA
// ══════════════════════════════════════════════
// Mejora el buscador para que encuentre productos
// por nombre, categoría o descripción (no solo nombre).
// También respeta el filtro de categoría activo.
//
// PASO 1 — Abre js/app.js
//   Busca este bloque y comentálo completo (pon // al inicio de cada línea):
//
//     let scrollDebounce = null;
//     searchInput.addEventListener('input', () => {
//       ...
//     });
//
//   Razón: advanced-search.js reemplaza ese buscador con uno mejorado.
//   Si no lo comentas, ambos se ejecutan a la vez y los resultados se pisan.
//
// PASO 2 — Abre index.html
//   Busca la línea:  <script src="./js/app.js"></script>
//   Agrega DESPUÉS:  <script src="./advanced-search.js"></script>
// ══════════════════════════════════════════════

(function () {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  // Reemplaza el listener básico de app.js
  const newInput = searchInput.cloneNode(true);
  newInput.placeholder = 'Buscar por nombre, categoría o descripción...';
  newInput.style.width = '360px';
  searchInput.replaceWith(newInput);

  let debounce = null;

  newInput.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const query = newInput.value.toLowerCase().trim();
      const category = document.getElementById('categoryFilter')?.value || '';
      const products = JSON.parse(localStorage.getItem('products')) || [];

      const filtered = products.filter(p => {
        const matchCat = !category || p.category === category;
        const matchQuery = !query ||
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query));
        return matchCat && matchQuery;
      });

      renderProducts(filtered);

      if (query) {
        const rect = document.getElementById('productsContainer')?.getBoundingClientRect();
        if (rect && (rect.top > window.innerHeight || rect.top < 0)) {
          document.getElementById('productsContainer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 300);
  });
})();
