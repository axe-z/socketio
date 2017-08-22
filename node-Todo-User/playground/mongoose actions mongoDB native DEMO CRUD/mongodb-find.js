//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');  //meme chose  qu en haut.


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');

// //TOUT
//   db.collection('Todos').find().toArray()  //va nous retourner un promise avec TOUT
//   .then(data => {
//     console.log(data) //js normal
//     console.log(JSON.stringify(data, undefined,2)); // du json
//   })
//   .catch(err => {
//     console.log(err)
//   });


  // //AVEC CRITERE DE FALSE A COMPLETED // retourne que ce qui est false
  //   db.collection('Todos').find({completed: false}).toArray()  //va nous retourner un promise avec TOUT
  //   .then(data => {
  //     console.log(data) //js normal
  //     console.log(JSON.stringify(data, undefined,2)); // du json
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   });


//AVEC CRITERE _id  //   faut passer par new ObjectID
  // db.collection('Todos').find({
  //   _id: new ObjectID('598c9c91850703795697458d')}).toArray()  //va nous retourner un promise avec _id
  // .then(data => {
  //   console.log(data) //js normal
  //   console.log(JSON.stringify(data[0].text, undefined,2)); // du json
  // })
  // .catch(err => {
  //   console.log(err)
  // });





    db.collection('Users').find().count()  //va nous retourner un promise avec TOUT
    .then(data => {
      console.log(data) //js normal
      console.log(JSON.stringify(data, undefined,2)); // du json
    })
    .catch(err => {
      console.log(err)
    });

  //db.close();
});
