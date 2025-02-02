let data = [];

// Load data from the JSON file

async function loadData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    data = await response.json();
    // console.log('Data loaded:', data);
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

const input = document.querySelector(".input");
const searchBtn = document.querySelector(".btn");
const container = document.querySelector(".container");
const resultsDiv = document.querySelector(".results");
const list = document.querySelector(".list");
const clearBtn = document.querySelector(".clear-btn");

// **** LISTENERS ****

searchBtn.addEventListener("click", () => {
  search();
});

input.addEventListener("input", (e) => {
  if (input.value == "") {
    clearBtn.style.visibility = "hidden";
  } else {
    clearBtn.style.visibility = "visible";
  }
});

searchBtn.addEventListener("mousedown", () => {
  searchBtn.style.boxShadow = "inset 0px 0px 5px rgb(53, 52, 52)";
});

document.addEventListener("mouseup", () => {
  searchBtn.style.boxShadow = "none";
});

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    search();
    searchBtn.style.boxShadow = "inset 0px 0px 5px rgb(53, 52, 52)";
  }
});

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    searchBtn.style.boxShadow = "none";
  }
});

// CLEAR BUTTON
clearBtn.addEventListener("click", (e) => {
  input.value = "";
  clearBtn.style.visibility = "hidden";
  input.focus();
});

// **** FUNCTIONS ****

function search() {
  const search = input.value.toUpperCase().split(" ");
  const results = data.filter((item) =>
    search.every((term) =>
      Object.values(item).some((value) => value.toUpperCase().includes(term))
    )
  );

  input.focus();
  displayResults(results);
}

function displayResults(results) {
  list.innerHTML = "";
  results.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `<div class="flaDiv">
      <span class="flaName">${item.Name.trim()}</span>
      <span class="flaCategory">${item.Category}</span>
      <span class="flaQty">${item.Quantity}</span>
    </div> 
    <span class="flaDesc">${item.Description}</span>`;

    list.appendChild(listItem);
  });
  checkPrio();
}

// **** check prio ****
function checkPrio() {
  let listItem = document.querySelectorAll("li");
  const highPrio = ["SWEET DREAMS", "CARAVELLA", "5SENSES"];
  const midPrio = [
    "OMERTA",
    "THE DONS",
    "LA FAMIGLIA",
    "SWEETUP",
    "CARAT",
    "GUSTO",
    "BISHA",
    "LEGACY",
    "WAVES",
    "NECTAR",
    "ABSTRACT",
    "SHELBY",
    "SONS OF VAPING",
    "VENDETTA",
    "OPMH",
    "NIXX",
  ];
  listItem.forEach((item) => {
    highPrio.forEach((flavor) => {
      if (item.innerText.includes(flavor)) {
        item.style.backgroundColor = "#A1DDED90";
      }
    });
    midPrio.forEach((flavor) => {
      if (item.innerText.includes(flavor)) {
        item.style.backgroundColor = "rgba(138, 195, 104, 0.6)";
      }
    });
  });
}

window.onload = loadData;
