const checkBox = document.getElementById("myCheck") as HTMLInputElement;
const taskItem = document.querySelector(".task-item") as HTMLElement;
const success = document.querySelector(".success") as HTMLDivElement;
const project = document.querySelector(".task-list") as HTMLUListElement;
const title = document.querySelector(".title") as HTMLSpanElement;
const logout = document.querySelector(".logout") as HTMLLIElement;
const none = document.querySelector(".none") as HTMLDivElement;
const user = JSON.parse(localStorage.getItem("user") as string);




const id = user.developer_id;




const fetchTask = () => {
    
  
    try {
      fetch(`http://localhost:3000/api/tasks/assigned/${id}`)
        .then((response) => response.json())
  
        .then((data) => {

            console.log(data)
            
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
            
            
            
            `

          
        })
        .catch((err) => {
          console.log('something went wrong');
        });
    } catch (error) {


        none.style.display = "flex"
    }
  };
  
  
  fetchTask();  


function CheckBox(id:number){

    try{

        fetch(
            `http://localhost:3000/api/tasks/${id}`,
      
            {
              headers: {
                Accept: "application/json",
      
                "Content-Type": "application/json",
              },
      
              method:"PUT",
      
              body: JSON.stringify({
                fullname: user.fullname,
                completed:'completed'
              }),
            }
          );


        success.style.display = 'flex';

        

        fetchTask();
    }catch(err){



    }

}




checkBox.addEventListener("click", () => {


    console.log('helooooo')
  
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
