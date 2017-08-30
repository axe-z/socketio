//es5 pour tout supporter....
moment.locale('fr-ca');  //moment(obj.createdAt).format('H:mm a'); plus bas,ne pas oublier format,sinon ENGLISH
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
  let span = document.createElement("span") ;
  li.className = 'text';
  span.className = 'moment';
	li.innerHTML = `${message.from}: ${message.text}`;
  span.innerHTML = ` ${message.createdAt}`;
	document.querySelector("#messages").appendChild(li).appendChild(span);
});


/*************R***************** lien de location io.emit('newLocationMessage'****************************/
//ici au lieu d utiliser moment par le back-end, juste pour test, j vais utiliser la version f-e.
//truc qui revient de generateLocationMessage
socket.on("newLocationMessage", function(obj) {

  const formatedTime = moment(obj.createdAt).format('H:mma');
	console.log("Message de localisation:", obj.url);
	//va dans la console va displayer   socket.emit('newMessage' et socket.broadcast.emit('newMessage' de server

  //notifyMe(obj.from);

	let li = document.createElement("li");
  let lien = document.createElement("a");
	li.innerHTML = `${obj.from}:`;
  lien.href = `${obj.url} `;
  lien.target = "_blank"
  lien.innerHTML = ` Voir ma position  - ${formatedTime}`;
	document.querySelector("#messages").appendChild(li).appendChild(lien);

}); /*socket.on("newLocationMessage"*/




//envoyer au serveur: E
/***********E************************ form de message CREATEMESSAGE ************************************/

document.getElementById('message-form').addEventListener('submit', function (e){
  const textBox = document.querySelector('[name=message]');
    e.preventDefault();
    if (textBox.value) {
      socket.emit('createMessage', {
        from: 'Utilisateur',
        text: textBox.value
      }, function (cbServeur){    // le CB de Confirmation
        textBox.value  = '';      //remise a zero du field.
        console.log('recu', cbServeur);
      });
    }
}) //message-form



/***********E************************ click location ************************************/

const locationButton = document.getElementById('send-location');
const attente = document.getElementById('patience');

locationButton.addEventListener("click", function() {
	if (!navigator.geolocation) {
		return alert("La geolocalisation n'est pas supporté par votre systeme");
	}
  attente.innerHTML = "Calcul en cours, un moment...";
  locationButton.disabled = true;
  locationButton.innerHTML = 'Un instant SVP ...'

	navigator.geolocation.getCurrentPosition(function(position) {
      attente.innerHTML = "";
      locationButton.disabled = false;
      locationButton.innerHTML = 'Envoyer Position';
			socket.emit("createLocationMessage", {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		},
		function() {
      locationButton.disabled = false;
      locationButton.innerHTML = 'Envoyer Position';
			alert("impossible d'aficher votre position, si vous n'accepter pas la posibilité");
		});
});  //click















// socket.emit('createMessage',{
//   from: 'moi',
//   text: 'alllllo'
// }, function (){
//  console.log('recu lllala')
// });
