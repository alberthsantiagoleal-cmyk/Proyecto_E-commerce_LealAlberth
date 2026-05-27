function addToCart(productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  showToast('Producto agregado al carrito 🛒', 'success');
}

function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === id);
  const root = document.getElementById('detailRoot');

  if (!product) {
    root.innerHTML = `
      <div class="not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o fue eliminado.</p>
        <br>
        <button class="btn-back" onclick="location.href='index.html'">← Volver a la tienda</button>
      </div>`;
    return;
  }

  root.innerHTML = `
    <div class="detail-container">
      <img class="detail-image" src="${product.image}" alt="${product.name}">
      <div class="detail-info">
        <span class="detail-category">${product.category}</span>
        <h1 class="detail-name">${product.name}</h1>
        <p class="detail-price">$${Number(product.price).toLocaleString()}</p>
        <p class="detail-description">${product.description}</p>
        <div class="detail-actions">
          <button class="btn-back" onclick="history.back()">← Volver</button>
          <button class="btn-add-cart" onclick="addToCart(${product.id})">
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>`;
}

renderDetail();
