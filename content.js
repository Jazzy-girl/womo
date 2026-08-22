const BLOCKED_URLS = [
    "reddit.com",
    "youtube.com",
]

const LOCALSTORAGE_URLS = "LOCALSTORAGE_URLS"; // all blocked urls.
const LOCALSTORAGE_UNBLOCKED = "LOCALSTORAGE_UNBLOCKED"; // boolean: did the user unblock
const LOCALSTORAGE_UNTIL = "LOCALSTORAGE_UNTIL"; // null or a time. until when are things unblocked?


function unblockForTime(time, inputValue, chastiseText){
    if(inputValue == ""){
        chastiseText.textContent = "GIVE AN EXPLANATION YOU TWAT!"
    }
    else{
        chastiseText.textContent = ""
        browser.storage.local.set({LOCALSTORAGE_UNBLOCKED: 1});
        var until = new Date(Date.now() + time*60000);
        browser.storage.local.set({LOCALSTORAGE_UNTIL: until.toISOString()});
        window.location.reload();
    }
}

function unblockPage(){
    /**
     * PAGE 2
     *     <div> 0
            <h2>Give a good reason:</h2>

            <div> 1
                <div> 2
                    <textarea name="" id="" rows="4" cols="50"></textarea>
                </div>
                <div> 3
                    div 4
                     button go back
                    <div> 5
                        <button>1 Min</button>
                        <button>2 Min</button>
                        <button>5 Min</button>
                        <button>10 Min</button>
                    </div>
                </div>
            </div>
        </div>
    */
    document.body.innerHTML = "";
    let divs = [];

    let extraDiv = document.createElement("div");
    let chastiseText = document.createElement("h2");
    chastiseText.textContent = "";
    extraDiv.appendChild(chastiseText);

    let input = document.createElement("textarea");

    for(let i = 0; i < 6; i++){
        divs.push(document.createElement("div"));
    }

    let buttonTimes = [1, 2, 5, 10];
    let buttons = [];
    for(let i = 0; i < 4; i++){
        const time = buttonTimes[i];
        let button = document.createElement("button");
        button.textContent = `${time} Minute(s)`
        button.addEventListener("click", ()=>{unblockForTime(time, input.value, chastiseText)})
        buttons.push(button);
    }

    let h1 = document.createElement("h1");
    h1.textContent = "Give a good reason";

    

    divs[0].appendChild(h1);
    divs[0].appendChild(extraDiv);

    divs[2].appendChild(input);

    // goes to prev page
    let backButton2 = document.createElement("button");
    backButton2.textContent = "Go back";
    backButton2.addEventListener("click", ()=>{history.back()});

    divs[4].appendChild(backButton2);

    for(let i = 0; i < 4; i++){
        divs[5].appendChild(buttons[i]);
    }
    divs[3].appendChild(divs[4]);
    divs[3].appendChild(divs[5]);

    divs[1].appendChild(divs[2]);
    divs[1].appendChild(divs[3]);
    divs[0].appendChild(divs[1]);
    
    
//     let div0 = document.createElement("div");
// div0.appendChild(divs[0]);
    document.body.appendChild(divs[0]);

}

async function match(){
    browser.storage.local.get(LOCALSTORAGE_UNBLOCKED).then((result)=>{
        const numeric = parseInt(result.LOCALSTORAGE_UNBLOCKED);
        console.log("LOCALSTORAGE: ", result.LOCALSTORAGE_UNBLOCKED);
        let isPast = 0;
        if(numeric){
            // check if past unblocked time
            browser.storage.local.get(LOCALSTORAGE_UNTIL).then((result)=>{
                const until = new Date(result.LOCALSTORAGE_UNTIL);
                isPast = until < new Date();
                if(isPast){
                    // is past! set unblocked back to 0
                    browser.storage.local.set({LOCALSTORAGE_UNBLOCKED: 0});
                }
            })
        }
        if(!numeric || isPast){
            // blocked!
            document.body.innerHTML = ``;
            document.querySelectorAll(`link[rel="stylesheet"], style`)
            .forEach(element => element.remove());
           

            /**
             * The blocked options.
             * 
             */

            /**
             * PAGE 1
             *     <div>
                    <h1>BLOCKED!</h1>
                    <div>
                        <div>
                            <button>Go back</button>
                        </div>
                        <div>
                            <button>Unblock</button>
                        </div>
                    </div>
                </div>
            */
    
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let div3 = document.createElement("div");
            let div4 = document.createElement("div");

            let BLOCKED = document.createElement("h1");

            // goes to prev page
            let backButton = document.createElement("button");
            backButton.textContent = "Go back";
            backButton.addEventListener("click", ()=>{history.back()});

            // goes to unblock page
            let unblockButton = document.createElement("button");
            unblockButton.textContent = "Unblock?";
            unblockButton.addEventListener("click", unblockPage);

            BLOCKED.textContent = "BLOCKED!";
            div1.appendChild(BLOCKED);
            div3.appendChild(backButton);
            div4.appendChild(unblockButton);

            div1.appendChild(div2);
            div2.appendChild(div3);
            div2.appendChild(div4);

            document.body.appendChild(div1);



        }else{
            // unblocked!
            // check for the timer!
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