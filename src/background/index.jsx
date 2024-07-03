import { runtime, tabs, storage } from 'webextension-polyfill'

async function getCurrentTab() {
    const list = await tabs.query({ active: true, currentWindow: true })
    return list[0]
}

async function incrementStoredValue(tabId) {
    const data = await storage.local.get(tabId)
    const currentValue = data?.[tabId] ?? 0
  
    return storage.local.set({ [tabId]: currentValue + 1 })
  }

export async function init() {
    // await storage.local.clear()
	// the message receiver

    // runtime.onMessage.addListener((message, sender, sendResponse) => {
    //     if (message.action === 'getVersion') {
    //         var manifest = chrome.runtime.getManifest();
    //         var version = manifest.version;
    //         sendResponse({version: version});
    //     }
    // });

    
}

runtime.onInstalled.addListener(() => {
    init().then(()=>{
        console.log('[background] loaded ');
    });
})
