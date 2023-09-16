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
const userNamefrom = document.getElementById("username").value;
const passwordfrom = String(document.getElementById("password").value);
const emailfrom = String(document.getElementById("email").value);
const passwordCheckfrom = String(document.getElementById("passwordCheck").value);
const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


if(!emailfrom.match(regex)){
  document.getElementById("errorEmail").innerHTML="*Ivalid email"
}
else if(passwordfrom.length<4 || passwordfrom.length>16){
  document.getElementById("error").innerHTML="*password length less then 8 or bigger then 16";
  document.getElementById("errorEmail").innerHTML="";
}
else if(passwordCheckfrom.length<4 || passwordCheckfrom.length>16){
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
    body: JSON.stringify({ 
      id: 0,
      userName: `${userNamefrom}`,
      email:`${emailfrom}`,
      password:`${passwordfrom}`,
      passwordCheck:`${passwordCheckfrom}`,
      isDeleted:false,
      isAdmin:false
    })
  })
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => console.log(data)) // Do something with the data
  .catch((error) => console.error(error)); // Handle errors
}
}

function setCookie(cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = "id" + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//login
function CheckUser(){
  const userNamefrom = document.getElementById("userNameLogin").value;
  const passwordfrom = String(document.getElementById("passwordLogin").value);
  if(passwordfrom.length<4 || passwordfrom.length>16){
    document.getElementById("errorPasswordLogin").innerHTML="*password length less then 8 or bigger then 16";
  }
  else{
  //post
  fetch("https://localhost:44369/api/Registration/Login", {
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
    let res = data.response;
    if(res==true){
      console.log(data)
      location.href="adminPanel.html";
    }
    else if(res==false){
      location.href = "userPanel.html";
      console.log(data.id);
      setCookie(data.id);
    }
    else{
      let x = data.msg;
      document.getElementById("errorLogin").innerHTML=x;
    }
  }) // Do something with the data
  .catch((error) => console.error(error)); // Handle errors
}
}



//User
function RedirectToDeleteUser(){
  location.href="deleteUser.html";
}

function RedirectToSignIn(){
  location.href="userPanel.html";
}

function DeleteUser(){
var id = document.getElementById("_id").value;
  fetch(`https://localhost:44369/api/Registration/DeleteUser${id}`,{
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
    document.getElementById("delete").innerHTML=x;
  })
  .catch((error) => console.error((error)));
}


function RedirectToUpdateUser(){
  location.href="updateUser.html";
}
function UpdateUser(){
  const id = getCookie("id");
  const userNamefrom = document.getElementById("userName").value;
  const passwordfrom = String(document.getElementById("password").value);
  const emailfrom = String(document.getElementById("email").value);
  const passwordCheckfrom = String(document.getElementById("passwordCheck").value);
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  
  
  if(!emailfrom.match(regex)){
    document.getElementById("errorEmail").innerHTML="*Ivalid email"
  }
  else if(passwordfrom.length<4 || passwordfrom.length>16){
    document.getElementById("error").innerHTML="*password length less then 8 or bigger then 16";
    document.getElementById("errorEmail").innerHTML="";
  }
  else if(passwordCheckfrom.length<4 || passwordCheckfrom.length>16){
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
    fetch(`https://localhost:44369/api/Registration/UpdateUser${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { 
          id: 0,
          userName: `${userNamefrom}`,
          email:`${emailfrom}`,
          password:`${passwordfrom}`,
          passwordCheck:`${passwordCheckfrom}`,
          isDeleted:false,
          isAdmin:false
        })
      })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log(data.msg);
        let x = data.msg;
        document.getElementById("update").innerHTML=x;
      }) // Do something with the data
      .catch((error) => console.error(error)); // Handle errors
    }
}


//Admin
function RedirectToGetData(){
  location.href="getdata.html";
}
//get 
function GetData(){
  //get
  fetch("https://localhost:44369/api/Registration/GetUser", {
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


function RedirectToDeleteUserForAdmin(){
  location.href = "deleteAdmin.html"
}

function DeleteUserForAdmin(){
  const id = document.getElementById("id").value;
  fetch(`https://localhost:44369/api/Registration/DeleteUser${id}`,{
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
    document.getElementById("delete").innerHTML=x;
  })
  .catch((error) => console.error((error)));
}

function RedirectToUpdateUserForAdmin(){
  location.href = "updateUserForAdmin.html"
}

function UpdateUserForAdmin(){
  const id = document.getElementsById("id").value;
  const userNamefrom = document.getElementById("userName").value;
  const passwordfrom = String(document.getElementById("password").value);
  const emailfrom = String(document.getElementById("email").value);
  const passwordCheckfrom = String(document.getElementById("passwordCheck").value);
  const isAdmin = document.getElementsById("isAdmin").value;
  const isDeleted = document.getElementsById("IsDeleted").value;
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  
  
  if(!emailfrom.match(regex)){
    document.getElementById("errorEmail").innerHTML="*Ivalid email"
  }
  else if(passwordfrom.length<4 || passwordfrom.length>16){
    document.getElementById("error").innerHTML="*password length less then 8 or bigger then 16";
    document.getElementById("errorEmail").innerHTML="";
  }
  else if(passwordCheckfrom.length<4 || passwordCheckfrom.length>16){
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
    fetch(`https://localhost:44369/api/Registration/UpdateUserAdmin${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { 
          id: 0,
          userName: `${userNamefrom}`,
          email:`${emailfrom}`,
          password:`${passwordfrom}`,
          passwordCheck:`${passwordCheckfrom}`,
          isDeleted:`${isAdmin}`,
          isAdmin:`${isDeleted}`
        })
      })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log(data.msg);
        let x = data.msg;
        document.getElementById("update").innerHTML=x;
      }) // Do something with the data
      .catch((error) => console.error(error)); // Handle errors
    }
}