"use strict";
const checkBox = document.getElementById("myCheck");
const taskItem = document.querySelector(".task-item");
const success = document.querySelector(".success");
const project = document.querySelector(".task-list");
const title = document.querySelector(".title");
const logout = document.querySelector(".logout");
const none = document.querySelector(".none");
const user = JSON.parse(localStorage.getItem("user"));
const access_token = JSON.parse(localStorage.getItem("token"));
const id = user.developer_id;
const fetchTask = () => {
    try {
        fetch(`http://localhost:3000/api/tasks/assigned/${id}`, {})
            .then((response) => response.json())
            .then((data) => {
            console.log(data);
            project.innerHTML = `


            <li>
                <div class="task-item">

                    <input type="checkbox" 
                    
                    id="myCheck" 
                    
                    onclick="CheckBox(${data.id})"
                    
                    ${data.completed === "c" ? `disabled` : ""}
                    
                    
                    >
    
    
                    <span class="title">${data.title}</span>
    
    
                    <span class="status">${data.completed === "c" ? "completed" : "pending"}</span>
                </div>


            </li>
            
            
            
            `;
        })
            .catch((err) => {
            project.innerHTML = `<h2> You are not assigned project </h2>`;
        });
    }
    catch (error) {
        none.style.display = "flex";
    }
};
fetchTask();
function CheckBox(id) {
    try {
        fetch(`http://localhost:3000/api/tasks/${id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                fullname: user.fullname,
                completed: 'completed'
            }),
        });
        success.style.display = "flex";
        setTimeout(() => {
            success.style.display = "none";
        }, 2000);
        fetchTask();
    }
    catch (err) {
    }
}
checkBox.addEventListener("click", () => {
    console.log('helooooo');
    success.style.display = "flex";
    setTimeout(() => {
        success.style.display = "none";
    }, 2000);
    title.style.textDecoration = "line-through";
    checkBox.disabled = true;
});
logout.addEventListener("click", () => {
    localStorage.clear();
    location.href = "login.html";
});
