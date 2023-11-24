// content.js
console.log('Content script loaded');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'fillForm') {
    // Implement code to interact with the job application form
    // For example, use document.querySelector to select form elements and fill them
    document.getElementById('first_name').value = 'John';
    document.getElementById('last_name').value = 'Doe';
  }
});
