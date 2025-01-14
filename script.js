let data = [];

// Load data from the JSON file

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
        // console.log('Data loaded:', data);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

const input = document.querySelector(".input")
const searchBtn = document.querySelector(".btn")
const container = document.querySelector(".container")
const resultsDiv = document.querySelector(".results")
const list = document.querySelector(".list")

// **** LISTENERS ****

searchBtn.addEventListener("click", ()=> {
    const search = input.value.toUpperCase().split(' ')
    const results = data.filter(item => 
        search.every(term => 
            Object.values(item).some(value => value.toUpperCase().includes(term))
        )
      );

    input.focus()
    displayResults(results)
})

input.addEventListener("keydown", (e)=>{
    if(e.key=="Enter"){
        const search = input.value.toUpperCase().split(' ')
    const results = data.filter(item => 
        search.every(term => 
            Object.values(item).some(value => value.toUpperCase().includes(term))
        )
      );

    input.focus()
    displayResults(results)
    }
    
})

// **** FUNCTIONS ****

function displayResults(results){
    list.innerHTML = ""
    for(let item of results) {
        let listItem = document.createElement('li')
        listItem.textContent = `${item.Name.trim()}: ${item.Description}`
        list.appendChild(listItem)
    }
    checkPrio()
}

// **** check prio ****
function checkPrio() {
    let listItem = document.querySelectorAll('li')
    // **** WIP ****
    const highPrio = []
    const midPrio = []
    listItem.forEach((item)=> {
        if(item.innerText.includes('OMERTA')) {
            item.style.backgroundColor = "rgba(138, 195, 104, 0.6)"
            console.log('hi');
            
        }
    })
    // console.log(listItem);
    
}

// **** TEST ****

// results = [
//     {
//         "Name": "CARAVELLA APPLE PIE TOBACCO",
//         "Description": "ΑΜΕΡΙΚΑΝΙΚΟΣ ΚΑΠΝΟΣ, ΜΗΛΟΠΙΤΑ ( ΗΜΙΚΑΠΝΙΚΟ )",
//         "Category": "ΗΜΙΚΑΠΝΙΚΟ"
//     },
//     {
//         "Name": "RIPE VAPES APPLE TOBACCO",
//         "Description": "ΜΗΛΟ , ΚΑΠΝΟΣ ( ΗΜΙΚΑΠΝΙΚΟ )",
//         "Category": "ΗΜΙΚΑΠΝΙΚΟ"
//     },
//     {
//         "Name": "OMERTA TERRA SAPPHIRE ",
//         "Description": "ΚΛΑΣΙΚΟΣ ΚΑΠΝΟΣ , ΠΑΡΑΔΟΣΙΑΚΟ ΤΣΙΓΑΡΟ",
//         "Category": "ΚΑΠΝΙΚΟ"
//     }
// ]

// displayResults(results)

window.onload = loadData;