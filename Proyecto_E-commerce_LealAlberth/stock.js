// ══════════════════════════════════════════════
// FUNCIONALIDAD: NOTIFICACIONES DE STOCK
// ══════════════════════════════════════════════
// Asigna stock inicial de 10 unidades a cada producto.
// Al confirmar una compra, descuenta el stock.
// Muestra un badge en las tarjetas: verde (en stock),
// naranja (quedan 3 o menos), rojo (agotado).
// Bloquea agregar al carrito si el producto está agotado.
//
// PASO 1 — Abre index.html
//   Busca la línea:  <script src="./js/app.js"></script>
//   Agrega ANTES:    <script src="./stock.js"></script>
//
// PASO 2 — Abre product-detail.html
//   Busca la línea:  <script src="./js/product-detail.js"></script>
//   Agrega ANTES:    <script src="./stock.js"></script>
//
// PASO 3 — Abre components/product-card.js
//   Agrega esta línea ANTES de this.innerHTML:
//     const stockBadge = window.getStockBadge ? window.getStockBadge(Number(id)) : '';
//   Dentro del product-card-body, después del precio, agrega:
//     ${stockBadge}
//
// PASO 4 — Abre js/product-detail.js
//   Agrega esta línea ANTES de root.innerHTML = `...`:
//     const stockBadge = window.getStockBadge ? window.getStockBadge(id) : '';
//   Dentro del HTML del detalle, después del precio, agrega:
//     ${stockBadge}
// ══════════════════════════════════════════════

const STOCK_LOW_THRESHOLD = 3;

// Inicializa stock en productos que no lo tengan
(function initStock() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  let changed = false;
  products.forEach(p => {
    if (p.stock === undefined) { p.stock = 10; changed = true; }
  });
  if (changed) localStorage.setItem('products', JSON.stringify(products));
})();

// Descuenta stock al confirmar compra
const _origConfirm = document.getElementById('confirmPurchaseBtn');
if (_origConfirm) {
  _origConfirm.addEventListener('click', () => {
    // Se ejecuta después del listener original de cart.js (captura en burbuja)
    setTimeout(decrementStock, 50);
  }, true);
}

function decrementStock() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.length) return; // ya fue vaciado, no hacer nada

  const products = JSON.parse(localStorage.getItem('products')) || [];
  cart.forEach(cartItem => {
    const p = products.find(p => p.id === cartItem.id);
    if (p) p.stock = Math.max(0, (p.stock || 0) - (cartItem.qty || 1));
  });
  localStorage.setItem('products', JSON.stringify(products));
  checkLowStock(products);
}

function checkLowStock(products) {
  products.forEach(p => {
    if (p.stock <= STOCK_LOW_THRESHOLD && p.stock > 0) {
      showToast(`⚠ Stock bajo: ${p.name} (${p.stock} restantes)`, 'info');
    } else if (p.stock === 0) {
      showToast(`❌ Sin stock: ${p.name}`, 'error');
    }
  });
}

// Muestra badge de stock en las cards
window.getStockBadge = function (productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const p = products.find(p => p.id === productId);
  if (!p || p.stock === undefined) return '';
  if (p.stock === 0) return '<span class="stock-badge out">Sin stock</span>';
  if (p.stock <= STOCK_LOW_THRESHOLD) return `<span class="stock-badge low">⚠ ${p.stock} restantes</span>`;
  return `<span class="stock-badge ok">✓ En stock</span>`;
};

// Bloquea agregar al carrito si no hay stock
// Espera a que addToCart esté definido (puede venir de cart.js o cart-qty.js)
window.addEventListener('load', () => {
  const _origAddToCart = window.addToCart;
  if (!_origAddToCart) return;
  window.addToCart = function (productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const p = products.find(p => p.id === productId);
    if (p && p.stock === 0) {
      showToast('Este producto está agotado', 'error');
      return;
    }
    _origAddToCart(productId);
  };
});
