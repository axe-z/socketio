//es5 pour tout supporter....
const socket = io();


 socket.on('connect', function (){
    console.log('index logguer');
 });

 socket.on('disconnect',function (){
  console.log('connection perdue');
 });

//recevoir du serveur: R
/************R***************  message princ de io.emit("newMessage" *******************************/
//recoit du serveur l object 'newMessage' , en CB peut faire de quoi avec.
socket.on("newMessage", function(message) {
	console.log("Nouveau Message:", message.text);
	//va dans la console va displayer   socket.emit('newMessage' et socket.broadcast.emit('newMessage' de server

  //notifyMe(message.text);

	let li = document.createElement("li");
	li.innerHTML = `${message.from}: ${message.text}`;
	document.querySelector("#messages").appendChild(li);
});


/*************R***************** lien de location io.emit('newLocationMessage'****************************/
//truc qui revient de generateLocationMessage
socket.on("newLocationMessage", function(obj) {
	console.log("Message de localisation:", obj.url);
	//va dans la console va displayer   socket.emit('newMessage' et socket.broadcast.emit('newMessage' de server

  //notifyMe(obj.from);

	let li = document.createElement("li");
  let lien = document.createElement("a");
	li.innerHTML = `${obj.from}:`;
  lien.href = `${obj.url}`;
  lien.target = "_blank"
  lien.innerHTML = ` Voir ma position`;
	document.querySelector("#messages").appendChild(li).appendChild(lien);

}); /*socket.on("newLocationMessage"*/




//envoyer au serveur: E
/***********E************************ form de message CREATEMESSAGE ************************************/

document.getElementById('message-form').addEventListener('submit', function (e){
    e.preventDefault();
    if (document.querySelector('[name=message]').value) {
      socket.emit('createMessage', {
        from: 'Utilisateur',
        text: document.querySelector('[name=message]').value
      }, function (cbServeur){                                     // le CB de Confirmation
        document.querySelector('[name=message]').value  = '';      //remise a zero du field.
        console.log('recu', cbServeur);
      });
    }
}) //message-form



/***********E************************ click location ************************************/

const locationButton = document.getElementById('send-location');
const attente =document.getElementById('patience');

locationButton.addEventListener("click", function() {
	attente.innerHTML = "Calcul en cours, un moment...";
	setTimeout(function() {
		attente.innerHTML = " ";
	}, 5000);
	if (!navigator.geolocation) {
		return alert("La geolocalisation n'est pas supporté par votre systeme");
	}
	navigator.geolocation.getCurrentPosition(
		function(position) {
			socket.emit("createLocationMessage", {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},
		function() {
			alert("pas possible de savoir votre position en ce moment si vous n'accepter pas la posibilité");
		});
});  //click















// socket.emit('createMessage',{
//   from: 'moi',
//   text: 'alllllo'
// }, function (){
//  console.log('recu lllala')
// });
