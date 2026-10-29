const submit = document.getElementById("submit")
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const priority = document.getElementById("priority-select");
const error = document.getElementById("error");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("left");
const filters = document.getElementById("filters");
const filterButtons = filters.querySelectorAll("button");
const clearDone = document.getElementById("clear-done");
const empty = document.getElementById("empty");
let currentFilter = "all";


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskText = input.value.trim()
    if (taskText === "") {
        error.hidden = false;
        error.textContent = "Please type a task"
        return;
    }
    error.hidden = true
    const li = document.createElement("li")
    const span = document.createElement("span")
    span.textContent = taskText
    span.className = "text";
    const button = document.createElement("button")
    button.textContent = "x"
    button.className = "delete";
    li.appendChild(span)
    li.appendChild(button)
    taskList.appendChild(li)
    updateEmptyMessage();
    if (currentFilter === "done") {
        li.hidden = true;
    }
    const priorityValue = priority.value;
    li.className = `priority-${priorityValue}`;
    input.value = "";
    input.focus();
    updateTasksLeft();

});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const li = event.target.closest("li");
        li.remove();
        updateTasksLeft();
        updateEmptyMessage();
    } else {
        const li = event.target.closest("li");

        if (li) {
            li.classList.toggle("done");
            updateTasksLeft();
        }
    }
});
function updateTasksLeft() {
    const count = taskList.querySelectorAll("li:not(.done)").length;
    counter.textContent = count;
}


filters.addEventListener("click", (event) => {
    const filterValue = event.target.dataset.filter;
    currentFilter = filterValue;
    for (const button of filterButtons) {
        button.classList.remove("active");
    }
    event.target.classList.add("active");
    const tasks = taskList.querySelectorAll("li");
    for (const li of tasks) {
        if (filterValue === "done") {

            if (!li.classList.contains("done")) { li.hidden = true }
            if (li.classList.contains("done")) { li.hidden = false }
        }
        if (filterValue === "active") {
            if (li.classList.contains("done")) { li.hidden = true }
            if (!li.classList.contains("done")) { li.hidden = false }
        }
        if (filterValue === "all") {
            li.hidden = false;
        }
    }

});

clearDone.addEventListener("click", () => {
    const tasks = taskList.querySelectorAll("li.done");
    for (const li of tasks) {
        li.remove()
        updateTasksLeft();
        updateEmptyMessage();
    }

});

function updateEmptyMessage() {
    if (taskList.children.length === 0) {
        empty.hidden = false;
    } else {
        empty.hidden = true;
    }
}
updateEmptyMessage();


// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)

// Step 2: click a task to toggle the "done" class

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")
