// chrome.* code can be run on service workers.

// on extension installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

// URL prefixes for the sites that the extension uses
const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

// run when the icon in the extension toolbar is clicked
chrome.action.onClicked.addListener(async (tab) => {
    // match the URL prefixes
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {

        // access the current state text and switch it
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        })

        // activate the reading mode CSS depending on state
        if (nextState === 'ON') {
            await chrome.scripting.insertCSS({
                files: ['focus-mode.css'],
                target: { tabId: tab.id },
            });
        } else if (nextState === 'OFF') {
            await chrome.scripting.removeCSS({
                files: ['focus-mode.css'],
                target: { tabId: tab.id },
            });
        }
    }
})