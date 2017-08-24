//es5 pour tout supporter....
const socket = io();

 socket.on('connect', function (){
    console.log('index logguer');
 });

 socket.on('disconnect',function (){
  console.log('connection perdue');
 });

//recoit du serveur l object 'newMessage' , en CB peut faire de quoi avec. 
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  //va dans la console va displayer   socket.emit('newMessage' et socket.broadcast.emit('newMessage' de server
})











/*

let  socket = io();
//es5 pour tout supporter....
 socket.on('connect', function (){
    console.log('index logguer');

//fake de post d une form
 // socket.emit('createEmail',  {
 //   to: 'benoit@axe-z.com',
 //   text: "Bonjour du web"
 // });

 // socket.emit('createMessage',  {
 //   from: 'Benoit',
 //   text: "ca va?"
 // });


 });

 socket.on('disconnect',function (){
  console.log('connection perdue');
 });


// socket.on('newEmail', function (email){
//  console.log(`nouveau email`,  email )
// });


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
})
*/
