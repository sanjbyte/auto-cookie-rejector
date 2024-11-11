chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked, attempting to inject content.js");

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["content.js"]
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error injecting content.js:", chrome.runtime.lastError.message);
      } else {
        console.log("content.js injected successfully");
      }
    }
  );
});
