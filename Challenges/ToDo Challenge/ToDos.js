import { createHTMLElement, addToLS, getFromLS, removeFromLS } from "./utils.js"; 

let listNode = document.getElementById("ulList");

export default function renderList(filtro = "all") {
    const keys = Object.keys(localStorage);
    keys.forEach( key => {
        renderTask(key, filtro);
    });
}

//all list filter
let allList = document.getElementById("all");
allList.addEventListener("click", () => {
    listNode.innerHTML = "";
    renderList();
});

//active list filter
let activeList = document.getElementById("active");
activeList.addEventListener("click", () => {
    listNode.innerHTML = "";
    renderList("active");
});

//completed list filter
let completedList = document.getElementById("completed");
completedList.addEventListener("click", () => {
    listNode.innerHTML = "";
    renderList("completed");
});

//addTask to LS, get from them and print it
let addTaskBtn = document.getElementById("addTask");
addTaskBtn.addEventListener("click", () => {
    let task = getInput();
    let taskValue = task.value;
    let taskId = setId();
    let state = "active";
    addTask(taskId, taskValue, state);
});

//functions
function getInput() {
    return document.getElementById("newTask");
}

function setId() {
    return new Date();
}

function addTask(id, task, state) {
    let taskObject = createTaskObject(task, state); 
    addToLS(id, taskObject);
    renderTask(id, state);
    listNode.innerHTML = "";
    renderList();
}

function printTask(id, gotTask) {
    let liNode = createHTMLElement("li");
    let checkboxNode = createCheckBoxElement("input", "type", "checkbox", gotTask.state);
    checkboxNode.addEventListener("change", () => {
        if (checkboxNode.checked == true) {
            changeCheckBoxState("completed", id, gotTask);
        }
        else {
            changeCheckBoxState("active", id, gotTask);
        }
    });

    let taskContent = document.createTextNode(gotTask.content);
    let buttonNode = createHTMLElement("button", "type", "button", "x");
    buttonNode.addEventListener("click", () => {
        removeFromLS(id);
        liNode.remove();
    });

    liNode.appendChild(checkboxNode);
    liNode.appendChild(taskContent);
    liNode.appendChild(buttonNode);

    listNode.appendChild(liNode);
}

function renderTask(id, listFilter) {
    let gotTask = getFromLS(id);
    let answer = filterTask(gotTask.state, listFilter);
    if (answer === "approved") {
        printTask(id, gotTask);
    } else {
        console.log(`Task "${gotTask.content}" hasn't been approved to print.`);
    }
}

function filterTask(state, listFilter) {
    let answer = "";
    if (state === listFilter || listFilter === "all") {
        answer = "approved";
    }
    console.log(answer);
    return answer;
}

function createTaskObject(content, state) {
    const task = {
        content: content,
        state: state
    };

    return task;
}

function changeCheckBoxState(state, id, gotTask) {
    gotTask.state = state;
    removeFromLS(id);
    addToLS(id, gotTask);
}

// create checkbox element
function createCheckBoxElement(tag, attribute, attributeValue, state) {
    let checkboxNode = createHTMLElement(tag, attribute, attributeValue);
    checkCheckboxState(state, checkboxNode);

    return checkboxNode;
}

// check state
function checkCheckboxState(state, checkboxNode) {
    if (state === "completed") {  
        checkboxNode.checked = true;
    } else {
        checkboxNode.checked = false;   
    } 
}