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

interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: string;
  assigned: string;
  task_id: number;
}




let tasks: Project[] = [];

let developers: Developer[] = [];

let dev_id: string;

let dev_email:string;

let dev_name:string;




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

                  <span class="title">${task.completed === 'c' ? "completed" :'pending'}</span>

                  
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





const AssignTask = async (id: number, title:string) => {
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
          project:title,
          name:dev_name,
          email:dev_email,
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


  console.log(dev_id)

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

if(dev_id){


  fetch(
    `http://localhost:3000/api/tasks/unassign/${dev_id}`,

    {
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      method: "PUT",

      body: JSON.stringify({
        
        assigned: "not assigned",
        
      }),
    }
  );

  fetchTasks();



}
  
};

addButton.addEventListener("click", () => {
  if (addTitle.value && addDescription.value && addDate.value) {
    
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

  localStorage.clear()
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
  
                
                <input 
                
                onclick="Checkbox('${developer.developer_id}','${developer.email}','${developer.fullname}')"
                
                type="checkbox" id="checkbox"
                
               

                ${developer.assigned === "assigned" ? `disabled` : ""}
              >
  
                  <span class=${developer.assigned === "assigned" ? "title-line-through" : "title"}>${developer.fullname}</span>

    
                 
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





function Checkbox(id: string, email:string, name:string) {
  assignTasks.style.display = "flex";

  console.log('helloooo')

  dev_id = id;

  dev_email = email;

  dev_name = name;


 
}
