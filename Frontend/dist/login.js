"use strict";
const login_email = document.querySelector(".login_email");
const login_password = document.querySelector(".login_password");
const loginButton = document.querySelector('.btn_login');
const login_failure = document.querySelector('.login_failure');
const create_account = document.querySelector(".create-account");
loginButton.addEventListener("click", () => {
    if (!login_email.value || !login_password.value) {
        login_failure.style.display = "flex";
        setTimeout(() => {
            login_failure.style.display = "none";
        }, 2500);
    }
    else {
        location.href = "task.html";
        console.log("change direction");
    }
});
create_account.addEventListener("click", () => {
    location.href = "register.html";
});
