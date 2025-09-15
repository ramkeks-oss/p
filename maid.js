document.getElementById('requestForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const city = document.getElementById('city').value.trim();
  const address = document.getElementById('address').value.trim();
  const type = document.getElementById('type').value;
  const urgency = document.getElementById('urgency').value;
  const description = document.getElementById('description').value.trim();
  const photoInput = document.getElementById('photo');
  const message = document.getElementById('message');

  const request = {
    id: Date.now(),
    city,
    address,
    type,
    urgency,
    description,
    status: 'Новая',
    createdAt: new Date().toISOString(),
  };

  function save(photoData) {
    if (photoData) {
      request.photo = photoData;
    }
    const requests = loadRequests();
    requests.push(request);
    saveRequests(requests);
    document.getElementById('requestForm').reset();
    message.textContent = 'Заявка создана';
    setTimeout(() => message.textContent = '', 3000);
  }

  if (photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => save(reader.result);
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    save(null);
  }
});

