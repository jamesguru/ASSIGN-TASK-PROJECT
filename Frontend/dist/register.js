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
const full_name = document.querySelector(".full_name");
const email = document.querySelector(".register_email");
const password = document.querySelector(".register_password");
const confirmed_password = document.querySelector(".confirm_password");
const registerButton = document.querySelector(".btn_register");
const register_failure = document.querySelector('.register_failure');
const have_account = document.querySelector(".have-account");
have_account.addEventListener("click", () => {
    location.href = "login.html";
});
const registerDeveloper = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(full_name.value);
    console.log(email.value);
    console.log(password.value);
    if (full_name.value && email.value && password.value) {
        fetch("http://localhost:3000/api/auth/register/", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                fullname: full_name.value,
                email: email.value,
                password: password.value,
            }),
        });
        full_name.value = "";
        email.value = "";
        password.value = "";
        confirmed_password.value = "";
    }
});
registerButton.addEventListener("click", () => {
    try {
        registerDeveloper();
    }
    catch (error) {
        console.log('something went wrong');
    }
});
