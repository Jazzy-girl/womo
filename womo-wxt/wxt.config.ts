import { defineConfig } from 'wxt';


// let matches: string[] = ["url"];
if(typeof(Storage)!="undefined"){
    const matches = await storage.getItem<string[]>('local:matches')

    if(matches){
        console.log('matches exists: ', matches)
    }else{
        console.log("set item matches")
        await storage.setItem('local:matches', JSON.stringify(["NULL_LIST"]))
    }
    // matches = localStorage.matches;
}
// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest:{
        permissions: ["scripting", "storage"],
    },
});
