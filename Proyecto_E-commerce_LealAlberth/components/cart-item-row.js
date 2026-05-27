class CartItemRow extends HTMLElement {
  connectedCallback() {
    const productId = this.getAttribute('product-id');
    const name      = this.getAttribute('name');
    const price     = this.getAttribute('price');
    const image     = this.getAttribute('image');

    this.innerHTML = `
      <div class="cart-item">
        <img src="${image}" alt="${name}">
        <div>
          <h4>${name}</h4>
          <p>$${Number(price).toLocaleString()}</p>
        </div>
        <button onclick="removeFromCart(${productId})">✕</button>
      </div>`;
  }
}

customElements.define('cart-item-row', CartItemRow);
