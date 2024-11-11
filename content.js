document.addEventListener('DOMContentLoaded', () => {
  // Define an array of selectors for common cookie rejection buttons
  const selectors = [
    "button[aria-label='Reject All']",
    "button[aria-label='Reject cookies']",
    "button[title='Reject All']",
    "button:contains('Reject')",
    "button:contains('Decline')",
    "button:contains('Only necessary')",
    "button:contains('Reject all cookies')",
    "button.cookie-reject"  // Add any specific selector you find for Under Armour or other sites
  ];

  // Function to find and click a reject button
  function rejectCookies() {
    selectors.forEach(selector => {
      const button = document.querySelector(selector);
      if (button) {
        button.click();
        console.log("Cookie rejected using selector:", selector); // Debug log
        observer.disconnect(); // Stop observing after clicking
      }
    });
  }

  // Initial attempt to reject cookies on page load
  rejectCookies();

  // MutationObserver to detect dynamically loaded cookie banners
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      rejectCookies(); // Call rejectCookies if new elements are added to the DOM
    });
  });

  // Start observing the document for changes
  observer.observe(document.body, { childList: true, subtree: true });
});
