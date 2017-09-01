//es5 pour tout supporter....
moment.locale('fr-ca');  //moment(obj.createdAt).format('H:mm a'); plus bas,ne pas oublier format,sinon ENGLISH
const socket = io();

/************************************ scrollToBotton ************************************/
function scrollToBotton(){
  //selecteur
  const messages = document.querySelector("#messages"); //fenetre des messages
  const nouveauMessage = $(messages).children('li:last-child') //pour trouver le dernier message.

  //hauteurs // j dois utiliser du jquery .
  const clientHeight = $(messages).prop('clientHeight');
  const scrollTop = $(messages).prop('scrollTop');
  const scrollHeight = $(messages).prop('scrollHeight');

  const nouveauMessageHeight = nouveauMessage.innerHeight();
  const AvantDernierMessageHeight =  nouveauMessage.prev().innerHeight(); // avant dernier message

  //ICI SI L UTILISATEUR REMONTE, LA FUNCTION NE SCROLLERA PAS , SI ON VEUT LIRE DES TRUC ECRIS AVANT , CA FUCKERA PAS CA.  SI L UTILISATEUR REVIENT EN BAS, L ACTIVATION VA REPRENDRE SEULEMENT SI LA POSITION EST ENTRE L AVANT DERNIER ET LE DERNIER ET PLUS

  if(clientHeight + scrollTop  + nouveauMessageHeight  +  AvantDernierMessageHeight  >= scrollHeight) {
  //$(messages).scrollTop(scrollHeight)
   //POUR ANIMER
    $(messages).animate({scrollTop: scrollHeight}, 600)
  }
}
/************************************ scrollToBotton ************************************/


 socket.on('connect', function (){
    //console.log('index logguer');
    const params = $.deparam(window.location.search); // va retourner l oject avec nom et chambre.
    //on va envoyer ca au serveur,
    socket.emit('join', params , function (err){     //fn d 'acknowledgement'
      if (err) {
        alert(err)
        window.location.href = '/';         //on les repitch au debut te toé
      } else {
        console.log('pas d\'erreur');
      }
    });
 });

 socket.on('disconnect',function (){
  console.log('connection perdue');
 });

//utilise getUserList qui retourne seulement un array des noms.
 socket.on('updateUserList', function (users) {
   console.log('liste des user', users)
   let ol = $("<ol>");
   users.forEach(function (user){
    ol.append($('<li>').text(user))
  });
  $('#users').html(ol)  //pas append sinon on ajoute toujours a ce qui y est..
 });

//recevoir du serveur SANS MUSTACHE: R
/************R***************  message princ de io.emit("newMessage" *******************************/
//recoit du serveur l object 'newMessage' , en CB peut faire de quoi avec.
// socket.on("newMessage", function(message) {
// 	console.log("Nouveau Message:", message.text);
// 	//va dans la console va displayer   socket.emit('newMessage' et socket.broadcast.emit('newMessage' de server
//
//    //notifyMe(message.text);
//
// 	let li = document.createElement("li");
//   let span = document.createElement("span") ;
//   li.className = 'text';
//   span.className = 'moment';
// 	li.innerHTML = `${message.from}: ${message.text}`;
//   span.innerHTML = ` ${message.createdAt}`;
// 	document.querySelector("#messages").appendChild(li).appendChild(span);
// });

///AVEC Mustache
socket.on("newMessage", function(message) {
 const template = document.getElementById('message-template').innerText
 let html = Mustache.render(template, {
   text: message.text,
   from: message.from,
   createdAt: message.createdAt
 })  //ce qui est dans le template {{}}.

 document.querySelector("#messages").insertAdjacentHTML('beforeend', html)  // Solution JS
 //marche avec Jquery // $("#messages").append(html)
 scrollToBotton();
});



/*************R***************** lien de location io.emit('newLocationMessage'****************************/
//ici au lieu d utiliser moment par le back-end, juste pour test, j vais utiliser la version f-e.
//truc qui revient de generateLocationMessage

//Sans Mustache:
/*socket.on("newLocationMessage", function(obj) {

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

}); /*socket.on("newLocationMessage"
*/

//Avec Mustache:
socket.on("newLocationMessage", function(obj) {

  const formatedTime = moment(obj.createdAt).format('H:mma');
  const template = document.getElementById('location-message-template').innerText;
  let html = Mustache.render(template, {
    from: obj.from,
    url: obj.url,
    createdAt: formatedTime
  })
  document.querySelector("#messages").insertAdjacentHTML('beforeend', html)  // Solution JS
  //marche avec Jquery // $("#messages").append(html)
  scrollToBotton();
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
