const taskNameInput = document.querySelector('#fieldTaskName');
const taskDateInput = document.querySelector('#fieldTaskDate');
const taskTimeInput = document.querySelector('#fieldTaskTime');
const taskCategoryField = document.querySelector('#taskCategoryForm');
const taskDescriptionField = document.querySelector('#fieldTaskDescription');

const addTaskBtn = document.querySelector('#addTaskButton');
const modal = document.querySelector('#addTaskModal');

const validateForm = () => {
    const taskInputs = document.querySelectorAll('input');  

    const taskName = taskNameInput.value;
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;
    const taskCategory = taskCategoryField.value;
    const taskDescription = taskDescriptionField.value;
    
    if (!taskName || !taskDate || !taskTime || taskCategory === " " || !taskDescription) {
        alert ("Please fill in all fields.");
        return false;    
    } 

    return true;
};

const getFieldsValue = () => {
    const taskName = taskNameInput.value.trim();
    const dueDate = taskDateInput.value;
    const dueTime = taskTimeInput.value;
    const category = taskCategoryField.value;
    const description = taskDescriptionField.value;

    return {
        taskName, dueDate, dueTime, category, description
    }
};

const reset = () => {
    taskNameInput.value = '';
    taskDateInput.value = '';
    taskTimeInput.value = '';
    taskCategoryField.value = '';
    taskDescriptionField.value = '';
}

function updateTask(task) {
    const taskformHead = document.querySelector('.form h2');
    taskformHead.innerText = 'Edit Task';
    modal.style.display = 'block';
    addTaskBtn.innerText = 'Update Task';

    // Populate the input fields with the task data for editing
    document.getElementById('fieldTaskName').value = task.taskName;
    document.getElementById('fieldTaskDate').value = task.dueDate;
    document.getElementById('fieldTaskTime').value = task.dueTime;
    document.getElementById('taskCategoryForm').value = task.category;
    document.getElementById('fieldTaskDescription').value = task.description;
}

export { validateForm, getFieldsValue, reset, updateTask };
