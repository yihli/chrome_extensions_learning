// omnibox API allos custom behavior to browser address bar
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

const URL_CHROME_EXTENSIONS_DOC = 'https://developer.chrome.com/docs/extensions/reference/';
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

// when the keyword "api" (specified in manifest) is typed, give suggestions in the box
chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
    await chrome.omnibox.setDefaultSuggestion({
        description: 'Enter a Chrome API or choose from past searches'
    });

    // get suggestions from local storage
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    const suggestions = apiSuggestions.map((api) => {
        return { content: api, description: `Open chrome.${api} API`};
    });

    // send them to the suggestion box
    suggest(suggestions);
});

async function updateHistory(input) {
    // get the existing suggestions
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');

    // place the input in the first element, and only keep the top 4
    apiSuggestions.unshift(input);
    apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);

    // update the new array
    return chrome.storage.local.set({ apiSuggestions });
}

// on pressing enter at the textbox/suggestion is chosen
chrome.omnibox.onInputEntered.addListener((input) => {
    // create new tab
    chrome.tabs.create({
        url: URL_CHROME_EXTENSIONS_DOC + input
    });

    // save the most recent as suggestions
    updateHistory(input);
})
