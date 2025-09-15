let allRequests = [];

function computeThresholds(requests) {
  const counts = {};
  for (const r of requests) {
    if (r.urgency === 'Обычная' && r.status !== 'Выполнена') {
      const key = r.city + '|' + r.address;
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return counts;
}

function render() {
  allRequests = loadRequests();
  const list = document.getElementById('list');
  list.innerHTML = '';

  const urgencyFilter = document.getElementById('filterUrgency').value;
  const statusFilter = document.getElementById('filterStatus').value;
  const cityFilter = document.getElementById('filterCity').value.trim().toLowerCase();
  const addressFilter = document.getElementById('filterAddress').value.trim().toLowerCase();

  const thresholds = computeThresholds(allRequests);

  let items = allRequests.filter(r => {
    if (urgencyFilter && r.urgency !== urgencyFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    if (cityFilter && !r.city.toLowerCase().includes(cityFilter)) return false;
    if (addressFilter && !r.address.toLowerCase().includes(addressFilter)) return false;
    return true;
  });

  items.sort((a, b) => {
    if (a.urgency === 'Аварийная' && b.urgency !== 'Аварийная') return -1;
    if (a.urgency !== 'Аварийная' && b.urgency === 'Аварийная') return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  for (const r of items) {
    const card = document.createElement('div');
    card.className = 'card' + (r.urgency === 'Аварийная' ? ' urgent' : '');

    const key = r.city + '|' + r.address;
    if (thresholds[key] >= 5) {
      card.classList.add('threshold');
    }

    card.innerHTML = `
      ${r.urgency === 'Аварийная' ? '<div class="badge">Аварийная</div>' : ''}
      <div><strong>${r.city}</strong>, ${r.address}</div>
      <div>Тип: ${r.type}</div>
      <div>Срочность: ${r.urgency}</div>
      <div>Описание: ${r.description || ''}</div>
      ${r.photo ? `<img src="${r.photo}" class="photo">` : ''}
      <div>Статус: 
        <select class="status">
          <option value="Новая" ${r.status === 'Новая' ? 'selected' : ''}>Новая</option>
          <option value="В работе" ${r.status === 'В работе' ? 'selected' : ''}>В работе</option>
          <option value="Выполнена" ${r.status === 'Выполнена' ? 'selected' : ''}>Выполнена</option>
        </select>
      </div>
      <div>Создана: ${new Date(r.createdAt).toLocaleString()}</div>
      ${thresholds[key] >= 5 ? '<div class="threshold-note">Порог 5+: пора выезд</div>' : ''}
    `;

    card.querySelector('.status').addEventListener('change', function (e) {
      r.status = e.target.value;
      saveRequests(allRequests);
      render();
    });

    list.appendChild(card);
  }
}

document.getElementById('filterUrgency').addEventListener('change', render);
document.getElementById('filterStatus').addEventListener('change', render);
document.getElementById('filterCity').addEventListener('input', render);
document.getElementById('filterAddress').addEventListener('input', render);

render();

