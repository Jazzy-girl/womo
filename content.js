const BLOCKED_URLS = [
    "reddit.com",
    "youtube.com",
]

const regex = /https:\/\/www[.]reddit[.]com.*/
const regex2 = RegExp(`https:\/\/www[.]${"reddit"}[.]com.*`)

function checkURL(urls){
    const currentURL = window.location.href;
    console.log(currentURL);
    for (url in urls){
        console.log(url);
    }
    const matches = currentURL.match(regex2)
    if (matches != null){
        console.log("match!");
        console.log(matches);
        // MATCH!
        // document.body.innerHTML = '';
    }else{
        console.log("no match!");
    }
}

checkURL(BLOCKED_URLS);