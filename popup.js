document.getElementById('manualReject').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: rejectCookies
        });
    });
});

function rejectCookies() {
    console.log("Manual reject initiated.");
    // Include the code from content.js here if you'd like manual activation
}
