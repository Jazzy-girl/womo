import { LOCALSTORAGE_MATCHES, DEFAULT_MATCHES } from "@/definitions";
import { storage } from "wxt/utils/storage";
export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  // browser.runtime.onInstalled.addListener(async () => {
  //   // get matches from storage
  //   const matches: string[] = await storage.getItem(LOCALSTORAGE_MATCHES) || [DEFAULT_MATCHES]

  //   // register content script!
    
  //   await browser.scripting.updateContentScripts([{}])
  // })
});
