const habiticaURL = "https://habitica.com";

const handleClick = async (tab) => {
  if (tab.url.startsWith(habiticaURL)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await browser.browserAction.getBadgeText({
      tabId: tab.id,
    });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    browser.browserAction.setBadgeText({ text: nextState, tabId: tab.id });

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      browser.tabs.insertCSS(tab.id, {
        file: "no-dailies.css",
      });
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      browser.tabs.removeCSS(tab.id, {
        file: "no-dailies.css",
      });
    }
  }
};

browser.browserAction.onClicked.addListener(handleClick);
