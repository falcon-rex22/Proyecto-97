function addUser(){
    var nombreUsuario = document.getElementById("user_name").value;
    localStorage.setItem("Usuario", nombreUsuario);
    window.location="Kwitter_room.html";
}