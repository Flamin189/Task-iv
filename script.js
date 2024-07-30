document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    const fetchTasks = () => {
        fetch("/tasks")
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = "";
                data.forEach(task => {
                    const li = document.createElement("li");
                    li.textContent = task;
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add("deleteBtn");
                    deleteBtn.addEventListener("click", () => {
                        deleteTask(task);
                    });
                    li.appendChild(deleteBtn);
                    taskList.appendChild(li);
                });
            });
    };

    const addTask = () => {
        const task = taskInput.value;
        fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `task=${task}`
        })
        .then(fetchTasks);
    };

    const deleteTask = (task) => {
        fetch(`/tasks?task=${encodeURIComponent(task)}`, {
            method: "DELETE",
        })
        .then(fetchTasks);
    };

    addTaskBtn.addEventListener("click", addTask);
    fetchTasks();
});
