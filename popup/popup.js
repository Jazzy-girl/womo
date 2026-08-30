/**
 * Code for the extension popup.
 * Fills the textarea w/ existing urls
 * Save button logic
 */
console.log("popup opened!");
const LOCALSTORAGE_URLS = "LOCALSTORAGE_URLS"; // all blocked urls.
const LOCALSTORAGE_UNBLOCKED = "LOCALSTORAGE_UNBLOCKED"; // boolean: did the user unblock
const LOCALSTORAGE_UNTIL = "LOCALSTORAGE_UNTIL"; // null or a time. until when are things unblocked?

const saveButtonID = "save-button";

const saveButton = document.getElementById(saveButtonID);

const textAreaID = "url-input";
const textArea = document.getElementById(textAreaID);

// localStorage.setItem(LOCALSTORAGE_URLS, "TEST AGAIN");


// load current data into the textArea
if(true){

    browser.storage.local.get(LOCALSTORAGE_URLS).then((result)=>{
    textArea.innerHTML = result.LOCALSTORAGE_URLS;
    console.log("Current localstorage data:");
    console.log(result);
        });

}

// set UNBLOCKED to false on initial use
browser.storage.local.get(LOCALSTORAGE_UNBLOCKED).then((result)=>{
    console.log("unblocked: ", result.LOCALSTORAGE_UNBLOCKED);
    if(!result.LOCALSTORAGE_UNBLOCKED){
        console.log("unblocked is undefined :(");
        browser.storage.local.set({LOCALSTORAGE_UNBLOCKED: "0"});
    }
    });


function saveOptions(){
    // saves options
    let newInput = textArea.value;
    browser.storage.local.set({LOCALSTORAGE_URLS: newInput});
    console.log("saved data: ");
    console.log(newInput);
}

saveButton.addEventListener("click", saveOptions);
