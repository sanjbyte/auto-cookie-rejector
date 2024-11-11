chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: function() {
        // Define rejectCookies directly within this function
        function rejectCookies() {
          console.log("Reject Cookies function called");
          handleOneTrust();
          handleOsano();
          handleSecuriti();
          handleTermly();
          handleMultiStepBanner();
          handleRadioButtonBanner();
          handleComplyAuto();
        }

        // Define each handler function locally within this injected script
        function handleOneTrust() { console.log("Checking for OneTrust..."); }
        function handleOsano() { console.log("Checking for Osano..."); }
        function handleSecuriti() { console.log("Checking for Securiti..."); }
        function handleTermly() { console.log("Checking for Termly..."); }
        function handleMultiStepBanner() { console.log("Checking for MultiStepBanner..."); }
        function handleRadioButtonBanner() { console.log("Checking for RadioButtonBanner..."); }
        function handleComplyAuto() { console.log("Checking for ComplyAuto..."); }

        // Call rejectCookies
        rejectCookies();
      }
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error injecting script:", chrome.runtime.lastError.message);
      } else {
        console.log("Script injected successfully");
      }
    }
  );
});
