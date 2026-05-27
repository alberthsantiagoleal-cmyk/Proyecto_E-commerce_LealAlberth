class OrderCard extends HTMLElement {
  connectedCallback() {
    const orderId   = this.getAttribute('order-id');
    const date      = this.getAttribute('date');
    const client    = this.getAttribute('client');
    const total     = this.getAttribute('total');

    this.innerHTML = `
      <div class="order-card">
        <div class="order-card-row">
          <div>
            <h3>Pedido #${orderId}</h3>
            <p><strong>Fecha:</strong> ${date}</p>
            <p><strong>Cliente:</strong> ${client}</p>
            <p><strong>Total:</strong> $${Number(total).toLocaleString()}</p>
          </div>
          <button class="btn-edit" onclick="showOrderDetail('${orderId}')">Ver detalle</button>
        </div>
      </div>`;
  }
}

customElements.define('order-card', OrderCard);
