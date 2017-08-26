const express = require('express');
//const bodyParser = require('body-parser');
//const _ = require('lodash');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage/*, generateLocationPre*/ } = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public/');

const app = express();
const server = http.createServer( app )  //est comme app.listen

const io = socketIO(server)


app.use(express.static(publicPath)); //public, index.html


//CONNECTION SOCKET
io.on("connection", socket => {
	//VERS SERVER
	console.log(`nouvel utilisateur connecté`); //au termial

	// CE QUI SELECTIONNE VERS OU VA LES CHOSES : , EMIT A TOUT
	socket.emit("newMessage", generateMessage("admin", "Bienvenue au Chat")); //vers client
	// socket.emit= une connetion io.emit. tous les connections.

	// CE QUI SELECTIONNE VERS OU VA LES CHOSES : EMIT A TOUS LES AUTRES SAUF LUI MEME
	socket.broadcast.emit("newMessage",
		generateMessage("admin", "Nouvel utilisateur vient de s'ajouter")
	);

	  //FN QUI INTERCEPT LES SOCKET.ON('NIMPORTEQUOI' QUI VIENNENT DU CLIENT.
 socket.on("createMessage", (message, callback) => {
		//OPERATION SERVEUR QUAND LE CLIENT EMIT UN NEWMESAGE DANS CE CAS
		console.log("createMessage:", message.from); //envoi au terminal server.

		 io.emit("newMessage", generateMessage(message.from, message.text)); // pas un CB , on veut le retour, donc ()

    //SI ON VOULAIT QUE LE MESSAGE SOIT QU AUX AUTRES.
  //socket.broadcast.emit("newMessage", generateMessage(message.from, message.text));

  callback('maintenant que c\'est recu, Ceci est du serveur va aller au client, comme arg, ca pourrait etre un obj de n importe quoi') //parfait, recu!
});

//recoit lat lng renvoie from, url, createdAt
socket.on('createLocationMessage', (coords) => {
 	io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
});

//test de direction pour par prefontaine
// socket.on('createLocationMessage', (coords) => {
//  	io.emit('newLocationMessage', generateLocationPre('admin', coords.latitude, coords.longitude));
// });


	socket.on("disconnect", () => {
		//SI ON CHANGE DE PAGE...//VERS SERVER
		console.log("connection perdue");
	});
}); //io.on fin













///connection Serveur
server.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});










/*
//connection Socket
io.on('connection', (socket) => { //vers server
  console.log(`nouvel utilisateur connecté`); //au termial

/// ce qui selectionne vers ou va les choses : , emit a tout
  socket.emit('newMessage', {  //vers client    // socket.emit= une connetion io.emit. tous les connections.
    from: "admin",
    text: "Bienvenue au Chat",
    createdAt: Date.now()
  });
  //devient
//    socket.emit('newMessage',generateMessage('admin', "Bienvenue au Chat"));

/// ce qui selectionne vers ou va les choses : emit a tous les autres sauf lui meme
  socket.broadcast.emit('newMessage', {   //vers client
    from: "admin",
    text: "Nouvel utilisateur vient de s'ajouter",
    createdAt: Date.now()
  });
  //devient
  //socket.broadcast.emit('newMessage', generateMessage('admin', "Nouvel utilisateur vient de s'ajouter"));

//FN qui intercept les socket.on('nimporteQuoi' qui viennent du client.
  socket.on('createMessage', (message) => {  //operation serveur quand le client emit un newMesage dans ce cas
   console.log('createMessage:', message.from);  //envoi au terminal server.

//renvois le contenu du emit a tout le monde , lui qui le fait inclut.
    io.emit('newMessage', {   //envoi vers tous les clients le data. from - text et createdAt
      from:  message.from,  //data entree dans le client,
      text:  message.text,  //data entree dans le client,
      createdAt: Date.now()   //moment ou le client envoie.
    });

//Devient
  //  io.emit('newMessage', generateMessage(message.from, message.text)); // pas un CB , on veut le retour, donc ()
  });





  socket.on('disconnect', () => {       //si on change de page...//vers server
    console.log('connection perdue');
  });

});//io.on fin
*/
