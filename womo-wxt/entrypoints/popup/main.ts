var addButton = document.getElementById('add-blocked-site-button') as HTMLButtonElement
var siteInput = document.getElementById('add-blocked-site-input') as HTMLInputElement
var siteList = document.getElementById('blocked-sites-list')

function appendElement(){
  var newSite = siteInput.value.trim();
  if(newSite){
    var listItem = document.createElement('li')
    listItem.textContent = newSite
    
    if(typeof(Storage)!="undefined"){
      if(localStorage.matches){
        const currentMatches: string[] = JSON.parse(localStorage.matches);
        currentMatches.push(newSite)
        localStorage.matches = JSON.stringify(currentMatches)
      }else{
        localStorage.matches = JSON.stringify(newSite);
      }
    }

    siteList?.appendChild(listItem)

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