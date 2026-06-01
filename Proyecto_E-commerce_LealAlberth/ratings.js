// ══════════════════════════════════════════════
// FUNCIONALIDAD: SISTEMA DE CALIFICACIONES
// ══════════════════════════════════════════════
// Permite calificar productos con estrellas (1 a 5)
// desde la página de detalle. El promedio de estrellas
// se puede mostrar también en las tarjetas del inicio.
//
// PASO 1 — Abre product-detail.html
//   Busca la línea:  <script src="./js/product-detail.js"></script>
//   Agrega ANTES:    <script src="./ratings.js"></script>
//
// PASO 2 — Abre js/product-detail.js
//   Dentro del HTML de root.innerHTML, agrega este div
//   justo después de la línea del precio:
//     <div id="ratingBox"></div>
//
//   Después de la línea root.innerHTML = `...`; agrega:
//     if (window.renderRating) renderRating(id, 'ratingBox');
//
// OPCIONAL — Mostrar promedio en las tarjetas del inicio:
//   Abre index.html y agrega ANTES de app.js:
//     <script src="./ratings.js"></script>
//   Abre components/product-card.js y agrega
//   ANTES de this.innerHTML:
//     const avgRating = window.getAvgRating ? window.getAvgRating(Number(id)) : null;
//   Dentro del product-card-body, después del precio:
//     ${avgRating ? `<p class="card-rating">★ ${avgRating}</p>` : ''}
// ══════════════════════════════════════════════

window.renderRating = function (productId, containerId) {
  const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
  const productRatings = ratings[productId] || [];
  const avg = productRatings.length
    ? (productRatings.reduce((a, b) => a + b, 0) / productRatings.length).toFixed(1)
    : null;

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="rating-stars">
      ${[1, 2, 3, 4, 5].map(star => `
        <span class="star ${avg && star <= Math.round(avg) ? 'filled' : ''}"
              onclick="rateProduct(${productId}, ${star}, '${containerId}')">★</span>
      `).join('')}
      <span class="rating-count">${avg ? `${avg} (${productRatings.length})` : 'Sin calificaciones'}</span>
    </div>`;
};

window.rateProduct = function (productId, stars, containerId) {
  const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
  if (!ratings[productId]) ratings[productId] = [];
  ratings[productId].push(stars);
  localStorage.setItem('ratings', JSON.stringify(ratings));
  showToast(`Calificaste con ${stars} ★`, 'success');
  renderRating(productId, containerId);
};

window.getAvgRating = function (productId) {
  const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
  const arr = ratings[productId] || [];
  if (!arr.length) return null;
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
};
