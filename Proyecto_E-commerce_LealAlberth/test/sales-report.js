const SEED_ORDERS = [
  {
    id: 1,
    date: '2025-01-15',
    customer: { name: 'Carlos Pérez', identification: '1001234567', address: 'Calle 10 #5-20', phone: '3001234567', email: 'carlos@email.com' },
    products: [
      { id: 1, name: 'Camiseta Colombia 2026', price: 120000, qty: 2 },
      { id: 10, name: 'Guayos Phantom GX', price: 380000, qty: 1 },
    ],
    total: 620000,
  },
  {
    id: 2,
    date: '2025-01-22',
    customer: { name: 'Laura Gómez', identification: '1009876543', address: 'Carrera 8 #12-45', phone: '3109876543', email: 'laura@email.com' },
    products: [
      { id: 3, name: 'Camiseta Argentina 2026', price: 120000, qty: 1 },
      { id: 8, name: 'Medias Fútbol Blancas', price: 18000, qty: 3 },
      { id: 7, name: 'Short Deportivo Azul', price: 65000, qty: 1 },
    ],
    total: 239000,
  },
  {
    id: 3,
    date: '2025-02-05',
    customer: { name: 'Andrés Torres', identification: '1112223334', address: 'Av. 30 #22-10', phone: '3201112223', email: 'andres@email.com' },
    products: [
      { id: 11, name: 'Guayos Predator Elite', price: 420000, qty: 1 },
      { id: 5, name: 'Jogger Negro', price: 85000, qty: 2 },
    ],
    total: 590000,
  },
  {
    id: 4,
    date: '2025-02-18',
    customer: { name: 'Sofía Ramírez', identification: '1234567890', address: 'Calle 50 #30-15', phone: '3154567890', email: 'sofia@email.com' },
    products: [
      { id: 2, name: 'Camiseta Brasil 2026', price: 120000, qty: 2 },
      { id: 9, name: 'Medias Fútbol Negras', price: 18000, qty: 2 },
      { id: 6, name: 'Pantalón Cargo Gris', price: 95000, qty: 1 },
    ],
    total: 371000,
  },
  {
    id: 5,
    date: '2025-03-10',
    customer: { name: 'Miguel Herrera', identification: '9876543210', address: 'Transversal 15 #8-60', phone: '3009876543', email: 'miguel@email.com' },
    products: [
      { id: 12, name: 'Guayos F50 Elite', price: 390000, qty: 1 },
      { id: 1, name: 'Camiseta Colombia 2026', price: 120000, qty: 1 },
      { id: 8, name: 'Medias Fútbol Blancas', price: 18000, qty: 2 },
    ],
    total: 546000,
  },
  {
    id: 6,
    date: '2025-03-25',
    customer: { name: 'Valentina Cruz', identification: '1122334455', address: 'Calle 80 #45-30', phone: '3181122334', email: 'valentina@email.com' },
    products: [
      { id: 4, name: 'Camiseta Francia 2026', price: 120000, qty: 3 },
      { id: 7, name: 'Short Deportivo Azul', price: 65000, qty: 2 },
    ],
    total: 490000,
  },
];

function seedTestOrders() {
  const existing = JSON.parse(localStorage.getItem('orders')) || [];
  const existingIds = existing.map(o => o.id);
  const toAdd = SEED_ORDERS.filter(o => !existingIds.includes(o.id));
  if (toAdd.length > 0) {
    localStorage.setItem('orders', JSON.stringify([...existing, ...toAdd]));
  }
}

function generateReport() {
  const year  = parseInt(document.getElementById('reportYear').value);
  const month = parseInt(document.getElementById('reportMonth').value);

  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  const filtered = orders.filter(o => {
    const d = new Date(o.date);
    return d.getFullYear() === year && (d.getMonth() + 1) === month;
  });

  const totals = {};

  filtered.forEach(order => {
    order.products.forEach(p => {
      if (!totals[p.id]) {
        totals[p.id] = { id: p.id, name: p.name, qty: 0, total: 0 };
      }
      totals[p.id].qty   += (p.qty || 1);
      totals[p.id].total += Number(p.price) * (p.qty || 1);
    });
  });

  const tbody = document.getElementById('reportBody');
  const summary = document.getElementById('reportSummary');
  tbody.innerHTML = '';

  const rows = Object.values(totals);

  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--muted)">Sin ventas para el período seleccionado</td></tr>';
    summary.textContent = '';
    return;
  }

  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.name}</td>
      <td>${r.qty}</td>
      <td>$${r.total.toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });

  const grandTotal = rows.reduce((s, r) => s + r.total, 0);
  const totalQty   = rows.reduce((s, r) => s + r.qty, 0);
  summary.textContent = `Total unidades: ${totalQty}   |   Total ventas: $${grandTotal.toLocaleString()}`;
}

seedTestOrders();
