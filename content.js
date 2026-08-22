const BLOCKED_URLS = [
    "reddit.com",
    "youtube.com",
]

const LOCALSTORAGE_URLS = "LOCALSTORAGE_URLS"; // all blocked urls.
const LOCALSTORAGE_UNBLOCKED = "LOCALSTORAGE_UNBLOCKED"; // boolean: did the user unblock
const LOCALSTORAGE_UNTIL = "LOCALSTORAGE_UNTIL"; // null or a time. until when are things unblocked?


async function match(){
    browser.storage.local.get(LOCALSTORAGE_UNBLOCKED).then((result)=>{
        const numeric = parseInt(result.LOCALSTORAGE_UNBLOCKED);
        console.log("LOCALSTORAGE: ", result.LOCALSTORAGE_UNBLOCKED);
        if(!numeric){
            // blocked!

            document.body.innerHTML = "";
        }
    })
    
}

function checkURL(){
    const currentURL = window.location.href;
    browser.storage.local.get(LOCALSTORAGE_URLS).then((result)=>{

        const inputString = result.LOCALSTORAGE_URLS;
        console.log("result.LOCALSTORAGE_URLS: ");
        console.log(inputString);
        const blockedUrls = inputString.split("\n");
        console.log(`blockedURLS: ${blockedUrls}`);
        console.log(`length: ${blockedUrls.length}`);
        
        
        for(i = 0; i < blockedUrls.length; i++){

            const url = blockedUrls[i];
            console.log(`blocked url: ${url}`)
            const tokens = url.split(".");
            
            if (tokens.length == 2){
            const first = tokens[0];
            const second = tokens[1];
            let regex = RegExp(`https:\/\/www\.${first}\.${second}.*`);
            const matches = currentURL.match(regex);
            if(matches != null){
                console.log("match!");
                console.log(matches);
                match();
                break;
            }else{
                console.log("no match");
            }
            }else{
                console.log(`invalid url: ${url}`);
            }

        }




        

    });
    
}

checkURL();