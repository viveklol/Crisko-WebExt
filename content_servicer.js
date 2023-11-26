chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.request === "sessionid") {
            chrome.cookies.get({"url": 'http://localhost:8000/', "name": 'sessionid'}, function(result) {
                if (result !== null) {
                    sendResponse({sessionid: result.value});
                } else {
                    sendResponse({sessionid: null});
                }
            });
            // Do not call sendResponse here; it should be called inside the asynchronous callback
            return true; // Indicate that you will call sendResponse asynchronously
        }
    }
  );
  