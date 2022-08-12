

const checkBox = document.getElementById("myCheck") as HTMLInputElement;
const taskItem = document.querySelector(".task-item") as HTMLElement;
const success = document.querySelector(".success") as HTMLDivElement;

const title = document.querySelector(".title") as HTMLSpanElement;
const logout = document.querySelector(".logout") as HTMLLIElement;



checkBox.addEventListener("click",() => {
    if(checkBox.checked){

        console.log('checked on');



       

            success.style.display = "flex";







            setTimeout(()=>{


                success.style.display = "none";


            },2000)


            title.style.textDecoration ="line-through";

    
            checkBox.disabled =true;
       
    
    }else{

        success.style.display = "none";


     console.log(checkBox.id)  


    } 

})
console.log("Helooooo")

logout.addEventListener("click",() => {


    location.href="login.html"
})