const login_email = document.querySelector(".login_email") as HTMLInputElement;

const login_password = document.querySelector(
  ".login_password"
) as HTMLInputElement;

const loginButton = document.querySelector(".btn_login") as HTMLButtonElement;

const login_failure = document.querySelector(
  ".login_failure"
) as HTMLDivElement;

const login_failure_incorrect = document.querySelector(
  ".login_failure-incorrect"
) as HTMLDivElement;

const create_account = document.querySelector(
  ".create-account"
) as HTMLSpanElement;





loginButton.addEventListener("click", () => {
  if (!login_email.value || !login_password.value) {
    login_failure.style.display = "flex";

    setTimeout(() => {
      login_failure.style.display = "none";
    }, 2500);
  } 


  try {


    fetch(
      "http://localhost:3000/api/auth/login/",
  
      {
        headers: {
          "Accept": "application/json",
  
          "Content-Type": "application/json",
        },
  
        method: "POST",
  
        body: JSON.stringify({
          
          email: login_email.value,
  
          password: login_password.value,
        }),
      }
    ).then(res  => res.json())
    
    
    .then((data) => {
  
      
      const user = data.data;
  
  
      localStorage.setItem('user',JSON.stringify(user))
  
      localStorage.setItem('token',JSON.stringify(data.token))
  
  
      if(user.role === "developer"){
  
          location.href = 'task.html'
  
      }else{
  
          location.href = 'admin.html'
      }
  
  
  
    }).catch((err) => {
  
  
      console.log(err);
      login_failure.style.display = "flex";

    setTimeout(() => {
      login_failure.style.display = "none";
    }, 2500);
  
  
    })
    
  } catch (error) {


  login_failure_incorrect.style.display = "flex"


  login_failure.style.display = "flex";

    setTimeout(() => {
      login_failure.style.display = "none";
    }, 2500);
    
    
  }

  
  
  
  
  
  ;




});

create_account.addEventListener("click", () => {
  location.href = "register.html";
});
