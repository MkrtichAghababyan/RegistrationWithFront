const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});



//sign up
function Registeration(){
var userNamefrom = document.getElementById("username").value;
var passwordfrom = String(document.getElementById("password").value);
var emailfrom = String(document.getElementById("email").value);
var passwordCheckfrom = String(document.getElementById("passwordCheck").value);
const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


if(!emailfrom.match(regex)){
  document.getElementById("errorEmail").innerHTML="*Ivalid email"
}
else if(passwordfrom.length<8 || passwordfrom.length>16){
  document.getElementById("error").innerHTML="*password length less then 8 or bigger then 16";
  document.getElementById("errorEmail").innerHTML="";
}
else if(passwordCheckfrom.length<8 || passwordCheckfrom.length>16){
  document.getElementById("errorCheck").innerHTML="*password length less then 8 or bigger then 16";  
  document.getElementById("error").innerHTML="";
}
else if(passwordCheckfrom!==passwordfrom){
  document.getElementById("errorCheck").innerHTML="*passwords not matches";
}
else{
  document.getElementById("error").innerHTML="";
  document.getElementById("errorCheck").innerHTML="";

  //post
  var post = fetch("https://localhost:44369/api/Registration/AddUser", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: 0, userName: `${userNamefrom}`,email:`${emailfrom}`, password:`${passwordfrom}`,passwordCheck:`${passwordCheckfrom}`})
  })
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => console.log(data)) // Do something with the data
  .catch((error) => console.error(error)); // Handle errors



}
}


// document.getElementById("loginbtn").addEventListener("click", function(event){
//   event.preventDefault()
// });


//sign in
function CheckUser(){
  var userNamefrom = document.getElementById("userNameLogin").value;
  var passwordfrom = String(document.getElementById("passwordLogin").value);

  if(passwordfrom.length<8 || passwordfrom.length>16){
    document.getElementById("errorPasswordLogin").innerHTML="*password length less then 8 or bigger then 16";
  }
  else{
  //post
  var loginCheck  = fetch("https://localhost:44369/api/Registration/Login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify({userName:`${userNamefrom}`,password:`${passwordfrom}`})
  })
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    document.getElementById("errorPasswordLogin").innerHTML="";
    console.log(data);
    if(data==true){
      console.log(data)
      location.href="index.html";
    }
    else{
      document.getElementById("errorLogin").innerHTML="erorr";
    }
  }) // Do something with the data
  .catch((error) => console.error(error)); // Handle errors
}
}

function RedirectToGetData(){
  location.href="getdata.html";
}
//get 
function GetData(){
  //get
  var get  = fetch("https://localhost:44369/api/Registration/GetUser", {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => console.log(data)) // Do something with the data
    .catch((error) => console.error(error)); // Handle errors

}

function RedirectToDeleteUser(){
  location.href="deleteUser.html";
}

function DeleteUser(){
var id = document.getElementById("_id").value;
  var deleteUser = fetch(`https://localhost:44369/api/Registration/DeleteUser${id}`,{
    method:"DELETE",
    mode:"cors",
    headers:{
      "Content-Type": "application/json"
    }
  })
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) =>{ 
    console.log(data)
    let x = data.msg;
    document.getElementById("delete").innerHTML=JSON.stringify(x);
  })
  .catch((error) => console.error((error)));
  console.log(deleteUser);
}


function RedirectToUpdateUser(){
  location.href="updateUser.html";
}

function UpdateUser(){
  var id = document.getElementById("_id").value;
  var userNamefrom = document.getElementById("userName").value;
  var passwordfrom = String(document.getElementById("password").value);
  var emailfrom = String(document.getElementById("email").value);
  var passwordCheckfrom = String(document.getElementById("passwordCheck").value);
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  
  
  if(!emailfrom.match(regex)){
    document.getElementById("errorEmail").innerHTML="*Ivalid email"
  }
  else if(passwordfrom.length<8 || passwordfrom.length>16){
    document.getElementById("error").innerHTML="*password length less then 8 or bigger then 16";
    document.getElementById("errorEmail").innerHTML="";
  }
  else if(passwordCheckfrom.length<8 || passwordCheckfrom.length>16){
    document.getElementById("errorCheck").innerHTML="*password length less then 8 or bigger then 16";  
    document.getElementById("error").innerHTML="";
  }
  else if(passwordCheckfrom!==passwordfrom){
    document.getElementById("errorCheck").innerHTML="*passwords not matches";
  }
  else{
    document.getElementById("error").innerHTML="";
    document.getElementById("errorCheck").innerHTML="";
  
    //put
    var put = fetch(`https://localhost:44369/api/Registration/UpdateUser${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: 0, userName: `${userNamefrom}`,email:`${emailfrom}`, password:`${passwordfrom}`,passwordCheck:`${passwordCheckfrom}`})
    })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data.msg);
      let x = data.msg;
      document.getElementById("update").innerHTML=JSON.stringify(x);
    }) // Do something with the data
    .catch((error) => console.error(error)); // Handle errors
  }
}