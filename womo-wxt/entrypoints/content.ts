import { LOCALSTORAGE_MATCHES, DEFAULT_MATCHES } from "@/definitions";

export default defineContentScript({
  matches: ["<all_urls>"],
  main(ctx) {
    localStorage.matches = JSON.stringify([".dev"]);
    let matches: string[] = ["NULL"];
    if(typeof(Storage)!="undefined"){
      if(localStorage.matches){
        matches = JSON.parse(localStorage.matches);
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
              if(url.includes(potentialMatch) != null){
                console.log("match")
                matched = true;
                break;
              }
          }
          console.log(matches)
          
          // matches.forEach(check)
          if(matched){
            console.log("MATCH!")
              document.body.textContent = "";
              let header = document.createElement("h1");
              header.textContent = "This page has been eaten";
              document.body.appendChild(header);
          }
          
        }
      });
      ui.autoMount();
    },
});
