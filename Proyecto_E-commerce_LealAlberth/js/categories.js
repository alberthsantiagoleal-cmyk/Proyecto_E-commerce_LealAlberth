const addCategoryBtn        = document.getElementById('addCategoryBtn');
const categoryFormContainer = document.getElementById('categoryFormContainer');
const saveCategoryBtn       = document.getElementById('saveCategoryBtn');
const cancelCategoryBtn     = document.getElementById('cancelCategoryBtn');
const categoriesList        = document.getElementById('categoriesList');

let editingCategoryId = null;

addCategoryBtn.addEventListener('click', () => {
  categoryFormContainer.classList.toggle('hidden');
});

cancelCategoryBtn.addEventListener('click', () => {
  clearCategoryForm();
});

saveCategoryBtn.addEventListener('click', () => {
  const name        = document.getElementById('categoryName').value.trim();
  const description = document.getElementById('categoryDescription').value.trim();

  if (!name || !description) {
    showToast('Todos los campos son obligatorios', 'error');
    return;
  }

  const categories = JSON.parse(localStorage.getItem('categories')) || [];

  if (editingCategoryId) {
    const updated = categories.map(c =>
      c.id === editingCategoryId ? { ...c, name, description } : c
    );
    localStorage.setItem('categories', JSON.stringify(updated));
    editingCategoryId = null;
    showToast('Categoría actualizada', 'success');
  } else {
    categories.push({ id: Date.now(), name, description });
    localStorage.setItem('categories', JSON.stringify(categories));
    showToast('Categoría creada', 'success');
  }

  clearCategoryForm();
  renderCategories();
});

function renderCategories() {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  categoriesList.innerHTML = '';

  if (categories.length === 0) {
    const empty = document.createElement('p');
    empty.className   = 'empty-state';
    empty.textContent = 'No hay categorías registradas.';
    categoriesList.appendChild(empty);
    return;
  }

  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'admin-card';

    const info = document.createElement('div');
    info.className = 'admin-card-info';

    const h3 = document.createElement('h3');
    h3.textContent = category.name;

    const desc = document.createElement('p');
    desc.textContent = category.description;

    info.appendChild(h3);
    info.appendChild(desc);

    const actions = document.createElement('div');
    actions.className = 'admin-card-actions';

    const btnEdit = document.createElement('button');
    btnEdit.className   = 'btn-edit';
    btnEdit.textContent = 'Editar';
    btnEdit.addEventListener('click', () => editCategory(category.id));

    const btnDelete = document.createElement('button');
    btnDelete.className   = 'btn-delete';
    btnDelete.textContent = 'Eliminar';
    btnDelete.addEventListener('click', () => deleteCategory(category.id));

    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);

    card.appendChild(info);
    card.appendChild(actions);
    categoriesList.appendChild(card);
  });
}

function editCategory(id) {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  const category   = categories.find(c => c.id === id);
  document.getElementById('categoryName').value        = category.name;
  document.getElementById('categoryDescription').value = category.description;
  categoryFormContainer.classList.remove('hidden');
  editingCategoryId = id;
}

function deleteCategory(id) {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  localStorage.setItem('categories', JSON.stringify(categories.filter(c => c.id !== id)));
  renderCategories();
  showToast('Categoría eliminada', 'info');
}

function clearCategoryForm() {
  document.getElementById('categoryName').value        = '';
  document.getElementById('categoryDescription').value = '';
  categoryFormContainer.classList.add('hidden');
  editingCategoryId = null;
}

renderCategories();
