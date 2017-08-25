//es5 pour tout supporter....
const socket = io();

 socket.on('connect', function (){
    console.log('index logguer');
 });

 socket.on('disconnect',function (){
  console.log('connection perdue');
 });

//recoit du serveur l object 'newMessage' , en CB peut faire de quoi avec.
socket.on("newMessage", function(message) {
	console.log("newMessage", message);
	//va dans la console va displayer   socket.emit('newMessage' et socket.broadcast.emit('newMessage' de server

	let li = document.createElement("li");
	li.innerHTML = `${message.from}: ${message.text}`;
	document.querySelector("#messages").appendChild(li);
});

socket.emit(
	"createMessage",{
		from: "beubby",
		text: "deuxieme emit"
	},
	function(data) {
	//	console.log("parfait bobby, recu! ", data);
	}
);




document.getElementById('message-form').addEventListener('submit', function (e){
    e.preventDefault();
    if (document.querySelector('[name=message]').value) {
      socket.emit('createMessage', {
        from: 'Utilisateur',
        text: document.querySelector('[name=message]').value
      }, function (data){
        document.querySelector('[name=message]').value  = '';
      });
    }
})


const locationButton = document.getElementById('location');
locationButton.addEventListener('click', function (){
  if(!navigator.geolocation){
    return alert('La geolocalisation n\'est pas supporté par votre systeme')
  }
   navigator.geolocation.getCurrentPosition(function (position){
     socket.emit('createLocationMessage', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     })
   }, function(){
    alert('pas possible de savoir votre position en ce moment si vous n\'accepter pas la posibilité');
   });
})
