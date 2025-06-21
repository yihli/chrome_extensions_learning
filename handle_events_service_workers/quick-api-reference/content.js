(async () => {
    // send a message to any background service workers (in this case, service-worker.js and corresponding modules)
    const { tip } = await chrome.runtime.sendMessage({ greeting: 'tip' });

    // get the nav element
    const nav = document.querySelector('.upper-tabs > nav');

    // new html elements
    const tipWidget = createDomElement(`
        <button type="button" popovertarget="tip-popover" popovertargetaction="show" style="padding: 0 12px; height: 36px;">
            <span style="display: block; font: var(--devsite-link-font,500 14px/20px var(--devsite-primary-font-family));">Tip</span>
        </button>
    `);
    const popover = createDomElement(
        `<div id='tip-popover' popover style="margin: auto;">${tip}</div>`
    );

    // add popover to the very last line of page body
    document.body.append(popover);

    // add tip widget to the selected nav elemented
    nav.append(tipWidget);
})();

// this creates an ACTUAL dom element from html string that can be appended in the function above.
function createDomElement(html) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    return dom.body.firstElementChild;
}