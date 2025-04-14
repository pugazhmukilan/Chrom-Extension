// chrome://extensions/
let myLeads = []
let inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let clearBtn = document.getElementById("clear-btn")
let ulList = document.getElementById("ul-list")
let linkBtn = document.getElementById("link-btn")

const storedLeads = localStorage.getItem("myLeads");
if(storedLeads){
    myLeads = JSON.parse(storedLeads)
    renderlist()
}


//SINCE WE ARE ADDING ONT CLICKED EVEN HERE WE DONT AHVE TO MENTION IT IN THE HTML  FILE
inputBtn.addEventListener("click", function(){
    if(inputEl.value.trim() != ""){
        myLeads.push(inputEl.value)
        
        inputEl.value = ""
        localStorage.setItem("myLeads" , JSON.stringify(myLeads));
        renderlist()
    }
    
    
    
})

function renderlist(){
    let varitems = ""
    for(let i = 0 ; i < myLeads.length ; i++){
        varitems += `<li><a target = '_blank' href=${myLeads[i]}>${myLeads[i]}</li>`
    }

    ulList.innerHTML = varitems
}



clearBtn.addEventListener("click",clear)
function clear(){
    localStorage.clear()
    myLeads = []
    renderlist()
}


linkBtn.addEventListener("click",copyurl)
function copyurl(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        if (tabs.length > 0 && tabs[0].url) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            renderlist();
        }
    });
    
  
}