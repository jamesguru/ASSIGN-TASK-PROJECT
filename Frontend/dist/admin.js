"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const assignTasks = document.querySelector(".assign-tasks");
const showTasks = document.querySelector(".show-tasks");
const addTasks = document.querySelector(".add-tasks");
const addTask = document.querySelector(".add-task");
const checkboxShowBox = document.querySelector(".assign-task");
const checkbox = document.querySelector(".completed");
const hideTasks = document.querySelector(".goBack");
const hideAddTask = document.querySelector(".go-back");
const log_out = document.querySelector(".logout");
const tasksList = document.querySelector(".tasks-list");
const developerList = document.querySelector(".developer-lists");
const addTitle = document.querySelector(".add-title");
const addDescription = document.querySelector(".add-desc");
const addDate = document.querySelector(".add-date");
const addButton = document.querySelector(".add-btn");
const upload_success = document.querySelector(".upload_success");
const upload_failure = document.querySelector(".upload_failure");
const delete_success = document.querySelector(".delete_success");
const assign_success = document.querySelector(".assign_success");
const assign_failure = document.querySelector(".assign_failure");
const noTasks = document.querySelector(".no-tasks");
const Title = document.querySelector(".title");
const token = JSON.parse(localStorage.getItem("token"));
let tasks = [];
let developers = [];
let dev_id;
let dev_email;
let dev_name;
const fetchTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    let li = "";
    try {
        fetch("http://localhost:3000/api/tasks", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
            tasks = data.tasks;
            if (tasks.length) {
                tasks.forEach((task, index) => {
                    li += `
              
              <li>
              <div class="task-item">
  
                
  
  
                  <span class="title">${task.title}</span>

                  <span class="title">${task.completed === 'c' ? "completed" : 'pending'}</span>

                  
                  <span class="title">${task.date}</span>
                 
                  <span class=${task.assigned === "not assigned" ? "status" : "completed"} 
                  onclick=${task.assigned === "not assigned"
                        ? `AssignTask(${task.id})`
                        : ""}>
                  
                  ${task.assigned === "not assigned" ? "assign" : "assigned"}</span>

                  <ion-icon class="delete" name="trash-outline" onclick="DeleteTask(${task.id})"></ion-icon>

                  
              </div>
  
  
          </li>
              
              
              
              `;
                });
                tasksList.innerHTML = li;
            }
            else {
                noTasks.style.display = "flex";
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
    catch (error) { }
});
fetchTasks();
showTasks.addEventListener("click", () => {
    assignTasks.style.display = "flex";
});
addTasks.addEventListener("click", () => {
    addTask.style.display = "flex";
});
hideTasks.addEventListener("click", () => {
    assignTasks.style.display = "none";
});
hideAddTask.addEventListener("click", () => {
    addTask.style.display = "none";
});
const AssignTask = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    if (dev_id) {
        fetch(`http://localhost:3000/api/tasks/assign/${id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                developer_id: dev_id,
                assigned: "assigned",
                project: title,
                name: dev_name,
                email: dev_email,
            }),
        });
        fetch(`http://localhost:3000/api/developers/${dev_id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                assigned: "assigned",
            }),
        });
        assign_success.style.display = "flex";
        setTimeout(() => {
            assign_success.style.display = "none";
        }, 2000);
        fetchTasks();
    }
    else {
        assign_failure.style.display = "flex";
        setTimeout(() => {
            assign_failure.style.display = "none";
        }, 2000);
        fetchTasks();
    }
});
const DeleteTask = (id) => {
    console.log(dev_id);
    fetch(`http://localhost:3000/api/tasks/${id}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method: "DELETE",
    });
    delete_success.style.display = "flex";
    setTimeout(() => {
        delete_success.style.display = "none";
    }, 2000);
    fetchTasks();
    if (dev_id) {
        fetch(`http://localhost:3000/api/tasks/unassign/${dev_id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                assigned: "not assigned",
            }),
        });
        fetchTasks();
    }
};
addButton.addEventListener("click", () => {
    if (addTitle.value && addDescription.value && addDate.value) {
        fetch("http://localhost:3000/api/tasks/", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                title: addTitle.value,
                description: addDescription.value,
                date: addDate.value,
            }),
        });
        addTitle.value = "";
        addDescription.value = "";
        addDate.value = "";
        upload_success.style.display = "flex";
        setTimeout(() => {
            upload_success.style.display = "none";
        }, 2000);
        fetchTasks();
    }
    else {
        upload_failure.style.display = "flex";
        setTimeout(() => {
            upload_failure.style.display = "none";
        }, 2800);
    }
});
log_out.addEventListener("click", () => {
    localStorage.clear();
    location.href = "login.html";
});
const fetchDevelopers = () => __awaiter(void 0, void 0, void 0, function* () {
    let li = "";
    try {
        fetch("http://localhost:3000/api/developers")
            .then((response) => response.json())
            .then((data) => {
            developers = data.developers;
            if (developers.length) {
                developers.forEach((developer) => {
                    li += `
              
              <li>
              <div class="task-item">
  
                
                <input 
                
                onclick="Checkbox('${developer.developer_id}','${developer.email}','${developer.fullname}')"
                
                type="checkbox" id="checkbox"
                
               

                ${developer.assigned === "assigned" ? `disabled` : ""}
              >
  
                  <span class=${developer.assigned === "assigned" ? "title-line-through" : "title"}>${developer.fullname}</span>

    
                 
                  <span class="completed">
                  
                  ${developer.assigned === "not assigned"
                        ? "not assigned"
                        : "assigned"}</span>

                  

                  
              </div>
  
  
          </li>
              
              
              
              `;
                });
                developerList.innerHTML = li;
            }
            else {
                noTasks.style.display = "flex";
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
    catch (error) { }
});
fetchDevelopers();
function Checkbox(id, email, name) {
    assignTasks.style.display = "flex";
    console.log('helloooo');
    dev_id = id;
    dev_email = email;
    dev_name = name;
}
