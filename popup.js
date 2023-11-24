// popup.js
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fillForm').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'fillForm' });

      // Example: Sending data to Django server
      fetch('http://localhost:8000/criskoweb/parse_html/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: 'John', lastName: 'Doe' }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data sent to Django server:', data);
      })
      .catch(error => {
        console.error('Error sending data to Django server:', error);
      });
    });
  });
});
