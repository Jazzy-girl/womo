const BLOCKED_URLS = [
    "reddit.com",
    "youtube.com",
]

function match(){
    document.body.innerHTML = "";
}

function checkURL(){
    const currentURL = window.location.href;
    browser.storage.local.get("URLS").then((result)=>{

        const inputString = result.URLS;
        console.log("result.URLS: ");
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
    
    // console.log(currentURL);
    // for (url in urls){
    //     console.log(url);
    // }
    // const matches = currentURL.match(regex)
    // if (matches != null){
    //     console.log("match!");
    //     console.log(matches);
    //     // MATCH!
    //     // document.body.innerHTML = '';
    // }else{
    //     console.log("no match!");
    // }
}

checkURL();