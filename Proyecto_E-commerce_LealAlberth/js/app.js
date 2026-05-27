const productsContainer = document.getElementById('productsContainer');
const searchInput       = document.getElementById('searchInput');
const categoryFilter    = document.getElementById('categoryFilter');

function renderProducts(productsToRender) {
  productsContainer.innerHTML = '';
  productsToRender.forEach(product => {
    const card = document.createElement('product-card');
    card.setAttribute('product-id', product.id);
    card.setAttribute('name',       product.name);
    card.setAttribute('price',      product.price);
    card.setAttribute('image',      product.image);
   productsContainer.appendChild(card);
  });
}

function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  renderProducts(products);
}

function loadCategories() {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  categoryFilter.innerHTML = '';
  const defaultOpt = document.createElement('option');
  defaultOpt.value       = '';
  defaultOpt.textContent = 'Todas las categorías';
  categoryFilter.appendChild(defaultOpt);
  categories.forEach(category => {
    const opt = document.createElement('option');
    opt.value       = category.name;
    opt.textContent = category.name;
    categoryFilter.appendChild(opt);
  });
}

// BUSCADOR
let scrollDebounce = null;

searchInput.addEventListener('input', () => {
  const products   = JSON.parse(localStorage.getItem('products')) || [];
  const searchText = searchInput.value.toLowerCase();
  const filtered   = products.filter(p => p.name.toLowerCase().includes(searchText));
  renderProducts(filtered);

  if (searchText.length > 0) {
    clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(() => {
      const rect = productsContainer.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.top < 0) {
        productsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400);
  }
});

// FILTRAR CATEGORÍA
categoryFilter.addEventListener('change', () => {
  const products         = JSON.parse(localStorage.getItem('products')) || [];
  const selectedCategory = categoryFilter.value;
  if (selectedCategory === '') {
    renderProducts(products);
    return;
  }
  renderProducts(products.filter(p => p.category === selectedCategory));
});

loadProducts();
loadCategories();
