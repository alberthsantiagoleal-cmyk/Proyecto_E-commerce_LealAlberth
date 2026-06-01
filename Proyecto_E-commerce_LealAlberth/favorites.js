// ══════════════════════════════════════════════
// FUNCIONALIDAD: SISTEMA DE FAVORITOS
// ══════════════════════════════════════════════
// Permite guardar productos favoritos. Agrega un botón
// ❤ en cada tarjeta de producto y un panel lateral
// accesible desde la barra de navegación.
//
// PASO 1 — Abre index.html
//   Busca la línea:  <script src="./js/app.js"></script>
//   Agrega DESPUÉS:  <script src="./favorites.js"></script>
//
// PASO 2 — Abre product-detail.html
//   Busca la línea:  <script src="./js/product-detail.js"></script>
//   Agrega DESPUÉS:  <script src="./favorites.js"></script>
//
// PASO 3 — Abre components/product-card.js
//   Reemplaza estas dos líneas dentro de connectedCallback():
//
//     ANTES (líneas actuales al inicio del método, después de los getAttribute):
//       this.innerHTML = `...<button onclick="addToCart(${id})">+ Agregar al carrito</button>...`;
//
//     DESPUÉS (agrega estas dos líneas ANTES de this.innerHTML):
//       const favActive = window.isFavorite ? window.isFavorite(Number(id)) : false;
//
//     Y reemplaza el <button> de agregar al carrito por este bloque:
//       <div class="card-actions">
//         <button onclick="addToCart(${id})">+ Agregar al carrito</button>
//         <button class="fav-btn ${favActive ? 'fav-active' : ''}" data-fav-id="${id}"
//           onclick="toggleFavorite && toggleFavorite(${id}); this.classList.toggle('fav-active'); this.textContent = this.classList.contains('fav-active') ? '❤' : '♡'">
//           ${favActive ? '❤' : '♡'}
//         </button>
//       </div>
//
// PASO 4 — Abre js/product-detail.js
//   Dentro de renderDetail(), ANTES de la línea root.innerHTML = `...`, agrega:
//     const favActive = window.isFavorite ? window.isFavorite(id) : false;
//
//   Dentro del HTML del detalle, agrega este botón en .detail-actions:
//     <button class="fav-btn" id="detailFavBtn"
//       onclick="toggleFavorite && toggleFavorite(${product.id}); this.classList.toggle('fav-active'); this.textContent = this.classList.contains('fav-active') ? '❤ Guardado' : '♡ Favorito'">
//       ${favActive ? '❤ Guardado' : '♡ Favorito'}
//     </button>
// ══════════════════════════════════════════════

(function () {
  // Botón de favoritos en navbar
  const navbar = document.querySelector('.navbar');
  const favBtn = document.createElement('button');
  favBtn.id = 'favButton';
  favBtn.innerHTML = '❤ Favoritos <span id="favCount" class="cart-badge" style="display:none">0</span>';
  navbar.appendChild(favBtn);

  // Panel de favoritos
  const panel = document.createElement('div');
  panel.id = 'favPanel';
  panel.className = 'cart-modal hidden';
  panel.innerHTML = `
    <div class="cart-content">
      <h2>❤ Favoritos</h2>
      <div id="favItems"></div>
      <button id="closeFav">Cerrar</button>
    </div>`;
  document.body.appendChild(panel);

  favBtn.addEventListener('click', () => {
    panel.classList.remove('hidden');
    renderFavorites();
  });

  document.getElementById('closeFav').addEventListener('click', () => {
    panel.classList.add('hidden');
  });

  function renderFavorites() {
    const favs = getFavorites();
    const container = document.getElementById('favItems');
    container.innerHTML = '';

    if (favs.length === 0) {
      container.innerHTML = '<p class="empty-cart">No tienes favoritos aún</p>';
      return;
    }

    favs.forEach(p => {
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div><h4>${p.name}</h4><p>$${Number(p.price).toLocaleString()}</p></div>
        <button onclick="removeFavorite(${p.id})">✕</button>`;
      container.appendChild(item);
    });
  }

  function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }

  function updateFavCount() {
    const count = getFavorites().length;
    const badge = document.getElementById('favCount');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  window.toggleFavorite = function (productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let favs = getFavorites();
    const idx = favs.findIndex(p => p.id === productId);

    if (idx === -1) {
      favs.push(product);
      showToast('Agregado a favoritos ❤', 'success');
    } else {
      favs.splice(idx, 1);
      showToast('Eliminado de favoritos', 'info');
    }

    localStorage.setItem('favorites', JSON.stringify(favs));
    updateFavCount();
    updateFavButtons();
  };

  window.removeFavorite = function (productId) {
    let favs = getFavorites();
    localStorage.setItem('favorites', JSON.stringify(favs.filter(p => p.id !== productId)));
    updateFavCount();
    renderFavorites();
    updateFavButtons();
  };

  window.isFavorite = function (productId) {
    return getFavorites().some(p => p.id === productId);
  };

  window.updateFavButtons = function () {
    document.querySelectorAll('[data-fav-id]').forEach(btn => {
      const id = Number(btn.dataset.favId);
      btn.textContent = isFavorite(id) ? '❤' : '♡';
      btn.classList.toggle('fav-active', isFavorite(id));
    });
  };

  updateFavCount();
})();
