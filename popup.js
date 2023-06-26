document.addEventListener('DOMContentLoaded', function () {
  const featureNames = ['foodSelect', 'moreInfos', 'competitionRatio'];
  
  featureNames.forEach((feature) => {
    const checkbox = document.getElementById(feature);
    const label = document.getElementById(`${feature}Label`);

    label.textContent = chrome.i18n.getMessage(feature);

    chrome.storage.sync.get(feature, function (data) {
      checkbox.checked = data[feature];
    });
    
    checkbox.addEventListener('change', function () {
      chrome.storage.sync.set({ [feature]: this.checked });
    });
  });
});

