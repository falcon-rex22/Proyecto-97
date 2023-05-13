var firebaseConfig = {
  apiKey: "AIzaSyAD4sHp9yZYZp5MdQ1uDxT82G6a0SJrOxY",
  authDomain: "flashchat-bc928.firebaseapp.com",
  databaseURL: "https://flashchat-bc928-default-rtdb.firebaseio.com",
  projectId: "flashchat-bc928",
  storageBucket: "flashchat-bc928.appspot.com",
  messagingSenderId: "981046684994",
  appId: "1:981046684994:web:1996257f81e3e7a37cecdb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Nombre_usuario = localStorage.getItem("Usuario");
room = localStorage.getItem("Room_name");
console.log("prueba: "+Nombre_usuario);
document.getElementById("User").innerHTML = "Bienvenido " + Nombre_usuario;

function addRoom(){
    var room = document.getElementById("Nombre_sala").value;
    //Aquí estamos mandando a llamar nuestro firebase y le estamos diciendo con ".ref(/)" que vamos a crear una carpeta principal.
    //"update" es para actualizar los datos de la base de datos
    firebase.database().ref("/").child(room).update({
          purpose: "Añadiendo usuario"
    })

    localStorage.setItem("Room_name", room);
    window.location = "Kwitter_page.html";
  }

function getData() {
  firebase.database().ref("/"+room).on('value', function(snapshot) {
    document.getElementById("Nombre_sala").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
      childKey = childSnapshot.key;
      child_data = childSnapshot.val();
      if(childKey != "purpose"){
        firebase_message_id = childKey;
        message_data = child_data;
        //Inicia código
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";


        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;



      }
    //Termina código
    });});}
    getData();

    // function redirectToRoomName(){
    //     localStorage.setItem("Sala", nombre_sala);
    //     window.location = "Kwitter_page.html";
    // }

    function logOut(){
        localStorage.removeItem("Usuario");
        localStorage.removeItem("Room_name");
        window.location="index.html";
      }