console.log("Auto Cookie Rejector script loaded.");

// Use MutationObserver to watch for cookie banners that might load after the page
function initCookieRejector() {
    console.log("Initializing cookie rejection script.");
    
    // Add a small delay before first check
    setTimeout(() => {
        rejectCookies();
        
        // Watch for new elements being added to the page
        const observer = new MutationObserver((mutations) => {
            rejectCookies();
        });
        
        // Start observing the document with the configured parameters
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 1000); // 1 second delay
}

// Change the initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieRejector);
} else {
    initCookieRejector(); // Call directly if DOM is already loaded
}

// Main function to start rejecting cookies on known platforms and generic banners
function rejectCookies() {
    handleOneTrust();
    handleOsano();
    handleSecuriti();
    handleTermly();
    handleMultiStepBanner();
    handleRadioButtonBanner();
    handleComplyAuto(); // Updated function for ComplyAuto cookie banner
}

// OneTrust cookie banner handling
function handleOneTrust() {
    // Updated selectors list - removed invalid selector and added more common variations
    const rejectSelectors = [
        "button#onetrust-reject-all-handler",
        "button.onetrust-reject-all-handler",
        "button[aria-label='Reject Cookies']",
        ".ot-pc-refuse-all-handler",
        "#onetrust-reject-button",
        "[data-purpose='reject-all']"
    ];

    // First try direct selectors
    let rejectButton = null;
    for (const selector of rejectSelectors) {
        try {
            rejectButton = document.querySelector(selector);
            if (rejectButton) break;
        } catch (e) {
            console.log(`Invalid selector skipped: ${selector}`);
        }
    }

    // Enhanced text content search with error handling
    if (!rejectButton) {
        try {
            const buttons = Array.from(document.getElementsByTagName('button'));
            rejectButton = buttons.find(button => {
                const text = button.textContent.toLowerCase();
                return (text.includes('reject') || text.includes('deny')) && 
                       (text.includes('cookie') || text.includes('all'));
            });
        } catch (e) {
            console.log("Error during text content search:", e);
        }
    }

    if (rejectButton) {
        rejectButton.click();
        console.log("OneTrust: Rejected cookies");
    } else {
        console.log("OneTrust: Reject button not found");
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

// ComplyAuto cookie banner handling
function handleComplyAuto() {
    // Replace the invalid selector with valid ones and add text search
    const denyButtons = Array.from(document.getElementsByTagName('button')).filter(button => 
        button.hasAttribute('data-cc-deny-targeting') ||
        
        button.getAttribute('aria-label') === 'Deny Targeting Cookies' ||
        button.textContent.toLowerCase().includes('deny targeting')
    );
    
    if (denyButtons.length > 0) {
        denyButtons[0].click();
        console.log("ComplyAuto: Denied targeting cookies");
    } else {
        console.log("ComplyAuto: 'Deny Targeting' button not found");
    }

    // Similarly for the save button
    setTimeout(() => {
        const saveButtons = Array.from(document.getElementsByTagName('button')).filter(button => 
            button.getAttribute('aria-label') === 'Save Preferences' ||
            button.getAttribute('aria-label') === 'Confirm Choices' ||
            button.textContent.toLowerCase().includes('save')
        );
        
        if (saveButtons.length > 0) {
            saveButtons[0].click();
            console.log("ComplyAuto: Clicked 'Save Preferences' or 'Confirm Choices' button");
        } else {
            console.log("ComplyAuto: 'Save' or 'Confirm' button not found");
        }
    }, 1000);
}

// Generic handling for multi-step cookie banners
function handleMultiStepBanner() {
    const sections = [
        "button[aria-label='Functional']",
        "button[aria-label='Performance & Analytics']",
        "button[aria-label='Marketing & Social Media']",
        "button[aria-label='Preferences']",
        "button[aria-label='Settings']",
        ".cookie-preferences",
        ".settings-link"
    ];

    sections.forEach((selector, index) => {
        const sectionButton = document.querySelector(selector);
        if (sectionButton) {
            sectionButton.click();
            console.log(`Multi-Step Banner: Opened section with selector ${selector}`);
            setTimeout(disableMultiStepCookies, 1000 * (index + 1));
        }
    });

    function disableMultiStepCookies() {
        const disableSelectors = [
            "button[aria-label='Disable']",
            "button.toggle-off",
            "input[type='checkbox'][aria-label*='disable']",
            ".cookie-toggle-off",
            ".disable-cookie"
        ];

        disableSelectors.forEach(selector => {
            const toggleButton = document.querySelector(selector);
            if (toggleButton && !toggleButton.classList.contains("disabled")) {
                toggleButton.click();
                console.log("Multi-Step Banner: Disabled a cookie setting using selector", selector);
            }
        });
    }

    setTimeout(() => {
        const confirmSelectors = [
            "button[aria-label='Confirm My Choice']",
            "button[aria-label='Save Settings']",
            "button[aria-label='Confirm Choices']",
            "button.confirm-preferences",
            ".save-preferences",
            ".confirm-cookie-settings"
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
    }, 5000);
}

// Handler for radio button-based cookie banners
function handleRadioButtonBanner() {
    const requiredOption = document.querySelector("input[type='radio'][aria-label*='Required'], input[type='radio'][aria-label*='Essential']");
    if (requiredOption) {
        requiredOption.click();
        console.log("Radio Button Banner: Selected 'Required' or 'Essential' option");
    }

    const saveButton = document.querySelector("button[aria-label='Save'], button[aria-label='Confirm']");
    if (saveButton) {
        saveButton.click();
        console.log("Radio Button Banner: Clicked 'Save' or 'Confirm' button");
    } else {
        console.log("Radio Button Banner: 'Save' or 'Confirm' button not found");
    }
}
