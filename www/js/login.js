function localCallback()
{
document.getElementById("login").addEventListener("click", loginUser, false);
}

function loginUser(){
    var email = document.getElementById("email").value;
    createCookie('loginUserEmail',email);
    window.location = "home.html";
}