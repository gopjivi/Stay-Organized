//set login user name and id in querystring
function Setquerystring() {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get('name');
  const id = queryParams.get('id');
  document.getElementById("headername").innerText = "Welcome " + name;

  document.getElementById("canvasnewtaskid").href = "new-todo.html?name=" + name + "&id=" + id;
  document.getElementById("canvasviewtaskid").href = "user-todos.html?name=" + name + "&id=" + id;
  document.getElementById("canvasnewuserid").href = "new_user.html?name=" + name + "&id=" + id;
  document.getElementById("canvashomelinkid").href = "index.html?name=" + name + "&id=" + id;

  document.getElementById("newtaskid").href = "new-todo.html?name=" + name + "&id=" + id;
  document.getElementById("viewtaskid").href = "user-todos.html?name=" + name + "&id=" + id;
  document.getElementById("newuserid").href = "new_user.html?name=" + name + "&id=" + id;
  document.getElementById("homelinkid").href = "index.html?name=" + name + "&id=" + id;
}

//get task by task id
function Gettaskbyid(id, methodname) {
  const apiUrl = 'http://localhost:8083/api/todos/' + id;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      if (methodname == "view") {
        document.getElementById("modalcategory").innerText = data.category;
        document.getElementById("modaldescription").innerText = data.description;
        document.getElementById("modaldeadline").innerText = data.deadline;
        document.getElementById("modalpriority").innerText = data.priority;
        //document.getElementById("modalcompleted").innerText = data.completed;
        if (data.priority == "Low") {
          document.getElementById("modalpriority").classList.add("bg-success");

        }
        else if (data.priority == "Medium") {
          document.getElementById("modalpriority").classList.add("bg-warning");

        }
        else if (data.priority == "High") {
          document.getElementById("modalpriority").classList.add("bg-danger");
        }
        if (data.completed == true) {

          document.getElementById("modalcompleted").innerHTML = `<i class="bi bi-check-lg bi-green"></i>`;
        }
        else {
          document.getElementById("modalcompleted").innerHTML = `<i class="bi bi-x-lg bi-red">`;
        }
      }
      else {
        document.getElementById("todoid").value = data.id;
        document.getElementById("editmodalcategory").innerText = data.category;
        document.getElementById("editmodaldescription").innerText = data.description;
        document.getElementById("editmodaldeadline").innerText = data.deadline;
        document.getElementById("editmodalpriority").innerText = data.priority;
        //document.getElementById("modalcompleted").innerText = data.completed;
        if (data.priority == "Low") {
          document.getElementById("editmodalpriority").classList.add("bg-success");

        }
        else if (data.priority == "Medium") {
          document.getElementById("editmodalpriority").classList.add("bg-warning");

        }
        else if (data.priority == "High") {
          document.getElementById("editmodalpriority").classList.add("bg-danger");
        }
        if (data.completed == true) {

          document.getElementById("trueOption").checked = true;
        }
        else {
          document.getElementById("falseOption").checked = true;
        }

      }

    })
    .catch(error => {
      console.error('Error:', error);
    });

}

// Function Called on click of the Button for open model
function getInstanceAndShow(id) {
  const myModal = new bootstrap.Modal('#todoModal');
  Gettaskbyid(id, "view");
  // Show the Modal 
  myModal.show();
}

// Function Called on click of the Button for open model
function getInstanceAndEdit(id) {
  const myModal = new bootstrap.Modal('#todoeditModal');
  Gettaskbyid(id, "edit");
  // Show the Modal 
  myModal.show();
}

//Update particular task completed status
function Updatetodostatus() {
  let todoid = document.getElementById("todoid").value;
  let completedvlue = null;
  if (document.getElementById('trueOption').checked) {
    completedvlue = true;

  }
  else {
    completedvlue = false;
  }
  let bodyData = {
    completed: completedvlue
  }

  fetch("http://localhost:8083/api/todos/" + todoid, {
    method: "PUT",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-type":
        "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => {
      alert("Task Updated Successfully");
      onUsersSelectionChanged();

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//menu dropdown on mouseleave and click
function Hideitem() {
  document.getElementById("menuitemid").classList.remove("show");
}
function Viewitem() {
  document.getElementById("menuitemid").classList.add("show");
  // this is just grabbing a div, you can change it to select any element
//const element = document.querySelectorAll(".dropdown-toggle");

//selement.style.setProperty("transform", "rotate(180deg)");
//var styleElement = document.getElementById('custom-style');
// Add or modify styles using JavaScript
//styleElement.innerHTML = '.dropdown-toggle::after { transform: rotate(180deg) }';
}

