class ProductCard extends HTMLElement {
  connectedCallback() {
    const id    = this.getAttribute('product-id');
    const name  = this.getAttribute('name');
    const price = this.getAttribute('price');
    const image = this.getAttribute('image');

    this.innerHTML = `
      <div class="product-card">
        <a href="product-detail.html?id=${id}" class="product-card-link">
          <div class="product-card-img-wrap">
            <img src="${image}" alt="${name}" loading="lazy">
          </div>
          <div class="product-card-body">
            <h3>${name}</h3>
            <p class="price">$${Number(price).toLocaleString()}</p>
          </div>
        </a>
        <button onclick="addToCart(${id})">+ Agregar al carrito</button>
      </div>`;
  }
}

customElements.define('product-card', ProductCard);
