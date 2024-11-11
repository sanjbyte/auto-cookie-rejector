document.addEventListener('DOMContentLoaded', () => {
  // Main function to start rejecting cookies on known platforms
  function rejectCookies() {
    handleOneTrust();
    handleOsano();
    handleSecuriti();
    handleTermly();
    handleMultiStepBanner(); // Generic function for multi-step cookie banners
  }

  // OneTrust cookie banner handling
  function handleOneTrust() {
    const rejectButton = document.querySelector("button#onetrust-reject-all-handler");
    if (rejectButton) {
      rejectButton.click();
      console.log("OneTrust: Rejected cookies");
    }
  }

  // Osano cookie banner handling
  function handleOsano() {
    const manageButton = document.querySelector("button.osano-cm-manage");
    if (manageButton) {
      manageButton.click();
      console.log("Osano: Opened manage cookies dialog");

      setTimeout(() => {
        const rejectButton = document.querySelector("button.osano-cm-reject-all");
        if (rejectButton) {
          rejectButton.click();
          console.log("Osano: Rejected all cookies");
        }
      }, 1000);
    }
  }

  // Securiti cookie banner handling
  function handleSecuriti() {
    const rejectButton = document.querySelector("button[data-action='reject']");
    if (rejectButton) {
      rejectButton.click();
      console.log("Securiti: Rejected cookies");
    }
  }

  // Termly cookie banner handling
  function handleTermly() {
    const settingsButton = document.querySelector(".termly-consent-preferences-button");
    if (settingsButton) {
      settingsButton.click();
      console.log("Termly: Opened preferences");

      setTimeout(() => {
        const rejectButton = document.querySelector(".termly-reject-all");
        if (rejectButton) {
          rejectButton.click();
          console.log("Termly: Rejected all cookies");
        }
      }, 1000);
    }
  }

  // Generic handling for multi-step cookie banners
  function handleMultiStepBanner() {
    // Step 1: Open each section to access cookie options (e.g., Functional, Performance, Marketing)
    const sections = [
      "button[aria-label='Functional']",
      "button[aria-label='Performance & Analytics']",
      "button[aria-label='Marketing & Social Media']",
      "button[aria-label='Preferences']",
      "button[aria-label='Settings']",
      ".cookie-preferences", // Generic class used by some banners
      ".settings-link", // Generic class for settings links
    ];

    sections.forEach((selector, index) => {
      const sectionButton = document.querySelector(selector);
      if (sectionButton) {
        sectionButton.click();
        console.log(`Multi-Step Banner: Opened section with selector ${selector}`);
        setTimeout(disableMultiStepCookies, 1000 * (index + 1)); // Delay to allow each tab to load
      }
    });

    // Step 2: Disable cookies in the opened sections
    function disableMultiStepCookies() {
      const disableSelectors = [
        "button[aria-label='Disable']",
        "button.toggle-off", // Commonly used toggle-off class
        "input[type='checkbox'][aria-label*='disable']", // Checkbox approach
        ".cookie-toggle-off", // Some banners use specific toggle classes
        ".disable-cookie" // Generic class name
      ];

      disableSelectors.forEach(selector => {
        const toggleButton = document.querySelector(selector);
        if (toggleButton && !toggleButton.classList.contains("disabled")) {
          toggleButton.click();
          console.log("Multi-Step Banner: Disabled a cookie setting using selector", selector);
        }
      });
    }

    // Step 3: Click the "Confirm" or "Save" button to apply settings
    setTimeout(() => {
      const confirmSelectors = [
        "button[aria-label='Confirm My Choice']",
        "button[aria-label='Save Settings']",
        "button[aria-label='Confirm Choices']",
        "button.confirm-preferences",
        ".save-preferences", // Generic selector for save button
        ".confirm-cookie-settings" // Generic confirm class
      ];

      confirmSelectors.forEach(selector => {
        const confirmButton = document.querySelector(selector);
        if (confirmButton) {
          confirmButton.click();
          console.log("Multi-Step Banner: Confirmed cookie choices using selector", selector);
        } else {
          console.log("Multi-Step Banner: Confirm button not found for selector", selector);
        }
      });
    }, 5000); // Delay for all sections and options to be processed
  }

  // Initial call to start rejecting cookies
  rejectCookies();
});
