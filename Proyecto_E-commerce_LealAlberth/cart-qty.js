// ══════════════════════════════════════════════
// FUNCIONALIDAD: CANTIDADES EN EL CARRITO
// ══════════════════════════════════════════════
// Reemplaza la lógica del carrito para que en vez de
// agregar productos duplicados, muestre botones + y -
// para controlar la cantidad de cada producto.
//
// PASO 1 — Abre index.html
//   Busca la línea:  <script src="./js/cart.js"></script>
//   Agrega DESPUÉS:  <script src="./cart-qty.js"></script>
//
// PASO 2 — Abre product-detail.html
//   Busca la línea:  <script src="./js/product-detail.js"></script>
//   Agrega ANTES:    <script src="./cart-qty.js"></script>
//
// Eso es todo. No hay que tocar ningún otro archivo.
// ══════════════════════════════════════════════

// Sobreescribe addToCart para usar qty
window.addToCart = function (productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(i => i.id === productId);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast('Producto agregado al carrito', 'success');
};

// Sobreescribe removeFromCart para decrementar qty
window.removeFromCart = function (productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i => i.id === productId);

  if (item && item.qty > 1) {
    item.qty -= 1;
  } else {
    cart = cart.filter(i => i.id !== productId);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
};

window.increaseQty = function (productId) {
  window.addToCart(productId);
  renderCart();
};

// Sobreescribe updateCartCount para contar unidades totales
window.updateCartCount = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'inline-flex' : 'none';
  }
};

// Sobreescribe renderCart para mostrar qty y controles
window.renderCart = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    cartTotal.textContent = 'Total: $0';
    return;
  }

  cart.forEach(item => {
    total += Number(item.price) * (item.qty || 1);
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>$${Number(item.price).toLocaleString()}</p>
      </div>
      <div class="qty-controls">
        <button onclick="removeFromCart(${item.id})">−</button>
        <span>${item.qty || 1}</span>
        <button onclick="increaseQty(${item.id})">+</button>
      </div>`;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `Total: $${total.toLocaleString()}`;
};

updateCartCount();
