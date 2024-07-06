chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "createNote",
      title: "Create Note",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "createNote") {
      const selectedText = info.selectionText;
      chrome.storage.local.get({ notes: [] }, (result) => {
        const notes = result.notes;
        notes.push(selectedText);
        chrome.storage.local.set({ notes });
      });
    }
  });
  