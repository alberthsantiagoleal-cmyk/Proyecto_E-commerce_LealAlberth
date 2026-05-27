const addProductBtn        = document.getElementById('addProductBtn');
const productFormContainer = document.getElementById('productFormContainer');
const saveProductBtn       = document.getElementById('saveProductBtn');
const cancelProductBtn     = document.getElementById('cancelProductBtn');
const productsList         = document.getElementById('productsList');
const productCategory      = document.getElementById('productCategory');

let editingProductId = null;

addProductBtn.addEventListener('click', () => {
  loadCategoriesInSelect();
  productFormContainer.classList.toggle('hidden');
});

cancelProductBtn.addEventListener('click', () => {
  clearProductForm();
});

function loadCategoriesInSelect() {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  productCategory.innerHTML = '';
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = 'Seleccione categoría';
  productCategory.appendChild(defaultOpt);
  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value       = c.name;
    opt.textContent = c.name;
    productCategory.appendChild(opt);
  });
}

saveProductBtn.addEventListener('click', () => {
  const code        = document.getElementById('productCode').value.trim();
  const name        = document.getElementById('productName').value.trim();
  const category    = productCategory.value;
  const price       = document.getElementById('productPrice').value;
  const image       = document.getElementById('productImage').value.trim();
  const description = document.getElementById('productDescription').value.trim();

  if (!code || !name || !category || !price || !image || !description) {
    showToast('Todos los campos son obligatorios', 'error');
    return;
  }
  if (Number(price) < 0) {
    showToast('El precio no puede ser negativo', 'error');
    return;
  }
  if (!image.startsWith('http')) {
    showToast('La URL de la imagen no es válida', 'error');
    return;
  }

  const products = JSON.parse(localStorage.getItem('products')) || [];

  if (editingProductId) {
    const updated = products.map(p =>
      p.id === editingProductId ? { ...p, code, name, category, price, image, description } : p
    );
    localStorage.setItem('products', JSON.stringify(updated));
    editingProductId = null;
    showToast('Producto actualizado', 'success');
  } else {
    products.push({ id: Date.now(), code, name, category, price, image, description });
    localStorage.setItem('products', JSON.stringify(products));
    showToast('Producto creado', 'success');
  }

  clearProductForm();
  renderProducts();
});

function renderProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  productsList.innerHTML = '';

  if (products.length === 0) {
    const empty = document.createElement('p');
    empty.className  = 'empty-state';
    empty.textContent = 'No hay productos registrados.';
    productsList.appendChild(empty);
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'admin-card';

    const img = document.createElement('img');
    img.src       = product.image;
    img.alt       = product.name;
    img.className = 'admin-card-img';

    const info = document.createElement('div');
    info.className = 'admin-card-info';

    const h3 = document.createElement('h3');
    h3.textContent = product.name;

    const pCode = document.createElement('p');
    pCode.textContent = `Código: ${product.code}`;

    const pCat = document.createElement('p');
    pCat.textContent = `Categoría: ${product.category}`;

    const pPrice = document.createElement('p');
    pPrice.textContent = `Precio: $${Number(product.price).toLocaleString()}`;

    const pDesc = document.createElement('p');
    pDesc.textContent = product.description;

    info.append(h3, pCode, pCat, pPrice, pDesc);

    const actions = document.createElement('div');
    actions.className = 'admin-card-actions';

    const btnEdit = document.createElement('button');
    btnEdit.className   = 'btn-edit';
    btnEdit.textContent = 'Editar';
    btnEdit.addEventListener('click', () => editProduct(product.id));

    const btnDelete = document.createElement('button');
    btnDelete.className   = 'btn-delete';
    btnDelete.textContent = 'Eliminar';
    btnDelete.addEventListener('click', () => deleteProduct(product.id));

    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);

    card.append(img, info, actions);
    productsList.appendChild(card);
  });
}

function editProduct(id) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product  = products.find(p => p.id === id);
  loadCategoriesInSelect();
  document.getElementById('productCode').value        = product.code;
  document.getElementById('productName').value        = product.name;
  productCategory.value                               = product.category;
  document.getElementById('productPrice').value       = product.price;
  document.getElementById('productImage').value       = product.image;
  document.getElementById('productDescription').value = product.description;
  productFormContainer.classList.remove('hidden');
  editingProductId = id;
}

function deleteProduct(id) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  localStorage.setItem('products', JSON.stringify(products.filter(p => p.id !== id)));
  renderProducts();
  showToast('Producto eliminado', 'info');
}

function clearProductForm() {
  ['productCode', 'productName', 'productPrice', 'productImage', 'productDescription'].forEach(id => {
    document.getElementById(id).value = '';
  });
  productCategory.value = '';
  productFormContainer.classList.add('hidden');
  editingProductId = null;
}

loadCategoriesInSelect();
renderProducts();
