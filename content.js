// Wait for the document to load fully
document.addEventListener('DOMContentLoaded', () => {
  // Define an array of selectors for common cookie rejection buttons
  const selectors = [
    "button[aria-label='Reject All']",
    "button[aria-label='Reject cookies']",
    "button[title='Reject All']",
    "button:contains('Reject')",
    "button:contains('Decline')",
    "button:contains('Only necessary')",
    "button:contains('Reject all cookies')"
  ];

  // Try to find and click on a reject button
  selectors.forEach(selector => {
    const button = document.querySelector(selector);
    if (button) {
      button.click();
      console.log("Cookie rejected using selector:", selector); // Debug log
    }
  });
});
