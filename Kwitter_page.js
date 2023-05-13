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

  var usuario = localStorage.getItem("Usuario");
  var sala = localStorage.getItem("Room_name");

  function send(){
    var msg = document.getElementById("mensaje").value;
    firebase.database().ref(sala).push({
        name:usuario,
        message:msg,
        like:0
    })

    document.getElementById("mensaje").value = "";
  }

  function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("El_bosque_del_mensaje_XD").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
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
                document.getElementById("El_bosque_del_mensaje_XD").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function likes_update_likes(){
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);


    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}

function logOut(){
    localStorage.removeItem("Usuario");
        localStorage.removeItem("Room_name");
        window.location="index.html";
}