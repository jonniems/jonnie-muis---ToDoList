//Get Tasks
const getTasks = async function () {
    const tasks = await getTasksAPI();
    const taskList = document.getElementById("task-list");
    tasks.forEach(function (task) {
        //Create "li" element
        const taskLi = document.createElement("li");
        taskLi.id = task._id;

        //Create Checkbox
        const taskCheck = document.createElement("input")
        taskCheck.type = "checkbox";
        taskCheck.value = task._id;
        taskCheck.checked = task.done;
        taskCheck.addEventListener('change', updateTask);

        //Create Text element (input)
        const taskInput = document.createElement("input");
        taskInput.className = "input-text";
        if (task.done == true) {
            taskInput.classList.add("strike-through");
        };
        taskInput.id = task._id;
        taskInput.value = task.description;

        //Create Save Button
        const saveButton = document.createElement("button");
        saveButton.value = task._id;
        saveButton.className = "save-btn";
        saveButton.addEventListener('click', updateTask);

        //Create Delete Button
        const delButton = document.createElement("button");
        delButton.value = task._id;
        delButton.className = "delete-btn";
        delButton.addEventListener('click', deleteTask);

        //Put everything together
        taskList.appendChild(taskLi);
        taskLi.appendChild(taskCheck)
        taskLi.appendChild(taskInput);
        taskLi.appendChild(saveButton);
        taskLi.appendChild(delButton);
    })
};

//Remove Tasks from DOM
const removeTasks = () => {
    const taskList = document.getElementById("task-list");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    };
}

//Refresh Tasks in DOM
const refreshTasks = () => {
    removeTasks();
    getTasks();
}

//Add Tasks
const addTask = async () => {
    const taskInput = document.querySelector("#task-input");
    const description = taskInput.value;
    if (description != "") {
        const task = {
            description: description,
            done: false
        };
        const newTask = await addTaskAPI(task);
        taskInput.value = "";
        refreshTasks();
    }
}

//Update Tasks
const updateTask = async (event) => {
    const id = event.target.value;
    const description = document.getElementById(id).children[1].value;
    const done = document.getElementById(id).children[0].checked
    if (description != "") {
        const task = {
            description: description,
            done: done
        };
        const updateTask = await updateTaskAPI(id, task);
        refreshTasks();
    }
}

//Delete Tasks
const deleteTask = async (event) => {
    const id = event.target.value;
    if (id != "") {
        await deleteTaskAPI(id);
        refreshTasks();
    }
}

document.querySelector("#task-form").addEventListener('submit', function (event) {
    addTask();
    event.preventDefault();
});

getTasks();
