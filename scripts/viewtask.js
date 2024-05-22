"use strict"

window.onload=init;

function init()
{
    const userlist = document.getElementById("userlList");
    userlist.onchange = onUsersSelectionChanged;
   
    getusers();
    Setquerystring();  //Function in common.js

}

//get all users for dropdown
function getusers()
{
    // Specify the API endpoint for user data
    const apiUrl = 'http://localhost:8083/api/users';
    let li="";
    const userlist = document.getElementById("userlList");
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
        for(let i=0; i<data.length; i++) {
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

//users dropdown indexchanged
function onUsersSelectionChanged() 
 {
    // find the value of the option selected
    const userlist = document.getElementById("userlList");
    let li="";
    let selectedValue = userlist.value;
    if(selectedValue !="")
    {
       
    const apiUrl = 'http://localhost:8083/api/todos/byuser/'+selectedValue;
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
        document.getElementById("tasktable").style.display = "table";
        document.getElementById("noresult").style.display = "none";
      for(let i=0; i<data.length; i++) {
        li += `<tr>
       
        <td>${data[i].description} </td>
      <td>${data[i].deadline}</td>`
     // <td>${data[i].category}</td>
        if(data[i].priority=="Low")
     {
        li+=`<td><span class="badge bg-success">${data[i].priority}</span></td>`;
     }
     else if(data[i].priority=="Medium")
     {
        li+=`<td><span class="badge bg-warning">${data[i].priority}</span></td>`;
     }
       else if(data[i].priority=="High")  
       {
        li+=`<td><span class="badge bg-danger">${data[i].priority}</span></td>`;
       }
      
      

     if(data[i].completed==true)
     {
        li+=`<td><i class="bi bi-check-lg bi-green"></i></td>`;
     }
     else
     {
        li+=`<td><i class="bi bi-x-lg bi-red"></i></td>`
     }
     //li+=`<td><a href="details.html?cid=${data[i].id}">See details</a></td>`;
     li+=`<td><button type="button" class="btn btn-blue" onclick="getInstanceAndShow(${data[i].id})">
     <i class="bi bi-binoculars-fill"></i>
   </button></td>`;
   li+=`<td><button type="button" class="btn btn-blue" onclick="getInstanceAndEdit(${data[i].id})">
   <i class="bi bi-pen-fill"></i>
   </button></td></tr>`;
     
      }
      document.getElementById("displaytask").innerHTML = li;
    }
    else
    {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("tasktable").style.display = "none";
    }
      })
    

  
    .catch(error => {
      console.error('Error:', error);
    });
}
else{
    alert("Please Select the User");
}
 }

