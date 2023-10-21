// Retrieve tasks from local storage (if available)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('task');
    const categorySelect = document.getElementById('category');
    const dueDateInput = document.getElementById('due-date');
    const prioritySelect = document.getElementById('priority');

    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false,
            category,
            dueDate,
            priority,
        };

        tasks.push(newTask);
        updateLocalStorage();

        taskInput.value = '';
        categorySelect.value = 'none';
        dueDateInput.value = '';
        prioritySelect.value = 'none';

        displayTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    displayTasks();
}

function displayTasks(filteredTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasksToDisplay = filteredTasks || tasks;

    tasksToDisplay.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <span>Category: ${task.category}</span>
            <span>Due Date: ${task.dueDate}</span>
            <span>Priority: ${task.priority}</span>
            <button onclick="toggleTask(${index})">Toggle</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to filter tasks based on category, priority, or completion status.
function filterTasks() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;
    const completedFilter = document.getElementById('completed-filter').checked;

    const filteredTasks = tasks.filter(task => {
        return (
            (categoryFilter === 'all' || task.category === categoryFilter) &&
            (priorityFilter === 'all' || task.priority === priorityFilter) &&
            (!completedFilter || task.completed === completedFilter)
        );
    });

    displayTasks(filteredTasks);
}

// Function to set reminders or notifications (simplified; a real implementation may require a server or external service).
function setReminder(index) {
    const task = tasks[index];
    const dueDate = new Date(task.dueDate);
    const currentDate = new Date();

    if (dueDate > currentDate) {
        const timeUntilDue = dueDate - currentDate;
        // In a real application, you would implement notifications or reminders here.
        alert(`Reminder: "${task.text}" is due in ${Math.floor(timeUntilDue / (1000 * 60))} minutes.`);
    } else {
        alert(`"${task.text}" is already overdue!`);
    }
}

// Event listeners
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('category-filter').addEventListener('change', filterTasks);
document.getElementById('priority-filter').addEventListener('change', filterTasks);
document.getElementById('completed-filter').addEventListener('change', filterTasks);
document.getElementById('category').addEventListener('change', filterTasks);
document.getElementById('priority').addEventListener('change', filterTasks);

displayTasks();
