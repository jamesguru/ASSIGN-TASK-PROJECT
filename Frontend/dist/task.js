"use strict";
const checkBox = document.getElementById("myCheck");
const taskItem = document.querySelector(".task-item");
const success = document.querySelector(".success");
const title = document.querySelector(".title");
const logout = document.querySelector(".logout");
checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
        console.log('checked on');
        success.style.display = "flex";
        setTimeout(() => {
            success.style.display = "none";
        }, 2000);
        title.style.textDecoration = "line-through";
        checkBox.disabled = true;
    }
    else {
        success.style.display = "none";
        console.log(checkBox.id);
    }
});
console.log("Helooooo");
logout.addEventListener("click", () => {
    location.href = "login.html";
});
