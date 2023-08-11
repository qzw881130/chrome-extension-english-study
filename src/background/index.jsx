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
    await storage.local.clear()
	// the message receiver
    runtime.onMessage.addListener(async (message) => {
        console.log('message:', message)
        if (message.to === 'background') {
            console.log('background handled: ', message.action)

            const tab = await getCurrentTab()
            const tabId = tab.id
            console.log('tabId: ', tabId);

            if (tabId) {
                return incrementStoredValue(tabId.toString())
            }
        }
    })

    
}

runtime.onInstalled.addListener(() => {
    init().then(()=>{
        console.log('[background] loaded ');
    });
})