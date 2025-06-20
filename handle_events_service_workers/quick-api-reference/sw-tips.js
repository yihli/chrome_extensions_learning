console.log('sw-tips.js loaded');

const updateTip = async () => {
    const response = await fetch('https://chrome.dev/f/extension_tips');
    const tips = await response.json();
    const randomIndex = Math.floor(Math.random() * tips.length);
    return chrome.storage.local.set({ tip: tips[randomIndex] });
};