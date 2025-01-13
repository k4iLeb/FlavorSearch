let data = [];

// Load data from the JSON file

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json();
        console.log('Data loaded:', data);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

const input = document.querySelector(".input")
const searchBtn = document.querySelector(".btn")
const container = document.querySelector(".container")
const resultsDiv = document.querySelector(".results")
// console.log(search);


// **** LISTENERS ****

searchBtn.addEventListener("click", ()=> {
    const search = input.value.toUpperCase().split(' ')
    const results = data.filter(item => Object.values(item).some(value => value.includes(search)))
    console.log(search);
    
    console.log(results);
    input.focus()
    displayResults(results)
})

// **** FUNCTIONS ****

function displayResults(results){
    // for(let item of results) {
    //     let para = document.createElement('p')
    //     para.textContent = `${results.Name}: ${results.Description} <<${results.Category}>>`
    //     resultsDiv.appendChild(para)
    //     console.log(item);
        
    // }
    resultsDiv.innerHTML = results.map(row =>
        `<div>${Object.entries(row).map(([key, value]) => `${value} `).join('')}</div>`
    ).join('<hr>');
}

window.onload = loadData;