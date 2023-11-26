document.getElementById('login').addEventListener('click', async (event) => {
  // Your existing code goes here
  const response = await chrome.runtime.sendMessage({request: "sessionid"});
  if (response.sessionid !== null) {
      event.stopPropagation();

      fetch('http://localhost:8000/criskoweb/extension_login/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ video_url: window.location.href, sessionid: response.sessionid })
      });
  } else {
      // if the session id is null, open the Django login page in a new tab
      window.open('http://localhost:8000/login', '_blank');
  }
});



async function checkSessionData() {
  try {
    // Example: Fetch session data from the background script
    const response = await chrome.runtime.sendMessage({ request: "sessionid" });

    // Ensure that the response is valid
    if (!response || response.error) {
      // Handle the error, if any
      console.error('Error fetching session data:', response && response.error);
      return;
    }

    const data = response.sessionid;

    // Check if session data is present
    if (data !== null) {
      // Session data is present, hide the login button
      document.getElementById('login').style.display = 'none';

      // Print the session data or perform other actions
      console.log('Session data:', data);
    } else {
      // Session data is missing, show the login button
      document.getElementById('login').style.display = 'block';
    }
  } catch (error) {
    // Handle errors that might occur during the asynchronous operation
    console.error('Error:', error);
  }
}

// Call the function to check session data when the popup is opened
checkSessionData();