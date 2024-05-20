"use strict"

window.onload = init;

function init() {
  getusers();
  getcategory();
  Setquerystring();  //Function in common.js
}

function getusers() {
  // Specify the API endpoint for user data
  const apiUrl = 'http://localhost:8083/api/users';
  let li = "";
  const userlist = document.getElementById("userid");
  let theOption1 = new Option("Select a User", "");
  userlist.appendChild(theOption1);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        let theOption = new Option(data[i].name, data[i].id);

        // append the option as a child of (inside) the 
        // select element
        userlist.appendChild(theOption);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getcategory() {
  // Specify the API endpoint for user data
  const apiUrl = 'http://localhost:8083/api/categories';
  let li = "";
  const categorylist = document.getElementById("category");
  let theOption1 = new Option("Select a category", "");
  categorylist.appendChild(theOption1);
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        let theOption = new Option(data[i].name, data[i].name);

        // append the option as a child of (inside) the 
        // select element
        categorylist.appendChild(theOption);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
}

function validateFrom(event) {
  var form = document.querySelectorAll('.needs-validation')[0]
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
  form.classList.add('was-validated')
}

function addtask(e) {
  validateFrom(e);
  e.preventDefault();
  // Create JSON object to include in the request body
  let bodyData = {
    id: "",
    userid: document.getElementById("userid").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    deadline: document.getElementById("deadline").value,
    priority: document.getElementById("priority").value,

  }

  if (bodyData.userid != "" && bodyData.category != "" && bodyData.description != "" && bodyData.deadline != "" && bodyData.priority != "") {

    fetch("http://localhost:8083/api/todos", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-type":
          "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        // let message = document.getElementById("confirmationMessage");
        // message.innerHTML = "Task Created";
        // let btn = document.getElementById("taskbutton");
        // btn.disabled = true;
         alert("new task created successfully");
         const queryParams = new URLSearchParams(window.location.search);
         const name = queryParams.get('name');
         const id=queryParams.get('id');
         window.location.href="index.html?name="+name+"&id="+id; 
      })
      .catch(err => {
        // If the POST returns an error, display a message
        let confirmationMessage =
          document.getElementById("messageid");
        confirmationMessage.innerHTML = "Unexpected error";
      });
  }
}

