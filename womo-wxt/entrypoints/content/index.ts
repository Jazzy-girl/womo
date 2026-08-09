import { LOCALSTORAGE_MATCHES, DEFAULT_MATCHES } from "@/definitions";
import { block } from "./block";

export default defineContentScript({
  matches: ["<all_urls>"],
  async main(ctx) {
    // localStorage.matches = JSON.stringify([".dev"]);
    var matches: string[] = ["NULL"];
    if(typeof(Storage)!="undefined"){
      console.log("storage is defined yay")
      const stored = await storage.getItem<string[]>('local:matches');

      if(stored){
        console.log("grab matches")
        console.log("stored: ", stored);
        
      }
    }
    /**
     * check if page url matches any urls in blocked lists array
     * 
     */

      const ui = createIntegratedUi(ctx, {
        position: 'inline',
        anchor: 'body',
        onMount: (container) => {
          // function check(item: string){
          //   console.log(item)
          //   if(window.location.href.includes(item)){
          //     console.log("match")
          //     matched = true;
          //   }
          // }
          let matched: boolean = false;
          const url: string = window.location.href;
          for (let i = 0; i < matches.length; i++){
              let potentialMatch: string = matches[i];
              
              console.log(potentialMatch)
              if(url.includes(potentialMatch)){
                console.log("match")
                console.log(url)
                matched = true;
                break;
              }
          }
          console.log(matches)
          
          // matches.forEach(check)
          if(matched){
            console.log("MATCH!")
            block()
          }
          
        }
      });
      ui.autoMount();
    },
});
