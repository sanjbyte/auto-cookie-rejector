document.addEventListener('DOMContentLoaded', () => {
  // Step 1: Click the "Manage Cookies" button if available
  function openCookieSettings() {
    const manageButton = document.querySelector("button[aria-label='Manage Cookies']");
    if (manageButton) {
      manageButton.click();
      console.log("Clicked 'Manage Cookies' button");
      setTimeout(toggleCookieOptions, 1000); // Wait a moment for the settings menu to open
    }
  }

  // Step 2: Toggle off each cookie category within the settings menu
  function toggleCookieOptions() {
    const toggles = [
      "button[aria-label='Disable functional cookies']", // Replace with the actual selector for each toggle
      "button[aria-label='Disable performance cookies']",
      "button[aria-label='Disable targeting cookies']"
    ];

    toggles.forEach(selector => {
      const toggleButton = document.querySelector(selector);
      if (toggleButton && !toggleButton.classList.contains("disabled")) {
        toggleButton.click();
        console.log("Disabled cookies using selector:", selector);
      }
    });

    // Move to the final step of confirming or saving the choices
    setTimeout(confirmCookieSettings, 1000);
  }

  // Step 3: Click the "Save" or "Confirm" button to apply settings
  function confirmCookieSettings() {
    const saveButton = document.querySelector("button[aria-label='Save settings']");
    if (saveButton) {
      saveButton.click();
      console.log("Clicked 'Save settings' button");
    } else {
      console.log("No 'Save settings' button found");
    }
  }

  // Initial call to start the cookie rejection process
  openCookieSettings();
});
