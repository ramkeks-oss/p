function loadRequests() {
  try {
    return JSON.parse(localStorage.getItem('requests') || '[]');
  } catch (e) {
    return [];
  }
}

function saveRequests(requests) {
  localStorage.setItem('requests', JSON.stringify(requests));
}

// Export to global scope
window.loadRequests = loadRequests;
window.saveRequests = saveRequests;

