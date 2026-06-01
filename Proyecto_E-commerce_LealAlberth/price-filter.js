// ══════════════════════════════════════════════
// FUNCIONALIDAD: FILTRO POR RANGO DE PRECIOS
// ══════════════════════════════════════════════
// Agrega dos campos (precio mínimo y máximo) junto al
// filtro de categoría. Funciona combinado con la
// categoría seleccionada al mismo tiempo.
//
// PASO 1 — Abre js/app.js
//   Busca este bloque y comentálo completo (pon // al inicio de cada línea):
//
//     categoryFilter.addEventListener('change', () => {
//       const products         = JSON.parse(localStorage.getItem('products')) || [];
//       const selectedCategory = categoryFilter.value;
//       if (selectedCategory === '') {
//         renderProducts(products);
//         return;
//       }
//       renderProducts(products.filter(p => p.category === selectedCategory));
//     });
//
//   Razón: price-filter.js ya maneja el filtro de categoría internamente.
//   Si no lo comentas, ambos listeners chocan y el filtro no funciona bien.
//
// PASO 2 — Abre index.html
//   Busca la línea:  <script src="./js/app.js"></script>
//   Agrega DESPUÉS:  <script src="./price-filter.js"></script>
// ══════════════════════════════════════════════

(function () {
  const filtersSection = document.querySelector('.filters');

  const wrapper = document.createElement('div');
  wrapper.id = 'priceFilterWrapper';
  wrapper.innerHTML = `
    <input type="number" id="priceMin" placeholder="Precio mín" min="0">
    <span>—</span>
    <input type="number" id="priceMax" placeholder="Precio máx" min="0">
    <button id="applyPriceFilter">Filtrar</button>
    <button id="clearPriceFilter">✕</button>
  `;
  filtersSection.appendChild(wrapper);

  function applyFilters() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const category = document.getElementById('categoryFilter').value;
    const min = Number(document.getElementById('priceMin').value) || 0;
    const max = Number(document.getElementById('priceMax').value) || Infinity;

    const filtered = products.filter(p => {
      const price = Number(p.price);
      const matchCat = !category || p.category === category;
      const matchPrice = price >= min && price <= max;
      return matchCat && matchPrice;
    });

    renderProducts(filtered);
  }

  document.getElementById('applyPriceFilter').addEventListener('click', applyFilters);

  document.getElementById('clearPriceFilter').addEventListener('click', () => {
    document.getElementById('priceMin').value = '';
    document.getElementById('priceMax').value = '';
    applyFilters();
  });

  // Re-aplicar precio cuando cambia categoría
  document.getElementById('categoryFilter').addEventListener('change', applyFilters);
})();
