"use strict"


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
       
        user: document.getElementById("user").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }
    let  confirmpassword= document.getElementById("confirmpassword");
    if(confirmpassword.value != bodyData.password) 
    {  
        confirmpassword.setCustomValidity("Passwords do not match.");
       // document.getElementById("confirmpassword").classList.add("is-invalid"); 
     return false;
    }
    else{
        confirmpassword.setCustomValidity("");

       let isuserexcists= Checkusername(bodyData.username);

      if(isuserexcists== true)
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
               window.location.href="index.html";
            })
            .catch(err => {
                console.error('Error:', err);
            });

      }
      else{
        document.getElementById("username").setCustomValidity("User Name already exists");
        return false;
      }
      }
 
}

function Checkusername(name)
{
    const apiUrl = 'http://localhost:8083/api/username_available/'+name;
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        return data.available;
       
        })
    .catch(error => {
      console.error('Error:', error);
    });
}
