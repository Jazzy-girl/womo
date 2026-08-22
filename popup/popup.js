import { LOCALSTORAGE_URLS, LOCALSTORAGE_TIMER, LOCALSTORAGE_UNBLOCKED } from "../constants";

/**
 * Code for the extension popup.
 * Fills the textarea w/ existing urls
 * Save button logic
 */
console.log("popup opened!");

const saveButtonID = "save-button";

const saveButton = document.getElementById(saveButtonID);

const textAreaID = "url-input";
const textArea = document.getElementById(textAreaID);

// localStorage.setItem(LOCALSTORAGE_URLS, "TEST AGAIN");


// load current data into the textArea

browser.storage.local.get(LOCALSTORAGE_URLS).then((result)=>{
    if(result.LOCALSTORAGE_URLS != null){
        textArea.innerHTML = result.LOCALSTORAGE_URLS;
        console.log("Current localstorage data:");
        console.log(result); 
    }
});

// setup UNBLOCKED and TIMER on initial startup





function saveOptions(){
    // saves options
    let newInput = textArea.value;
    browser.storage.local.set({LOCALSTORAGE_URLS: newInput});
    console.log("saved data: ");
    console.log(newInput);
}

saveButton.addEventListener("click", saveOptions);
