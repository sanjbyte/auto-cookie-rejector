// Add the service worker registration
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Modify the existing click listener
chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension icon clicked, attempting to inject content.js");

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    console.log("content.js injected successfully");
  } catch (err) {
    console.error("Error injecting content.js:", err.message);
  }
});
