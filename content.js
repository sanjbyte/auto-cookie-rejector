document.addEventListener('DOMContentLoaded', () => {
  // Define an array of selectors for common cookie rejection buttons with specific attributes
  const selectors = [
    "button[aria-label='Reject All']",
    "button[aria-label='Reject cookies']",
    "button[title='Reject All']",
    "button.cookie-reject"  // Add any specific selector you find for certain sites
  ];

  // Function to find and click reject buttons
  function rejectCookies() {
    selectors.forEach(selector => {
      const button = document.querySelector(selector);
      if (button) {
        button.click();
        console.log("Cookie rejected using selector:", selector); // Debug log
        observer.disconnect(); // Stop observing after clicking
      }
    });

    // Additional approach: Find buttons by checking their text content
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      if (text.includes("reject") || text.includes("decline") || text.includes("only necessary")) {
        button.click();
        console.log("Cookie rejected based on button text:", button.textContent); // Debug log
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
