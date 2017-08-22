//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');  //meme chose  qu en haut.


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');

  //update est plus demandant cote code
  //598dd092fe01ae7db30f3f53
  ///findOneAndUpdate (filter(obj), update(obj), options(obj), callback)
  // update === updateOperator $set , $inc , $rename $unset
  db.collection('Todos').findOneAndUpdate(
/*filter*/  {_id: new ObjectID('598dd092fe01ae7db30f3f53')},
/*update*/  { $set : {completed: false} },   //dans un obj, dire la sorte d update, et mettre ce qu on veut .
/*option*/  {returnOriginal: false },  //par defaut ce qui est retourné est la fiche AVANT la modif, false = new
/*callback*/
  )
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  });
});

//retour === 
/*{ lastErrorObject: { updatedExisting: true, n: 1 },
  value:
   { _id: 598dd092fe01ae7db30f3f53,
     text: 'walk le chien',
     completed: false },
  ok: 1 }*/
