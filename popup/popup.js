/**
 * Code for the extension popup.
 * Fills the textarea w/ existing urls
 * Save button logic
 */
console.log("popup opened!");
const LOCALSTORAGE_URLS = "URLS";

const saveButtonID = "save-button";

const saveButton = document.getElementById(saveButtonID);

const textAreaID = "url-input";
const textArea = document.getElementById(textAreaID);

// localStorage.setItem(LOCALSTORAGE_URLS, "TEST AGAIN");


// load current data into the textArea
if(true){

    browser.storage.local.get("URLS").then((result)=>{
    textArea.innerHTML = result.URLS;
    console.log("Current localstorage data:");
    console.log(result);
        });

}

function saveOptions(){
    // saves options
    let newInput = textArea.value;
    browser.storage.local.set({URLS: newInput});
    console.log("saved data: ");
    console.log(newInput);
}

saveButton.addEventListener("click", saveOptions);
