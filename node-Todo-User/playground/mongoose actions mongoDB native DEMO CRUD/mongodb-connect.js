//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');  //meme chose  qu en haut.
//const mongoose = require('mongoose');

// let obj = new ObjectID();
// console.log(obj)//598dc61663c1807e419795d7  //PAREIL
// console.log(obj)//598dc61663c1807e419795d7  //PAREIL
// console.log(new ObjectID())  //598dc65a04c83f7e5a6e98a5  DIF
// console.log(new ObjectID())  //598dc65a04c83f7e5a6e98a6  DIF

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');
  //Ajouter une collection - du data
  // db.collection('Todos').insertOne({
  //    test: 'un truc intelligent',
  //    completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('y a une erreur', err);  //va bloquer l execution avec le return
  //   }
  //   console.log(JSON.stringify(result.ops));
  // });


  // db.collection('Users').insertOne({
  //    name: 'AXE-Z',
  //    age: 2,
  //    location: 'Mtl'
  // }, (err, result) => {
  //   if(err){
  //     return console.log('y a une erreur', err);  //va bloquer l execution avec le return
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));  //ca donne un meilleur preview .
  //   console.log(result.ops[0]._id.getTimestamp()) //2017-08-10T23:56:44.000Z
  // });


  db.close();
});
