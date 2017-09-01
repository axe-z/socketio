const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');

const { generateMessage, generateLocationMessage /*, generateLocationPre*/ } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public/');
const app = express();
const server = http.createServer( app )  //est comme app.listen

const io = socketIO(server)

let users = new Users(); //pour pouvoir utiliser nos methodes.

app.use(express.static(publicPath)); //public, va sur index.html /on a aussi chat.html




/************************************ CONNECTION SOCKET ************************************/
io.on("connection", socket => {
	//VERS SERVER
	//console.log(`nouvel utilisateur connecté`); //au termial


	// CE QUI SELECTIONNE VERS OU VA LES CHOSES : , EMIT A TOUT
	// socket.emit("newMessage", generateMessage("admin", "Bienvenue au Chat")); //vers client
	// // socket.emit= une connetion io.emit. tous les connections.
	//
	//
	// // CE QUI SELECTIONNE VERS OU VA LES CHOSES : EMIT A TOUS LES AUTRES SAUF LUI MEME
	// socket.broadcast.emit("newMessage",
	// 	generateMessage("admin", "Nouvel utilisateur vient de s'ajouter")
	// );

  //on va les mettres dans Join, pour que seulement une fois loguer on voit le message.

 socket.on('join', (params, callback) => {
		//console.log(params) //{ nom: 'Ben', chambre: 'Verdons' }
 		if( !isRealString(params.nom) || !isRealString(params.chambre)) { //si pas bon
			return callback('Un nom d\'utilisateur et un groupe est requis'); //return pour sortir
		}

		//pour joindre different chambre et conv.////////////////////////////////////////
		socket.join(params.chambre);
		//pour quitter une Chambre
		//socket.leave('fan de Game of thrones')////////////////////////////////////////

		users.removeUser(socket.id)  //pour etre sur qu ils sont pas ailleurs. on deleter avant d ajouter
		users.addUser(socket.id, params.nom, params.chambre) //id donne par socket,nom,chambre

		io.to(params.chambre).emit('updateUserList', users.getUserList(params.chambre))
		//on va dire A TOUT le monde bienvenue
		socket.emit("newMessage", generateMessage("admin", "Bienvenue sur Versenger !"));

		//on va dire a ceux dans la chambre en question uniquement , qu un nouveau vient d arriver.
		socket.broadcast.to(params.chambre).emit("newMessage",
			generateMessage("admin", `${params.nom} vient d'arriver`)
		);

		callback(); //faut faire attention , le premier arg est err de l autre bord.
	});


/************************************ accepte createMessage ************************************/
//FN QUI INTERCEPT LES SOCKET.EMIT('CREATEMESSAGE' QUI VIENNENT DU CLIENT.
 socket.on("createMessage", (message, callback) => {
		//OPERATION SERVEUR QUAND LE CLIENT EMIT UN NEWMESAGE DANS CE CAS
		console.log(`createMessage: ${message.from}`, message.text); //envoi au terminal server.

		// pas un CB , on veut le retour, donc ()
		 io.emit("newMessage", generateMessage(message.from, message.text, message.createdAt));

		//SI ON VOULAIT QUE LE MESSAGE SOIT QU AUX AUTRES.
		//socket.broadcast.emit("newMessage", generateMessage(message.from, message.text, message.createdAt));

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
		//SI ON CHANGE DE PAGE... ou refresh//VERS SERVER
		//console.log("connection perdue");
		const user = users.removeUser(socket.id)  //retourne le user
		if(user){
			io.to(user.chambre).emit('updateUserList', users.getUserList(user.chambre)) //enleve de la liste
			io.to(user.chambre).emit('newMessage', generateMessage('Admin', `${user.nom} a quitté`))
		}
	});
}); //io.on fin




 ///////////////////////////////////////////////////////////////////////////////////////////////
 ///                        ///listen/////                                                  ////
 ///////////////////////////////////////////////////////////////////////////////////////////////


///connection Serveur
server.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
