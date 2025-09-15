function getRequests() {
  return JSON.parse(localStorage.getItem('requests') || '[]');
}

function saveRequest(request) {
  const requests = getRequests();
  requests.push(request);
  localStorage.setItem('requests', JSON.stringify(requests));
}

function saveRequests(requests) {
  localStorage.setItem('requests', JSON.stringify(requests));
}
