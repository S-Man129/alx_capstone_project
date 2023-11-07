import { validateForm, getFieldsValue, reset, updateTask } from "./util.js";

const username = localStorage.getItem("username");
if (username) {
    const user = username.charAt(0).toUpperCase() + username.slice(1);
    document.querySelector('#username').innerText = user;

    getUserTasks(username) 
}

//Create a local storage key specific to the user
const userTasksKey = `tasks_${username}`;

// Retrieve the user's tasks from local storage
const userTask = JSON.parse(localStorage.getItem(userTasksKey)) || [];


const modal = document.querySelector('#addTaskModal');
const addTaskBtn = document.querySelector('#addTaskButton');
const createTaskBtn = document.querySelector('#addTask1');

createTaskBtn.onclick = function() {
    const taskformHead = document.querySelector('.form h2');
    taskformHead.innerText = 'Create new task';
    modal.style.display = "block";
    addTaskBtn.innerText = 'Add Task'
}

const createTaskBtn2 = document.querySelector('#addTask2');

createTaskBtn2.onclick = function() {
    const taskformHead = document.querySelector('.form h2');
    taskformHead.innerText = 'Create new task';
    modal.style.display = "block";
    addTaskBtn.innerText = 'Add Task'
}

// close form 
const close = document.getElementsByClassName("close")[0];
close.onclick = function() {
    modal.style.display = "none";
}

let currentPosition = -1;

addTaskBtn.addEventListener('click', function() {
    const isValidated = validateForm();

    if (!isValidated){
        return;
    }

    console.log('Task button is now working');

    const formValues = getFieldsValue();
    reset();

    const taskformHead = document.querySelector('.form h2');

    if (currentPosition === -1) {
        // If currentPosition is -1, it means we are creating a new task
        userTasks.push(formValues);
    } else {
        // If currentPosition is set, it means we are updating an existing task
        userTasks[currentPosition] = formValues;
        currentPosition = -1; // Reset currentPosition after updating
        taskformHead.innerText = 'Create new task';
        addTaskBtn.innerText = 'Add Task';
    }

    updateLocalStorage(userTasks, username)

    addTaskToContainer(userTasks);
});

const addTaskToContainer = (userTask) => {
    const taskCardContainer = document.querySelector('.taskCardContainer');
    taskCardContainer.innerHTML = '';
    for (let itemPosition = 0; itemPosition < userTask.length; itemPosition++)
    {
        const task = userTask[itemPosition];
        const taskcardDisplay = displayTasks(task, itemPosition);
        taskCardContainer.appendChild(taskcardDisplay);
    }

} 

const displayTasks = (card, index) => {

    // Creating an element for the card details
    const taskCard = document.createElement('div');
    taskCard.setAttribute('class', 'taskCard');
    taskCard.style.borderColor = getBorderColorByCategory(card.category);

    taskCard.addEventListener('mouseover', () => {
        taskCard.style.boxShadow = '5px 7px #000';
    });
    taskCard.addEventListener('mouseout', () => {
        taskCard.style.boxShadow = 'none';
    });

    //creating a div tag that contain the category and the complete icon
    const taskHead = document.createElement('div')
    taskHead.setAttribute('class', 'taskcardHeader');

    const categoryTag = document.createElement('p')
    categoryTag.setAttribute('id', 'taskcardCategoryName');
    taskHead.appendChild(categoryTag);
    categoryTag.textContent = card.category.toUpperCase(); // display task category from form field
    categoryTag.style.color = getBorderColorByCategory(card.category);

    const completeIcon = document.createElement('i')
    completeIcon.setAttribute('class', 'fa-regular fa-circle');
    completeIcon.setAttribute('id', 'completeTask');
    taskHead.appendChild(completeIcon);

    completeIcon.addEventListener("click", function() {
        if (completeIcon.classList.contains("fa-circle")) {
            // Mark the task as complete
            completeIcon.classList.remove("fa-circle");
            completeIcon.classList.add("fa-circle-check");
            taskCard.style.borderColor = "green";
            taskCard.style.boxShadow = "0 0 10px green"; // Add box shadow style
        } else {
            // Unselect the task
            completeIcon.classList.remove("fa-circle-check");
            completeIcon.classList.add("fa-circle");
            taskCard.style.borderColor = getBorderColorByCategory(card.category); // Reset border color
            taskCard.style.boxShadow = "none"; // Remove box shadow
        }
    });

    taskCard.appendChild(taskHead); // append task head to taskcard

    const horizontalLine = document.createElement('hr');

    taskCard.appendChild(horizontalLine); // append horizontal rule to taskcard

    // Creating a task card body
    const taskcardBody = document.createElement('div');
    taskcardBody.setAttribute('class', 'taskcardBody');

    const nameofTask = document.createElement('h3');
    nameofTask.setAttribute('id', 'taskName');
    taskcardBody.appendChild(nameofTask);
    nameofTask.textContent = card.taskName; // display task name from form field

    const taskDescription = document.createElement('p');
    taskDescription.setAttribute('id', 'taskDescription');
    taskcardBody.appendChild(taskDescription);
    taskDescription.textContent = card.description; // display task description from form field

    taskCard.appendChild(taskcardBody); // append task body to taskcard

    //Creating a div element for task time
    const taskTimeDiv = document.createElement('div');
    taskTimeDiv.setAttribute('class', 'taskcardTime');

    const timeIcon = document.createElement('i');
    timeIcon.setAttribute('class', 'fa-regular fa-clock fa-lg');
    taskTimeDiv.appendChild(timeIcon);

    const taskcardTime = document.createElement('span');
    taskcardTime.setAttribute('id', 'taskcardTime');
    taskTimeDiv.appendChild(taskcardTime);
    taskcardTime.textContent = card.dueTime; // display time from form field

    taskCard.appendChild(taskTimeDiv); // append task time to taskcard

    //Creating a div element for task date
    const taskDateDiv = document.createElement('div');
    taskDateDiv.setAttribute('class', 'taskcardDate');

    const dateIcon = document.createElement('i');
    dateIcon.setAttribute('class', 'fa-regular fa-calendar-days fa-lg');
    taskDateDiv.appendChild(dateIcon);

    const taskcardDate = document.createElement('span');
    taskcardDate.setAttribute('id', 'taskcardTime');
    taskDateDiv.appendChild(taskcardDate);
    taskcardDate.textContent = card.dueDate; // display date from form field

    taskCard.appendChild(taskDateDiv); //append task date to taskcard

    // Creating a div element for the control buttons
    const taskcardControl = document.createElement('div');
    taskcardControl.setAttribute('id', 'taskcardControl');

    //Edit task
    const editTask = document.createElement('a');
    editTask.setAttribute('class', 'taskcardEdit');

    editTask.innerHTML = `<i class="fa-regular fa-edit fa-lg"></i> Edit task`;

    taskcardControl.appendChild(editTask);

    editTask.addEventListener('click', function() {
        console.log('you edit', card.taskName);
        updateTask(userTask[index]);
        currentPosition = index;
        
    });

    //Delete Task 
    const deleteTask = document.createElement('a');
    deleteTask.setAttribute('class', 'taskcardDelete');

    deleteTask.innerHTML = `<i class="fa-regular fa-circle-xmark fa-lg"></i> Delete task`;

    taskcardControl.appendChild(deleteTask);

    deleteTask.addEventListener('click', function () {
        if (confirm("Are you sure you want to delete this task?")) {
            userTasks.splice(index, 1);
            updateLocalStorage(userTasks, username)
            addTaskToContainer(userTasks);
        }
    })

    taskCard.appendChild(taskcardControl); //append task control to taskcard

    return taskCard;
}

function updateLocalStorage(userTasks, username) {
    // Create a user-specific local storage key
    const userTasksKey = `tasks_${username}`;

    // Store the tasks for the current user
    localStorage.setItem(userTasksKey, JSON.stringify(userTasks));
}

// Function to retrieve tasks for the logged-in user
function getUserTasks(username) {
    // Create a user-specific local storage key
    const userTasksKey = `tasks_${username}`;

    // Retrieve the user's tasks from local storage
    return JSON.parse(localStorage.getItem(userTasksKey)) || [];
}


document.getElementById('taskCategory').addEventListener('change', filterTasks);

//Function to filter tasks based on category, priority, or completion status.
function filterTasks() {
    const categoryFilter = document.querySelector('#taskCategory').value;

    const filteredTasks = userTask.filter(task => {
        return (
            (categoryFilter === 'all' || task.category === categoryFilter)
        );
    });

    addTaskToContainer(filteredTasks);
}

// Function to get the border color based on the task category
function getBorderColorByCategory(category) {
    switch (category) {
        case "work":
            return "orangered";
        case "study":
            return "yellow";
        case "personal":
            return "blue";
        case "meeting":
            return "purple";
        case "event":
            return "brown";
        default:
            return "black";
    }
}

const userTasks = getUserTasks(username);

addTaskToContainer(userTasks);