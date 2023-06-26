chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    'foodSelect': true,
    'moreInfos': true,
    'competitionRatio': true
  });
});

