const ordersList         = document.getElementById('ordersList');
const orderDetailOverlay = document.getElementById('orderDetailOverlay');
const orderDetailTitle   = document.getElementById('orderDetailTitle');
const orderDetailBody    = document.getElementById('orderDetailBody');
const closeOrderDetail   = document.getElementById('closeOrderDetail');

closeOrderDetail.addEventListener('click', () => {
  orderDetailOverlay.classList.add('hidden');
});

orderDetailOverlay.addEventListener('click', (e) => {
  if (e.target === orderDetailOverlay) orderDetailOverlay.classList.add('hidden');
});

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const sorted = [...orders].reverse();
  ordersList.innerHTML = '';

  if (sorted.length === 0) {
    const empty = document.createElement('p');
    empty.className   = 'empty-state';
    empty.textContent = 'No hay pedidos registrados.';
    ordersList.appendChild(empty);
    return;
  }

  sorted.forEach(order => {
    const card = document.createElement('order-card');
    card.setAttribute('order-id', order.id);
    card.setAttribute('date',     order.date);
    card.setAttribute('client',   order.customer.name);
    card.setAttribute('total',    order.total);
    ordersList.appendChild(card);
  });
}

function showOrderDetail(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = orders.find(o => String(o.id) === String(orderId));
  if (!order) return;

  orderDetailTitle.textContent = `Pedido #${order.id}`;
  orderDetailBody.innerHTML    = '';

  // Sección cliente
  const sectionClient = document.createElement('div');
  sectionClient.className = 'order-detail-section';

  const clientTitle = document.createElement('h4');
  clientTitle.textContent = 'Datos del cliente';
  sectionClient.appendChild(clientTitle);

  const clientFields = [
    ['Nombre',         order.customer.name],
    ['Identificación', order.customer.identification],
    ['Dirección',      order.customer.address],
    ['Teléfono',       order.customer.phone],
    ['Email',          order.customer.email],
    ['Fecha',          order.date],
  ];

  clientFields.forEach(([label, value]) => {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(value));
    sectionClient.appendChild(p);
  });

  // Sección productos
  const sectionProducts = document.createElement('div');
  sectionProducts.className = 'order-detail-section';

  const productsTitle = document.createElement('h4');
  productsTitle.textContent = 'Productos';
  sectionProducts.appendChild(productsTitle);

  order.products.forEach(p => {
    const item = document.createElement('div');
    item.className = 'order-product-item';
    const text = document.createElement('p');
    text.textContent = `${p.name} — $${Number(p.price).toLocaleString()}`;
    item.appendChild(text);
    sectionProducts.appendChild(item);
  });

  // Total
  const total = document.createElement('div');
  total.className   = 'order-detail-total';
  total.textContent = `Total: $${Number(order.total).toLocaleString()}`;

  orderDetailBody.append(sectionClient, sectionProducts, total);
  orderDetailOverlay.classList.remove('hidden');
}

renderOrders();
