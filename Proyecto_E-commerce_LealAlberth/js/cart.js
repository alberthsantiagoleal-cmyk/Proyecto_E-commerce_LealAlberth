const cartButton         = document.getElementById('cartButton');
const cartModal          = document.getElementById('cartModal');
const closeCart          = document.getElementById('closeCart');
const cartItems          = document.getElementById('cartItems');
const cartTotal          = document.getElementById('cartTotal');
const buyButton          = document.getElementById('buyButton');
const checkoutForm       = document.getElementById('checkoutForm');
const confirmPurchaseBtn = document.getElementById('confirmPurchaseBtn');

updateCartCount();

cartButton.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
  cartModal.classList.add('cart-opening');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cartModal.classList.remove('cart-opening');
    });
  });
  renderCart();
});

function closeCartModal() {
  cartModal.classList.add('cart-closing');
  cartModal.addEventListener('transitionend', () => {
    cartModal.classList.add('hidden');
    cartModal.classList.remove('cart-closing');
    checkoutForm.classList.add('hidden');
  }, { once: true });
}

closeCart.addEventListener('click', closeCartModal);

buyButton.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    showToast('El carrito está vacío', 'error');
    return;
  }
  checkoutForm.classList.remove('hidden');
});

function addToCart(productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const cart     = JSON.parse(localStorage.getItem('cart')) || [];
  const product  = products.find(p => p.id === productId);
  if (!product) return;
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast('Producto agregado al carrito', 'success');
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    const empty = document.createElement('p');
    empty.className   = 'empty-cart';
    empty.textContent = 'Tu carrito está vacío';
    cartItems.appendChild(empty);
    cartTotal.textContent = 'Total: $0';
    return;
  }

  cart.forEach(product => {
    total += Number(product.price);
    const row = document.createElement('cart-item-row');
    row.setAttribute('product-id', product.id);
    row.setAttribute('name', product.name);
    row.setAttribute('price', product.price);
    row.setAttribute('image', product.image);
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `Total: $${total.toLocaleString()}`;
}

function removeFromCart(productId) {
  let cart    = JSON.parse(localStorage.getItem('cart')) || [];
  const idx   = cart.findIndex(p => p.id === productId);
  if (idx !== -1) cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const cart  = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent    = cart.length;
    badge.style.display  = cart.length > 0 ? 'inline-flex' : 'none';
  }
}

confirmPurchaseBtn.addEventListener('click', () => {
  const customerId      = document.getElementById('customerId').value.trim();
  const customerName    = document.getElementById('customerName').value.trim();
  const customerAddress = document.getElementById('customerAddress').value.trim();
  const customerPhone   = document.getElementById('customerPhone').value.trim();
  const customerEmail   = document.getElementById('customerEmail').value.trim();

  if (!customerId || !customerName || !customerAddress || !customerPhone || !customerEmail) {
    showToast('Todos los campos son obligatorios', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customerEmail)) {
    showToast('El correo electrónico no es válido', 'error');
    return;
  }

  const cart   = JSON.parse(localStorage.getItem('cart')) || [];
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const total  = cart.reduce((sum, p) => sum + Number(p.price), 0);

  orders.push({
    id: Date.now(),
    customer: {
      identification: customerId,
      name:           customerName,
      address:        customerAddress,
      phone:          customerPhone,
      email:          customerEmail,
    },
    products: cart,
    total,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');

  ['customerId', 'customerName', 'customerAddress', 'customerPhone', 'customerEmail'].forEach(id => {
    document.getElementById(id).value = '';
  });

  closeCartModal();
  updateCartCount();
  showToast('Compra realizada con éxito', 'success');
});
