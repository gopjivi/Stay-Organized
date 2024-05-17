"use strict"

function validateFrom(event) {
    var form = document.querySelectorAll('.needs-validation')[0]
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }

function LoginUser(e)
{   
    validateFrom(e);
    e.preventDefault();
    
    const username=document.getElementById("username").value;
    //const password=document.getElementById("password").value;
    

    const apiUrl = 'http://localhost:8083/api/users/'+username;
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
       if(data.length>0)
       {
        alert("user login successfully");
       }
       else
       {
alert("please enter valid username");
       }
       
        })
    .catch(error => {
      console.error('Error:', error);
    });
}