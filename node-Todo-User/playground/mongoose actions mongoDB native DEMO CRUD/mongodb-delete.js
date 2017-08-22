//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');  //meme chose  qu en haut.


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');

    //deletemany   delete tout ce qui est dans le query
  //   db.collection('Todos').deleteMany({text: 'cour'});
  //  .then(result => {
  //    console.log(result)
  //  });

    //deleteOne   delete le premier trouve qui est dans le query
  //   db.collection('Todos').deleteOne({text: 'cour'});
  //  .then(result => {
  //    console.log(result)
  //  });


    //findOneAndDelete fait le boulot et retourne l object detruit. 
    db.collection('Todos').findOneAndDelete({completed: false})
   .then(result => {
     console.log(result)  //{ lastErrorObject: { n: 0 }, value: null, ok: 1 }
   });
  //  { lastErrorObject: { n: 1 },
  // value:
  //  { _id: 598f25003d88bf0864a87f66,
  //    text: 'caca2',
  //    completed: false },
  // ok: 1 }
  //db.close();
});
