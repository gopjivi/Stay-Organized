"use strict"

window.onload = init;

function init()
{
getusercount();
 gettaskcount();
 getcategorycount();
 Setquerystring();  //Function in common.js
 Gettaskbyuser();
}

function getusercount() {
    // Specify the API endpoint for user data
    const apiUrl = 'http://localhost:8083/api/users';
    
    const userid = document.getElementById("userid");
   
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        userid.innerText=data.length;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function getcategorycount() {
    // Specify the API endpoint for user data
    const apiUrl = 'http://localhost:8083/api/categories';
    const categoryid = document.getElementById("categoryid");
   
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
       categoryid.innerText=data.length;
        })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function gettaskcount() {
    // Specify the API endpoint for user data
    const apiUrl = 'http://localhost:8083/api/todos';
    const taskid = document.getElementById("taskid");
   
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        taskid.innerText=data.length;
        })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  

  

  function Gettaskbyuser() 
 {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get('name');
  const id=queryParams.get('id');

    let li="";
    if(id !="")
    {
       
    const apiUrl = 'http://localhost:8083/api/todos/byuser/'+id;
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
        <td>${data[i].category}</td>
        <td>${data[i].description} </td>`
      //  <td>${data[i].priority}</td>`

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
      

     if(data.completed==true)
     {
        li+=`<td><i class="bi bi-check-lg bi-green"></i></td></tr>`;
     }
     else
     {
        li+=`<td><i class="bi bi-x-lg bi-red"></i></td></tr>`
     }
         
      }
      document.getElementById("displaytask").innerHTML = li;
    }
    else{
      document.getElementById("noresult").style.display = "block";
      document.getElementById("tasktable").style.display = "none";
    }
      
      })
    
  
    .catch(error => {
      console.error('Error:', error);
    });
}
else{
    alert("please select the user");
}
 }