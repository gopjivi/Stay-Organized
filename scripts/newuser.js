"use strict"

window.onload = init;

function init()
{

  Setquerystring();  //Function in common.js
}

let tempdata=null;
function validateFrom(event) {
    var form = document.querySelectorAll('.needs-validation')[0]
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }

  function Adduser(e) {
    validateFrom(e);
    e.preventDefault();
    // Create JSON object to include in the request body
    let bodyData = {
       id:"",
       name: document.getElementById("user").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }
    let  confirmpassword= document.getElementById("confirmpassword");

    if(confirmpassword.value != bodyData.password) 
    {  
        confirmpassword.setCustomValidity("Passwords do not match.");
        document.getElementById("passworderror").innerText="Passwords do not match.";
       // document.getElementById("confirmpassword").classList.add("is-invalid"); 
     return false;
    }
    else{
        confirmpassword.setCustomValidity("");

       Checkusername(bodyData.username).then(x => { 
        tempdata=x.available; 
        if(tempdata== true)
        {
          fetch("http://localhost:8083/api/users", {
              method: "POST",
              body: JSON.stringify(bodyData),
              headers: {
                "Content-type":
                  "application/json; charset=UTF-8"
              }
            })
              .then(response => response.json())
              .then(json => {
              
                 alert("new user created successfully");
                 const queryParams = new URLSearchParams(window.location.search);
         const name = queryParams.get('name');
         const id=queryParams.get('id');
         window.location.href="index.html?name="+name+"&id="+id; 
              
              })
              .catch(err => {
                  console.error('Error:', err);
              });
  
        }
        else{
          document.getElementById("username").setCustomValidity("User Name already exists");
          document.getElementById("usererror").innerText="User Name already exists";
          return false;
        }
    });;

     
      }
 
}

async function Checkusername(name) {
  try {
      const response = await fetch(`http://localhost:8083/api/username_available/${name}`, {
          method: 'GET',
          credentials: 'same-origin'
      });
      const exam = await response.json();
      
      return exam;
  } catch (error) {
      console.error(error);
  }
}

// function Checkusername(name)
// {
//     const apiUrl = 'http://localhost:8083/api/username_available/'+name;
//     fetch(apiUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     // .then(data => {
//     //     return data.available;
       
//     //     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
