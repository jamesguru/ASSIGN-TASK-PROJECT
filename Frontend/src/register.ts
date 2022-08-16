const full_name = document.querySelector(".full_name") as HTMLInputElement;
const email = document.querySelector(".register_email") as HTMLInputElement;
const password = document.querySelector(".register_password") as HTMLInputElement;
const confirmed_password = document.querySelector(".confirm_password") as HTMLInputElement;
const registerButton = document.querySelector(".btn_register") as HTMLButtonElement;
const register_failure = document.querySelector(".register_failure") as HTMLDivElement;
const register_sucess = document.querySelector(".register_success") as HTMLDivElement;
const have_account = document.querySelector(".have-account") as HTMLSpanElement;



have_account.addEventListener("click",() =>{

    location.href = "login.html";
});





const registerDeveloper = async () => {


  if(full_name.value && email.value && password.value ){
  
      fetch(
          "http://localhost:3000/api/auth/register/",
    
          {
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
          }
        );
  
  
  
        full_name.value = "";
  
        email.value = "";
  
        password.value = "";

        confirmed_password.value = "";


        register_sucess.style.display = "flex"


        setTimeout(() =>{

          register_sucess.style.display = "none";
        },2500)


   
  
  
  }else{

    register_failure.style.display = "flex";

    setTimeout(() =>{

      register_failure.style.display = "none";
    },2500)
  }
  
  }
  
  
  
  registerButton.addEventListener("click", () => {


    
  
  
      try{
  
          registerDeveloper()
  
      }catch(error){
  
          

          register_failure.style.display = "flex";

          setTimeout(() =>{

          register_failure.style.display = "none";
        },2500)
  
      }
  })