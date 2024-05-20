function Setquerystring()
{
  const queryParams = new URLSearchParams(window.location.search);
const name = queryParams.get('name');
const id=queryParams.get('id');
document.getElementById("headername").innerText="Welcome "+name;

document.getElementById("canvasnewtaskid").href="new-todo.html?name="+name+"&id="+id; 
document.getElementById("canvasviewtaskid").href="user-todos.html?name="+name+"&id="+id; 
document.getElementById("canvasnewuserid").href="new_user.html?name="+name+"&id="+id; 
document.getElementById("canvashomelinkid").href="index.html?name="+name+"&id="+id; 

document.getElementById("newtaskid").href="new-todo.html?name="+name+"&id="+id; 
document.getElementById("viewtaskid").href="user-todos.html?name="+name+"&id="+id; 
document.getElementById("newuserid").href="new_user.html?name="+name+"&id="+id; 
document.getElementById("homelinkid").href="index.html?name="+name+"&id="+id; 
}
