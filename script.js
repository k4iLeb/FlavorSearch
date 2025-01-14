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

// **** LISTENERS ****

searchBtn.addEventListener("click", () => {
  search();
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
    listItem.innerHTML = `<span>${item.Name.trim()}</span>: ${
      item.Description
    }`;

    list.appendChild(listItem);
  });
  const itemName = document.querySelectorAll(".results span");
  itemName.forEach((item) => {
    item.classList.add("item-name");
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
