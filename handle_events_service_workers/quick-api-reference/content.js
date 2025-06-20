(async () => {
    const { tip } = await chrome.runtime.sendMessage({ greeting: 'tip' });

    const nav = document.querySelector('.upper-tabs > nav');

    const tipWidget = createDomElement(`
        
    `)
})