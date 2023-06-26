let form = document.getElementById("form");
let input = document.getElementById("input");
let bttn = document.getElementById("bttn");
let orderLists = document.getElementById("orderLists");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
    input.value = "";
});

let formValidation = () => {
    if (input.value === "") {
        console.log("error");
    } else {
        console.log("success");
        acceptData();
        localStorage.setItem("strgInput", JSON.stringify(dataInput));
    }
};

let dataInput = [];

let acceptData = () => {
    dataInput.push(input.value);
    createlist(input.value);
};

let retrieveData = () => {
    let storedData = localStorage.getItem("strgInput");
    if (storedData) {
        dataInput = JSON.parse(storedData);
        orderLists.innerHTML = ""; // Clear the existing list before adding the retrieved items
        dataInput.forEach((item) => {
            createlist(item);
        });
    }
};

window.addEventListener("load", retrieveData);

let createlist = (value) => {
    orderLists.innerHTML += `
    <li>${value} 
        <div class="options">
        <i onclick="editList(this)" class="fa-solid fa-pen"></i>
        <i onclick="deleteList(this)" class="fa-regular fa-trash-can"></i>
        </div>
    </li>`;
};

let deleteList = (e) => {
    const listContainer = e.closest("li"); // Find the closest <li> element

    // Remove the list from the dataInput array
    const listIndex = Array.from(orderLists.children).indexOf(listContainer);
    dataInput.splice(listIndex, 1);

    // Remove the list container from the DOM
    listContainer.remove();

    localStorage.setItem("strgInput", JSON.stringify(dataInput));
};

let editList = (e) => {
    let postedList = e.parentNode.parentNode;
    let listText = postedList.firstChild.textContent.trim();
    input.value = listText;

    postedList.remove();
};