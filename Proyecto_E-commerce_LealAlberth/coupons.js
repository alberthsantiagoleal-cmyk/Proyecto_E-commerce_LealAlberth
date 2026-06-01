// ══════════════════════════════════════════════
// FUNCIONALIDAD: CUPONES DE DESCUENTO
// ══════════════════════════════════════════════
// Agrega un campo de cupón dentro del carrito.
// Al aplicar un cupón válido, muestra el precio
// original tachado y el nuevo precio con descuento.
//
// Cupónes disponibles:
//   FLOW10   → 10% de descuento
//   FLOW20   → 20% de descuento
//   STREET15 → 15% de descuento
//
// PASO 1 — Abre index.html
//   Busca la línea:  <script src="./js/app.js"></script>
//   Agrega DESPUÉS:  <script src="./coupons.js"></script>
//
// Eso es todo. No hay que tocar ningún otro archivo.
// ══════════════════════════════════════════════

const COUPONS = {
  'FLOW10':  0.10,
  'FLOW20':  0.20,
  'STREET15': 0.15,
};

(function () {
  // Espera a que el DOM del carrito esté listo
  const observer = new MutationObserver(() => {
    const cartTotal = document.getElementById('cartTotal');
    if (!cartTotal || document.getElementById('couponWrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'couponWrapper';
    wrapper.innerHTML = `
      <div class="coupon-row">
        <input type="text" id="couponInput" placeholder="Código de cupón">
        <button id="applyCoupon">Aplicar</button>
      </div>
      <p id="couponMsg"></p>`;
    cartTotal.insertAdjacentElement('afterend', wrapper);

    document.getElementById('applyCoupon').addEventListener('click', applyCoupon);
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();

let activeDiscount = 0;

function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  const msg = document.getElementById('couponMsg');

  if (!COUPONS[code]) {
    msg.textContent = '❌ Cupón inválido';
    msg.style.color = '#ff5555';
    activeDiscount = 0;
    updateTotalWithDiscount();
    return;
  }

  activeDiscount = COUPONS[code];
  msg.textContent = `✅ Cupón aplicado: ${activeDiscount * 100}% de descuento`;
  msg.style.color = 'var(--accent)';
  updateTotalWithDiscount();
  showToast(`Cupón ${code} aplicado`, 'success');
}

function updateTotalWithDiscount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const subtotal = cart.reduce((sum, i) => sum + Number(i.price) * (i.qty || 1), 0);
  const discount = subtotal * activeDiscount;
  const total = subtotal - discount;

  const cartTotal = document.getElementById('cartTotal');
  if (!cartTotal) return;

  cartTotal.innerHTML = activeDiscount > 0
    ? `<span style="text-decoration:line-through;color:var(--muted);font-size:14px">$${subtotal.toLocaleString()}</span>
       &nbsp; Total: $${total.toLocaleString()}`
    : `Total: $${subtotal.toLocaleString()}`;
}

window.getActiveDiscount = () => activeDiscount;
