const addnewTask = document.getElementById("addNew")
const modalbox = document.getElementById("modalbox")
let form = document.getElementById("form")
let input = document.getElementById("input")
let date = document.getElementById("date")
let bttn = document.getElementById("bttn")
let tasks = document.getElementById("tasks")
let home = document.getElementById("home")

addnewTask.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("button clicked")
    modalbox.classList.add("modalboxdisplay")
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    formValidation()
    input.value = ""
    date.value = ""
})

home.addEventListener("click", (e) => {
    e.preventDefault();
    modalbox.classList.remove("modalboxdisplay");
});

let formValidation = () => {
    if (input.value === "" || date.value === "") {
        console.log("error");
    } else {
        acceptData();
        // Store data in local storage
        localStorage.setItem("data", JSON.stringify(data));
    }
};

let data = {
    tasks: [] // Initialize tasks as an empty array
};
  
let acceptData = () => {
    const task = {
      text: input.value,
      date: date.value
    };
  
    data.tasks.push(task); // Add the new task to the tasks array
    createTask(task); // Pass the new task to the createTask function
};

  
//GET DATA FROM LOCAL STORAGE//
let retrieveData = () => {
    let storedData = localStorage.getItem("data");
    if (storedData) {
      data = JSON.parse(storedData);
      data.tasks.forEach(task => {
        createTask(task); // Call the createTask function for each task
      });
    }
};
window.addEventListener("load", retrieveData);

  

let createTask = (task) => {
    tasks.innerHTML += `<div>
      <span>Task:</span>
      <span>${task.date}</span>
      <p>${task.text}</p>
  
      <span class="options">
        <i onclick="editTask(this)" class="fa-solid fa-pen-to-square"> Edit</i>
        <i onclick="deleteTask(this)" class="fa-regular fa-trash-can"> Delete</i>
      </span>
    </div>`;
};


let deleteTask = (e) => {
    // Find the task's container element
    const taskContainer = e.closest("div");
    
    // Remove the task from the data.tasks array In localstorage
    const taskIndex = Array.from(tasks.children).indexOf(taskContainer);
    data.tasks.splice(taskIndex, 1);
    
    // Remove the task from the DOM
    taskContainer.remove();
    
    // Store the updated data in local storage
    localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
    let postedTask = e.parentElement.parentElement;
    modalbox.classList.add("modalboxdisplay");

    // Retrieve task details from the posted task
    let taskText = postedTask.querySelector("p").innerHTML;
    let taskDate = postedTask.querySelector("span:nth-child(2)").innerHTML;

    // Set task details in the input and date fields
    input.value = taskText;
    date.value = taskDate;

    // Remove the posted task
    postedTask.remove();
}










