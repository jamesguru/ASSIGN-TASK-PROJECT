const assignTasks = document.querySelector(".assign-tasks") as HTMLDivElement;

const showTasks = document.querySelector(".show-tasks") as HTMLLIElement;

const addTasks = document.querySelector(".add-tasks") as HTMLLIElement;

const addTask = document.querySelector(".add-task") as HTMLDivElement;

const checkboxShowBox = document.querySelector(
  ".assign-task"
) as HTMLInputElement;
const checkbox = document.querySelector(".completed") as HTMLInputElement;

const hideTasks = document.querySelector(".goBack") as HTMLSpanElement;
const hideAddTask = document.querySelector(".go-back") as HTMLSpanElement;

const log_out = document.querySelector(".logout") as HTMLSpanElement;

const tasksList = document.querySelector(".tasks-list") as HTMLUListElement;

const developerList = document.querySelector(
  ".developer-lists"
) as HTMLUListElement;

const addTitle = document.querySelector(".add-title") as HTMLInputElement;

const addDescription = document.querySelector(".add-desc") as HTMLInputElement;

const addDate = document.querySelector(".add-date") as HTMLInputElement;

const addButton = document.querySelector(".add-btn") as HTMLButtonElement;

const upload_success = document.querySelector(
  ".upload_success"
) as HTMLDivElement;

const upload_failure = document.querySelector(
  ".upload_failure"
) as HTMLDivElement;

const delete_success = document.querySelector(
  ".delete_success"
) as HTMLDivElement;

const assign_success = document.querySelector(
  ".assign_success"
) as HTMLDivElement;

const assign_failure = document.querySelector(
  ".assign_failure"
) as HTMLDivElement;





const noTasks = document.querySelector(".no-tasks") as HTMLDivElement;

const Title = document.querySelector(".title") as HTMLSpanElement;

interface Developer {
  developer_id: number;
  fullname: string;
  email: string;
  password: string;
  assigned: string;
  role: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: string;
  assigned: string;
  task_id: number;
}




let tasks: Task[] = [];

let developers: Developer[] = [];

let dev_id: string | null;

const fetchTasks = async () => {
  let li = "";

  try {
    fetch("http://localhost:3000/api/tasks")
      .then((response) => response.json())

      .then((data) => {
        tasks = data.tasks;

        if (tasks.length) {
          tasks.forEach((task, index) => {
            li += `
              
              <li>
              <div class="task-item">
  
                
  
  
                  <span class="title">${task.title}</span>

                  <span class="title">${task.completed}</span>

                  
                  <span class="title">${task.date}</span>
                 
                  <span class=${
                    task.assigned === "not assigned" ? "status" : "completed"
                  } 
                  onclick=${
                    task.assigned === "not assigned"
                      ? `AssignTask(${task.id})`
                      : ""
                  }>
                  
                  ${
                    task.assigned === "not assigned" ? "assign" : "assigned"
                  }</span>

                  <ion-icon class="delete" name="trash-outline" onclick="DeleteTask(${
                    task.id
                  })"></ion-icon>

                  
              </div>
  
  
          </li>
              
              
              
              `;
          });

          tasksList.innerHTML = li;
        } else {
          noTasks.style.display = "flex";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
};

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





const AssignTask = async (id: number) => {
  if (dev_id) {
    fetch(
      `http://localhost:3000/api/tasks/assign/${id}`,

      {
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        method: "PUT",

        body: JSON.stringify({
          developer_id: dev_id,
          assigned: "assigned",
        }),
      }
    );

    

    fetch(
      `http://localhost:3000/api/developers/${dev_id}`,

      {
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        method: "PUT",

        body: JSON.stringify({
          assigned: "assigned",
        }),
      }
    );

    assign_success.style.display = "flex";

    setTimeout(() => {
      assign_success.style.display = "none";
    }, 2000);

    dev_id = null;
    fetchTasks();
  } else {
    assign_failure.style.display = "flex";

    setTimeout(() => {
      assign_failure.style.display = "none";
    }, 2000);

    fetchTasks();
  }
};

const DeleteTask = (id: number) => {
  fetch(
    `http://localhost:3000/api/tasks/${id}`,

    {
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      method: "DELETE",
    }
  );
  

  delete_success.style.display = "flex";

  setTimeout(() => {
    delete_success.style.display = "none";
  }, 2000);

  fetchTasks();


  fetch(
    `http://localhost:3000/api/developers/${dev_id}`,

    {
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      method: "DELETE",

      
    }
  );

  
};

addButton.addEventListener("click", () => {
  if (addTitle.value && addDescription.value && addDate.value) {
    console.log(addTitle.value, addDescription.value, addDate.value);

    fetch(
      "http://localhost:3000/api/tasks/",

      {
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        method: "POST",

        body: JSON.stringify({
          title: addTitle.value,

          description: addDescription.value,

          date: addDate.value,
        }),
      }
    );

    addTitle.value = "";

    addDescription.value = "";

    addDate.value = "";

    upload_success.style.display = "flex";

    setTimeout(() => {
      upload_success.style.display = "none";
    }, 2000);

    fetchTasks();
  } else {
    upload_failure.style.display = "flex";

    setTimeout(() => {
      upload_failure.style.display = "none";
    }, 2800);
  }
});

log_out.addEventListener("click", () => {
  location.href = "login.html";
});

const fetchDevelopers = async () => {
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
  
                
                <input type="checkbox" id="checkbox"
                
                onclick="CheckBox(${developer.developer_id})"

                ${developer.assigned === "assigned" ? `disabled` : ""}
              >
  
                  <span class="title">${developer.fullname}</span>

                  

                  
                  
                 
                  <span class="completed">
                  
                  ${
                    developer.assigned === "not assigned"
                      ? "not assigned"
                      : "assigned"
                  }</span>

                  

                  
              </div>
  
  
          </li>
              
              
              
              `;
          });

          developerList.innerHTML = li;
        } else {
          noTasks.style.display = "flex";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {}
};

fetchDevelopers();

function CheckBox(index: string) {
  assignTasks.style.display = "flex";

  dev_id = index;
}