const sendMessageToContentScript = (tabId, url) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
};
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    sendMessageToContentScript(tabId, tab.url);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    sendMessageToContentScript(activeInfo.tabId, tab.url);
  });
});