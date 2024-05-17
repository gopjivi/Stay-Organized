"use strict"

window.onload = init;

function init()
{
getusercount();
 gettaskcount();
 getcategorycount();
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
   
    let li="";
    let selectedValue =2;
    if(selectedValue !="")
    {
        document.getElementById("tasktable").style.display = "table";
    const apiUrl = 'http://localhost:8083/api/todos/byuser/'+selectedValue;
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      for(let i=0; i<data.length; i++) {
        li += `<tr>
        <td>${data[i].category}</td>
        <td>${data[i].description} </td>`
      //  <td>${data[i].priority}</td>`

        if(data[i].priority=="Low")
     {
        li+=`<td><span class="low">${data[i].priority}</span></td>`;
     }
     else if(data[i].priority=="Medium")
     {
        li+=`<td><span class="medium">${data[i].priority}</span></td>`;
     }
       else if(data[i].priority=="High")  
       {
        li+=`<td><span class="high">${data[i].priority}</span></td>`;
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
      
      })
  
    .catch(error => {
      console.error('Error:', error);
    });
}
else{
    alert("please select the user");
}
 }