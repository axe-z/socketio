const express = require('express');
//const bodyParser = require('body-parser');
//const _ = require('lodash');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public/');

const app = express();
const server = http.createServer( app )  //est comme app.listen

const io = socketIO(server)


app.use(express.static(publicPath)); //public, index.html


//connection Socket
io.on('connection', (socket) => {

  console.log(`nouvel utilisateur connecté ${ socket }`); //au termial

//envoie au front end.
// socket.emit('newEmail', {
//   from: "info@axe-z.com",
//   test: "Comment ca va",
//   createdAt: Date.now()
// });

  // socket.emit('newMessage', {
  //   from: "Dan",
  //   test: "Comment ca va",
  //   createdAt: Date.now()
  // });

//va printer dans le terminal quand un emit du front end a cette signature.
  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from:  message.from,
      test:  message.text,
      createdAt:  message.createdAt
    });                      // socket.emit= une connetion io.emit. tous les connections.
  })





  socket.on('disconnect', () => {       //si on change de page...
    console.log('connection perdue');
  });

});













///connection Serveur
server.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
