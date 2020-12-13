const endPoint = `https://jsonbox.io/box_df9f80ead9c55b398850`;

//GET TASKS
const getTasksAPI = async () => {
    try {
        const res = await fetch(endPoint, { method: "GET" });
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
};

//POST TASKS
const addTaskAPI = async (task) => {
    try {
        const res = await fetch(endPoint, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
};

//PUT TASKS (update description)
const updateTaskAPI = async (id, task) => {
    try {
        const res = await fetch(`${endPoint}/${id}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
};

//DELETE TASKS
const deleteTaskAPI = async (id) => {
    try {
        const res = await fetch(`${endPoint}/${id}`, {
            method: "DELETE"
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}