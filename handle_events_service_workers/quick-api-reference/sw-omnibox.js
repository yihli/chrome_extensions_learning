console.log('sw-omnibox.js loaded');

// when the extension is first installed
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        // store apiSuggestions in local storage
        chrome.storage.local.set({
            apiSuggestions: ['tabs', 'storage', 'scripting']
        });
    }
});