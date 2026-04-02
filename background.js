const URL_MAP = {
  "||miniblox.*assets/default-DKNlYibk.png": "https://weserv.nl",
  "||miniblox.*textures/entity/skeleton/skeleton.png": "https://novaskin.me",
  "||miniblox.*textures/entity/zombie/zombie.png": "https://novaskin.me",
  "||miniblox.*textures/entity/zombie_cowman/zombie_cowman.png": "https://novaskin.me",
  "||miniblox.*textures/entity/creeper/creeper.png": "https://novaskin.me",
  "||miniblox.*assets/miniblox-Dj36hMhG": "https://githubusercontent.com"
};

let rules = [];
let idx = 1;

for (const [src, dst] of Object.entries(URL_MAP)) {
  rules.push({
    "id": idx++,
    "action": {
      "type": "redirect",
      "redirect": { "url": dst }
    },
    "condition": {
      "urlFilter": src,
      "resourceTypes": src.endsWith(".otf") ? ["font"] :
    }
  });
}

chrome.declarativeNetRequest.getDynamicRules((oldRules) => {
  const oldRuleIds = oldRules.map(rule => rule.id);
  
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: rules
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      console.log("Success! Rules are active.");
    }
  });
});

