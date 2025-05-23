const defaultItems = [
  "Паспорт/лична карта",
  "Билети",
  "Портфейл и пари",
  "Банкови карти",
  "Телефон",
  "Зарядно за телефон",
  "Ключове",
  "Четка и паста за зъби",
  "Дрехи",
  "Тоалетни принадлежности",
  "Лекарства",
  "Слушалки"
];

function getItems() {
  return JSON.parse(localStorage.getItem('packingList') || 'null') || defaultItems.map(text => ({text, checked: false}));
}

function saveItems(items) {
  localStorage.setItem('packingList', JSON.stringify(items));
}

function renderList() {
  const list = document.getElementById('packing-list');
  list.innerHTML = '';
  const items = getItems();
  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label style="cursor:pointer;">
        <input type="checkbox" ${item.checked ? 'checked' : ''} data-idx="${idx}">
        <span style="${item.checked ? 'text-decoration:line-through;color:#888;' : ''}">${item.text}</span>
      </label>
    `;
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderList();

  document.getElementById('packing-list').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const idx = e.target.getAttribute('data-idx');
      const items = getItems();
      items[idx].checked = e.target.checked;
      saveItems(items);
      renderList();
    }
  });

  document.getElementById('add-item-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-item-input');
    const text = input.value.trim();
    if (text) {
      const items = getItems();
      items.push({text, checked: false});
      saveItems(items);
      input.value = '';
      renderList();
    }
  });

  document.getElementById('reset-list')?.addEventListener('click', () => {
    localStorage.removeItem('packingList');
    renderList();
  });
});