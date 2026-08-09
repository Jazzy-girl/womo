

var addButton = document.getElementById('add-blocked-site-button') as HTMLButtonElement
var siteInput = document.getElementById('add-blocked-site-input') as HTMLInputElement
var siteList = document.getElementById('blocked-sites-list')

function makeElement(site: string){
    // make the list item
    var listItem = document.createElement('li')
    listItem.textContent = site;

    var buttonItem = document.createElement('button')
    buttonItem.textContent = "Delete";
    buttonItem.addEventListener('click',function(){
      deleteElement(site, listItem, buttonItem)
    });

    siteList?.appendChild(listItem);
}

function deleteElement(siteString: string, siteItem: HTMLLIElement, delButton: HTMLButtonElement){
  siteList?.removeChild(siteItem);
  siteList?.removeChild(delButton);

    if(typeof(Storage)!="undefined"){
      if(localStorage.matches){
        const currentMatches: string[] = JSON.parse(localStorage.matches);
        currentMatches.filter((element) => {return !(element === siteString)})
        localStorage.matches = JSON.stringify(currentMatches)
      }
    }
}

function onInit(){
    let matches: string[] = [];
    console.log("ON INIT CALLED")
    if(typeof(Storage)!="undefined"){
      
      if(localStorage.matches){
        console.log("matches exists")
        matches = JSON.parse(localStorage.matches);
      }
    }
    
    console.log(matches)

    for(const el in matches){
      // make a list element
      // make a delete button element
      makeElement(el);
    }

}


function appendElement(){
  var newSite = siteInput.value.trim();
  if(newSite){

    
    if(typeof(Storage)!="undefined"){
      if(localStorage.matches){
        const stored = localStorage.getItem('matches')
        console.log(typeof(stored))
        console.log(stored)
        const currentMatches: string[] = JSON.parse(stored!) || [];
        console.log(typeof(currentMatches))
        console.log(currentMatches)
        currentMatches.push(newSite)
        localStorage.matches = JSON.stringify(currentMatches)
      }else{
        localStorage.matches = JSON.stringify(newSite);
      }
    }

    makeElement(newSite);

    siteInput.value = ''
  }else{
    alert('Please enter an item.')
  }
}

addButton.addEventListener('click', appendElement)

siteInput.addEventListener('keypress', function(event){
  if(event.key === 'Enter'){
    appendElement();
  }
})

onInit();