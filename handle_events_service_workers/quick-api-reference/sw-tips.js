console.log('sw-tips.js loaded');

const updateTip = async () => {
    // fetch a random tip and save it to local storage
    const response = await fetch('https://chrome.dev/f/extension_tips');
    const tips = await response.json();
    const randomIndex = Math.floor(Math.random() * tips.length);
    return chrome.storage.local.set({ tip: tips[randomIndex] });
};

const ALARM_NAME = 'tip';

async function createAlarm() {
    // get the alarm from local storage
    const alarm = await chrome.alarms.get(ALARM_NAME);

    // if alarm does not exist, initiate one and create a tip
    if (typeof alarm === 'undefined') {
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1440
        });
        updateTip();
    }
}

// create the alarm
createAlarm();

// every time the alarm pings, update the tip in local storage
chrome.alarms.onAlarm.addListener(updateTip);