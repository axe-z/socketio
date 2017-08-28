const express = require('express');
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




/************************************ CONNECTION SOCKET ************************************/
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


/************************************ accepte createMessage ************************************/
//FN QUI INTERCEPT LES SOCKET.ON('NIMPORTEQUOI' QUI VIENNENT DU CLIENT.
 socket.on("createMessage", (message, callback) => {
		//OPERATION SERVEUR QUAND LE CLIENT EMIT UN NEWMESAGE DANS CE CAS
		console.log(`createMessage: ${message.from}`, message.text); //envoi au terminal server.

		// pas un CB , on veut le retour, donc ()
		 io.emit("newMessage", generateMessage(message.from, message.text));

		//SI ON VOULAIT QUE LE MESSAGE SOIT QU AUX AUTRES.
		//socket.broadcast.emit("newMessage", generateMessage(message.from, message.text));

  callback('- Serveur') //parfait, recu!

});  /*socket.on("createMessage"*/



/************************************ renvoie url ************************************/
	//recoit lat lng renvoie from, url, createdAt
	socket.on('createLocationMessage', (coords) => {
 		io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
	});


//test de direction pour par prefontaine
// socket.on('createLocationMessage', (coords) => {
//  	io.emit('newLocationMessage', generateLocationPre('admin', coords.latitude, coords.longitude));
// });

/************************************ deconnection sur sortie de page ************************************/
	socket.on("disconnect", () => {
		//SI ON CHANGE DE PAGE...//VERS SERVER
		console.log("connection perdue");
	});
}); //io.on fin




 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///listen/////                                                  ////
 ///////////////////////////////////////////////////////////////////////////////////////////////


///connection Serveur
server.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
