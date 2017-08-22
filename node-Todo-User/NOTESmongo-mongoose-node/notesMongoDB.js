***************************************************************************************************
**********************************      MONGOD      **********************************************
***************************************************************************************************
***************************************************************************************************

connection sans mongoose :
1- partir mongod.
pas besoin de creer la db avant et sans schema ca n apparait pas dnas compass=> ca viendra.

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');

  db.close();
});


pour la voir apparaitre dans compass, il faut ajouter du data :

AVEC DB.COLLECTION('NOMDELACOLLECTION').INSERTONE(ARG1: LE DATA EN OBJ, ARG2 UN CB POUR ERR, ET VOIR LE RESULTAT. );


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');
  //Ajouter une collection - du data
  db.collection('Todos').insertOne({
     test: 'un truc intelligent',
     completed: false
  }, (err, result) => {
    if(err){
      return console.log('y a une erreur', err);  //va bloquer l execution avec le return
    }
    console.log(JSON.stringify(result.ops));
  });

  db.close();
});

donne  :

Connecté a mongoDB
[{"test":"un truc intelligent","completed":false,"_id":"598c9c91850703795697458d"}]






Connecté a mongoDB
[{"name":"AXE-Z","age":2,"location":{"lat":45,"lng":-73},"_id":"598ca9acc79d8579be8766a3"}]



RESULT.OPS[0]  :

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');
  db.collection('Users').insertOne({
     name: 'AXE-Z',
     age: 2,
     location: 'Mtl'
  }, (err, result) => {
    if(err){
      return console.log('y a une erreur', err);  //va bloquer l execution avec le return
    }
    console.log(JSON.stringify(result.ops, undefined, 2));  //ca donne un meilleur preview .
    console.log(result.ops[0]._id.getTimestamp()) //2017-08-10T23:56:44.000Z
  });
  db.close();
});


/*
[
  {
    "name": "AXE-Z",
    "age": 2,
    "location": "Mtl",
    "_id": "598cf2bcd67f5d7afcb8fe0b"
  }
]
*/



ObjectID()
si on veut le gerer soit meme , mais mongo le fait tout seul, donc fuck it
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');  //meme chose  qu en haut.
let obj = new ObjectID();
console.log(obj)//598dc61663c1807e419795d7  //PAREIL
console.log(obj)//598dc61663c1807e419795d7  //PAREIL
console.log(new ObjectID())  //598dc65a04c83f7e5a6e98a5  DIF
console.log(new ObjectID())  //598dc65a04c83f7e5a6e98a6  DIF



///////////////////////FIND////////////////////////////////////////TOARRAY() native



db.collection('Todos').find().
TOARRAY() methode qui retourne une promise


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');
//TOUT
  db.collection('Todos').find().toArray()  //va nous retourner un promise avec TOUT
  .then(data => {
    console.log(data) //js normal
    console.log(JSON.stringify(data, undefined,2)); // du json
  })
  .catch(err => {
    console.log(err)
  });

  //db.close();
});



 CRITERES

//avec critere de false a completed // retourne que ce qui est false
  db.collection('Todos').find({completed: false}).toArray()  //va nous retourner un promise avec compelted false
  .then(data => {
  ....




  //AVEC CRITERE _id  //   faut passer par new ObjectID
    db.collection('Todos').find({
      _id: new ObjectID('598c9c91850703795697458d')}).toArray()  //va nous retourner un promise avec _id
    .then(data => {

//

//////////////////find//////////////////////////////////////count native



db.collection('Todos').find().count()  //va nous retourner un promise avec TOUT
.then(data => {
  console.log(data) //js normal
  console.log(JSON.stringify(data, undefined,2)); // du json
})
.catch(err => {
  console.log(err)
});


2 et 2 va compter les




//////////////////delete//////////////////////////////////////native




const { MongoClient, ObjectID } = require('mongodb');  //meme chose  qu en haut.


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('y a une erreur');  //va bloquer l execution avec le return
  }
  console.log('Connecté a mongoDB');

    //deletemany   delete tout ce qui est dans le query
    db.collection('Todos').deleteMany({text: 'cour'});
   .then(result => {
     console.log(result)
   });

    //deleteOne   delete le premier trouve qui est dans le query
    db.collection('Todos').deleteOne({text: 'cour'});
   .then(result => {
     console.log(result)
   });


   //findOneAndDelete fait le boulot et retourne l object detruit.
   db.collection('Todos').findOneAndDelete({completed: false})
  .then(result => {
    console.log(result)  //{ lastErrorObject: { n: 0 }, value: null, ok: 1 }
  });

  retour:
 //  { lastErrorObject: { n: 1 },
 // value:
 //  { _id: 598f25003d88bf0864a87f66,
 //    text: 'caca2',
 //    completed: false },
 // ok: 1 }

  //db.close();
});

//////////////////UPDATE//////////////////////////////////////native
update est plus demandant cote code

 findOneAndUpdate (filter(obj), update(obj), options(obj), callback)
update === updateOperator $set , $inc , $rename $unset

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









***************************************************************************************************
**********************************      MONGOD      **********************************************
***************************************************************************************************
***************************************************************************************************
notes extra d un autre cour the complete dev, guide to mongoDB :
////IMPORTEZ MONGOOSE. CONNECTION PACKAGE QUI CONNECTE AVEC MONGODB////////////////////////////////////////////
//test_helper.js

//import moogoose et initialize.
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //ES6 faut dire quel type de promise.

//DONE FUNCTION
DONE = C EST POUR LE TESTING, PUISQUE LES TEST SONT ASYNC , IL FAUT DIRE A MOCHA D ATTENDRE, QUE LA REPONSE
VA P-E PRENDRE DU TEMPS. DONC AVEC DONE, ON LUI DIT DE RESTER, ET DONE() LUI DIT DE CONTINUER.


//DEPRECATION, CA FONCTIONNE ,MAIS FAUT CHANGER CA !!!
//va voir localement // pas besoin que users_test soit la d avance, mongoosse et mogodb vont la creer si pas la.
//pour s assurer que mongo connecte avant mocha: BEFORE.
before(done => {
  mongoose.connect("mongodb://localhost/users_test");
  mongoose.connection
    .once("open", () => {
      done();
    }) //once, ne fait qu une fois.
    .on("error", error => {
      console.warn("Avertissement", error);
    });
});


//open et error sont des event que mongoose reconnait. Et peu importe le temps de connection, ils seront ok.
//DEPRECATION, CA FONCTIONNE ,MAIS FAUT CHANGER CA !!! fonctionne bien avec mongose@4.6.6
////Importez mongoose. package de CONNECTION avec mongoDB////////////////////////////////////////////

///pour ne pas poluer la db
//done est un truc qui check si c est fait avant d ajouter le user joe. BEFOREEACH
beforeEach((done) => {
  //efface tous les users, prend un CB , pour dire que c est fini
  mongoose.connection.collections.users.drop(() => {
    //pret pour la suite
    done();
  });
});


////LA SCHEMA////////////////////////////////////////////////////////////////////////////////////////////
///user.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({   ///forme de la schema
  name: String
});

const User = mongoose.model('user', UserSchema)  //le model pour mongo.


module.exports = User; //exporte que le model.



////LA SCHEMA////////////////////////////////////////////////////////////////////////////////////////////

diference entre User et new User.  User ici est le nom du model, de la database .
quand on veut traiter , comme en lecture ( find , findOne ) avec TOUT la Db , c est User
Quand on veut ajouter un truc, comme une ficher, (joe = new User({name: 'Joe'})), on creer une instance




////Tester la DB avec MOCHA/////////////CREER UN USER///////////////////////////////////////////////////
//TEST MOCHA - polue la DB ..
const assert = require('assert');
const User = require('../src/user');   //notre model User. notre DB


//sans assert, u ntest est quasi inutile, assert lui verifie vraiment si une condition est remplie.
describe('Creer une fiche user', () => {
  it('Sauvegarde un user', (done) => {
   //assert(1+1 === 2); //Assertion ici, de deviner ce qui devrait arriver.
   const joe = new User({
     name: 'Joe'
   });  //creer de l instance, creer ce qui va dans le db
   joe.save()  //save est une des function d un model mongoose qui retourne un promise
   .then(() => {
     //ca fonction ? isNew, est une option de mongoose. si false ca veut dire que c est dans la DB
     assert(!joe.isNew);  //regarde si false. true veut dire que c est dans mocha, mais pas dans mongo.
     done();
   });
  });
});

//npm run test; ... passing 1 + 1 === 2 , malade !!
// "scripts": {
//   "test": "mocha" ///juste mocha, il va trouver le rep test et passer tous les it function.
// },

////Tester la DB avec MOCHA/////////////CREER UN USER///////////////////////////////////////////////////





 ////Tester la DB avec MOCHA/////////////CHERCHER SUR LA DB///////////////////////////////////////////////////

// _id:5960de91b36b1f1f056369a3    //OU TROUVER AVEC LE OBJECT_ID
// name:"Joe"                      //TROUVER AVEC LE NOM
// __v:0
//mongoose function
// notreModel.find()  //trouve TOUS LES match
// notreModel.findOne()  //trouve LE PREMIER match

//TEST MOCHA -
const assert = require('assert');
const User = require('../src/user');   //notre model User. notre DB


//LIRE LA DB.
describe("LIRE une fiche user", () => {
  //le but est de faire une fiche pour la tester, pour etre sur qu on a du data a lire.
  let joe;                       //pour avoir acces en bas.
  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()                    //save retourne un promisse ..
      .then(() => done());
  })
  it("trouver Joe", (done) => {
    User.find({name:'Joe'})           //comme save, retourne une promise
      .then((users) => {
          //console.log(users);       [ { _id: 5960f2a236497821e7605730, name: 'Joe', __v: 0 } ]
          assert(users[0]._id.toString() === joe._id.toString())  //Joe aura son id de mongoose, avant que mongo le save.
          done();
      });
  });
  it("trouver un ID particulier", (done) => {
    User.findOne({ _id : joe.id})           //mongo est capable dedealer avec ca. return promisse
      .then((user ) => {
          assert(user.name === 'Joe')
          done();
      });
  });
});

//METTRE.TOSTRING() POUR ANALYSER LE _ID.
//FAIT INTERESSANT, C EST MONGOOSE QUI DONNE LE _ID , ET IL SERA LE MEME UNE FOIS DANS MONGO.
//DONC AVANT MEME QUE LE SAVE SOIT FINI DNAS MONGO , ON PEUT TESTER LE _ID
 ASSERT(USERS[0]._ID === JOE._ID)  USERS[0]._ID == DANS MONGODB  || JOE._ID == MONGOOSE QUI L ATTRIBUT.
//LES DEUX ON LE MEME ID, PARCONTRE !!! MONGOOSE ET MONGO WRAP _ID DE MANIERE DIFFERENTE.
//_ID:OBJECTID // MAIS AVEC .TOSTRING() CA SE BALANCE.   assert(users[0]._id.toString() === joe._id.toString())

//RESULTAT dans le terminal
//  LIRE une fiche user
 [ { _id: 5960f2a236497821e7605730, name: 'Joe', __v: 0 } ]

  notreModel.find()  //trouve TOUS LES match -- retourne un array
  notreModel.findOne()  //trouve LE PREMIER match  --retourne qu truc , je sais pas quoi




 ////Tester la DB avec MOCHA/////////////CHERCHER SUR LA DB///////////////////////////////////////////////////


//nodemon avec mocha, pour avoir un watch et un output leger et clean :
"test": "nodemon --exec 'mocha -R min'",





 ////Tester la DB avec MOCHA/////////////DELETE DE FICHE LA DB////////////////////////////////////////////
 //TEST MOCHA -
 const assert = require('assert');
 const User = require('../src/user');   //notre model User. notre DB



 //LIRE LA DB.
 describe("DELETE une fiche user", () => {
   //le but est de faire une fiche pour la tester, pour etre sur qu on a du data a lire.
   let joe;                       //pour avoir acces en bas.
   beforeEach((done) => {
     joe = new User({name: 'Joe'}); //l instance se creer avec un id deja. et le name ..
     joe.save()                    //save retourne un promisse ..
       .then(() => done());
   });
   it('ici on remove avec instance de model (new)', (done) => {
     joe.remove()
     .then(() => {
       return User.findOne({ name: "Joe"})
     })
     .then((user) => {
       assert(user === null)
     })
     done()
   });

   it('ici on remove avec le model class directement', (done) => {
     //remover un packet ou un des fiches, suivant un critiere.
     User.remove({ name: "Joe"})
     .then(() => {
       return User.findOne({ name: "Joe"})
     })
     .then((user) => {
       assert(user === null);
     })
     done()
   });

   it('ici on findOneAndRemove avec le model class directement', (done) => {
     //remover un packet ou un des fiches, suivant un critiere.
     User.findOneAndRemove({ name: "Joe"})
     .then(() => {
       return User.findOne({ name: "Joe"})
     })
     .then((user) => {
       assert(user === null);
     })
     done();
   });

     it('ici on findByIdAndRemove avec le model class directement', (done) => {
       User.findByIdAndRemove( joe._id )
       .then(() => {
         return User.findOne({ name: "Joe"})
       })
       .then((user) => {
         assert(user === null);
       })
       done();
     });
 });
 ////Tester la DB avec MOCHA/////////////DELETE DE FICHE LA DB////////////////////////////////////////////





  ////Tester la DB avec MOCHA/////////////UPDATE DE FICHE LA DB////////////////////////////////////////////
  //TEST MOCHA - polue la DB ..
  const assert = require('assert');
  const User = require('../src/user');   //notre model User. notre DB

  //le nom revient toujours a joe au debut de chaque test. ***

  describe('Updater une fiche user', () => {
    let joe;                       //pour avoir acces en bas.

    beforeEach((done) => {
      joe = new User({name: 'Joe'}); //l instance se creer avec un id deja. et le name ..
      joe.save()                    //save retourne un promisse ..
        .then(() => done());
    });
  //FN POUR SAUVER LA REPETITION .  //FN POUR SAUVER LA REPETITION . haha
    function assertName(sauvegardeQuiRetourneUnePromisse, done){
     sauvegardeQuiRetourneUnePromisse
      .then(() => User.find({}))  ///va retourner tout la db en array!!! avec ca on pourra scanner.
          //maintenant qu'on peut scanner la db ... sinon on a pas acces a users, de la le 2 then.
      .then((users) => {
        assert(users.length === 1);     //y en aura qu un
        assert(users[0].name === 'AXE-Z');   //et maintenant il se nomme AXE-Z
        done();
      }).catch((err) => {
        console.log(err)
      });
     }
  //FN POUR SAUVER LA REPETITION .  //FN POUR SAUVER LA REPETITION .
     //AVEC l'instance  //AVEC l'instance  //AVEC l'instance  //AVEC l'instance

    it('Avec l\'instance le set et save', (done) => {
      joe.set({name: 'AXE-Z'});  // ou ('name', 'AXE-Z') //juste setter ne change pas la db, dans la console oui, mais pas la db. il faut saver.
      assertName(joe.save(), done()) //ou done pas de()
      //done();  /// ou sans 2 ieme argument a
    });

    it('Avec l\'instance et UPDATE (qui sauvegarde tout seul)', (done) => {
        assertName(joe.update({name: 'Ben'}), done()); //ou done pas de()
    });
     //AVEC l'instance  //AVEC l'instance  //AVEC l'instance  //AVEC l'instance

      //AVEC LE MODEL DIRECT*****//AVEC LE MODEL DIRECT*****//AVEC LE MODEL DIRECT*****
      it('Avec le Model directement on update', (done) => {
          assertName(User.update({name: 'Joe'}, {name: 'Bob'}), done());
      });

      it('Avec le Model directement update un seul user', (done) => {
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Axe-z'}), done());
      });
      //
      it('Avec le Model directement AVEC UN ID et update un seul user', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Axe-z'}), done());
      });
      //AVEC LE MODEL DIRECT*****//AVEC LE MODEL DIRECT*****//AVEC LE MODEL DIRECT*****
    });  ///describe end

    //MAIS Y A UN ENORME FUCK AVEC UPDATE, il faut le savoir en sale, ca va updater que le premier. 1er arg , selection, 2ieme arg transformation, il faut un troisieme arg si on veut modifier plusieurs elements....
    // donc options est le 3 ieme ... l option se nomme multi : true ou false ,

  //COMMENT FAIRE

  //set et save, sur l instance. est cool, permet de tout faire les modif, sur plusieurs chose, et seulement ensuite sauvegarder. Ce qui est moins demandant, et plus safe.

  function peUpdateName(userInstance){
      ... MONGOOSE FAIT LE CHANGEMENT ET GARDE EN MEMOIRE
  }

  function peUpdateEmail(userInstance){
      ... MONGOOSE FAIT LE CHANGEMENT ET GARDE EN MEMOIRE
  }

  peUpdateName(userInstance);
  peUpdateEmail(userInstance);
  //donc on fait tout et ensuite , save.
  userInstance.save();




    ///////////////////////// MONGO UPDATE OPERATOR///////////////////////////////////////////
    ///////////////////////////***** MONGO UPDATE OPERATOR == *****
 ///ce que c'est :
      on peut le voir comme des snippets pour raccourcir considerablement certaines actions qui sont commune .
      De faire des manipulations rapide, directement sans avoir a ramner le data et faire du code et renvoyer.

    //https://docs.mongodb.com/manual/reference/operator/update/
    //Update Operators

    //Fields
    //fantastique pour modifier PLUSIEURS item a la fois, pour un seul pas besoin de ca. un seul se fiat d une ligne d ordinaire avec update : assertName(User.update({name: 'Joe'}, {name: 'Bob'}), done());.
    Name	Description
    $inc	Increments the value of the field by the specified amount.
    $mul	Multiplies the value of the field by the specified amount.
    $rename	Renames a field.
    $setOnInsert	Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
    $set	Sets the value of a field in a document.
    $unset	Removes the specified field from a document.
    $min	Only updates the field if the specified value is greater than the existing field value.
    $max	Only updates the field if the specified value is less than the existing field value.
    $currentDate	Sets the value of a field to current date, either as a Date or a Timestamp.


    //Array
    Name	Description
    $	Acts as a placeholder to update the first element that matches the query condition in an update.
    $addToSet	Adds elements to an array only if they do not already exist in the set.
    $pop	Removes the first or last item of an array.
    $pullAll	Removes all matching values from an array.
    $pull	Removes all array elements that match a specified query.
    $pushAll	Deprecated. Adds several items to an array.
    $push	Adds an item to an array.


    //Modifier

    Name	Description
    $each	Modifies the $push and $addToSet operators to append multiple items pour array updates.
    $slice	Modifies the $push operator to limit the size of updated arrays.
    $sort	Modifies the $push operator to reorder documents stored in an array.
    $position	Modifies the $push operator to specify the position in the array to add elements.
//
  //https://docs.mongodb.com/manual/reference/operator/update/

    ///////////////////////// MONGO UPDATE OPERATOR///////////////////////////////////////////

///////////////////////// MONGO QUERY OPERATOR///////////////////////////////////////////
  Comparison
  //https://docs.mongodb.com/manual/reference/operator/query/
  For comparison of different BSON type values, see the specified BSON comparison order.

  Name	Description
  $eq	 Matches values that are equal to a specified value.
  $gt	Matches values that are greater than a specified value.
  $gte	Matches values that are greater than or equal to a specified value.
  $lt	Matches values that are less than a specified value.
  $lte	Matches values that are less than or equal to a specified value.
  $ne	Matches all values that are not equal to a specified value.
  $in	Matches any of the values specified in an array.
  $nin	Matches none of the values specified in an array.

  Logical

Name	Description
$or	Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
$and	Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
$not	Inverts the effect of a query expression and returns documents that do not match the query expression.
$nor	Joins query clauses with a logical NOR returns all documents that fail to match both clauses.


Element

Name	Description
$exists	Matches documents that have the specified field.
$type	Selects documents if a field is of the specified type.



Evaluation

Name	Description
$mod	Performs a modulo operation on the value of a field and selects documents with a specified result.
$regex	Selects documents where values match a specified regular expression.
$text	Performs text search.
$where	Matches documents that satisfy a JavaScript expression.



Name	Description
$geoWithin	Selects geometries within a bounding GeoJSON geometry. The 2dsphere and 2d indexes support $geoWithin.
$geoIntersects	Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.
$near	Returns geospatial objects in proximity to a point. Requires a geospatial index. The 2dsphere and 2d indexes support $near.
$nearSphere	Returns geospatial objects in proximity to a point on a sphere. Requires a geospatial index. The 2dsphere and 2d indexes support $nearSphere.


Array

Name	Description
$all	Matches arrays that contain all elements specified in the query.
$elemMatch	Selects documents if element in the array field matches all the specified $elemMatch conditions.
$size	Selects documents if the array field is a specified size.



Bitwise

Name	Description
$bitsAllSet	Matches numeric or binary values in which a set of bit positions all have a value of 1.
$bitsAnySet	Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
$bitsAllClear	Matches numeric or binary values in which a set of bit positions all have a value of 0.
$bitsAnyClear	Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.


Comments

Name	Description
$comment	Adds a comment to a query predicate.


///////////////////////// MONGO QUERY OPERATOR///////////////////////////////////////////
  //////////////////Projection Operators  //////////////////

Name	Description
$	Projects the first element in an array that matches the query condition.
$elemMatch	Projects the first element in an array that matches the specified $elemMatch condition.
$meta	Projects the document’s score assigned during $text operation.
$slice	Limits the number of elements projected from an array. Supports skip and limit slices.




    ///////////////////////// MONGOOSE ///////////////////////////////////////////
//CE qu on a fait pour l instant, n utilisait pas la force de mongoose et on aurait presque pu le faire sans=>
mais mongoose est plus puissant que ca , et donne entre autre acces a de la validation .


///DANS LE MODEL
const UserSchema = new Schema({   ///forme de la schema
  name: {
    type: String,
  //  trim: true,
    validate: {
      validator: (name) =>  name.length > 2,
      message: 'Doit avoir plus de 2 caracteres'
    },
    required: [true, 'Name is required']  //fait jsute regarder si y a quelque chose..
  },
  postCount: Number
});




///dnas le test de mocha :
const assert = require('assert');
const User = require('../src/user');   //notre model User. notre DB

//validateSync: fn de mongoose, est comme validate, mais Synchronious.

describe('VALIDER une fiche user', () => {
  //test directement avec mongoose
  it('Il doit y avoir un User Name', () => {
    const user = new User({name: undefined})  //pour tester clairement.
    const validationResult = user.validateSync();   //validate est async , validateSync est sync
  //  console.log(validationResult) //pour voir l erreure
    const { message } = validationResult.errors.name;  // le message de mongooe sera la. deconstruction
    assert(message === 'Name is required');
  });

//le message sera lui dans le model, lui de validator dans user.js:
// validate: {
//   validator: (name) =>  name.length > 2,
//   message: 'Doit avoir plus de 2 caracteres'
// },

///test avec le model.
  it('Plus de 3 caracteres dans le nom', () => {
    const user = new User({name: 'Al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Doit avoir plus de 2 caracteres');
  });

});


  /////////////////////////ajouter un schema subdocument///////////////////////////////////////////
  //dans post.js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const PostSchema = new Schema({
    titre: String
  });
module.exports = PostSchema; //exporte cette sub schema.



  //dans user.js
  const mongoose = require('mongoose');
  const PostSchema = require('./post');  ///nouvel schema
  const Schema = mongoose.Schema;


  //faire le plus de menage possible a la base
  const UserSchema = new Schema({   ///forme de la schema
    name: {
      type: String,
    //  trim: true,
      validate: {
        validator: (name) =>  name.length > 2,
        message: 'Doit avoir plus de 2 caracteres'
      },
      required: [true, 'Name is required']  //fait jsute regarder si y a quelque chose..
    },
    postCount: Number,
    posts: [ PostSchema ]   ///va faire la magie !
  });

  //on appelle ca sub-document, une schema qui s' ajoute a une autre dans le MEME MODEL.
  //lui decide de le faire dnas un autre fichier et de l importer ici. donc post.js
  // const PostSchema = new Schema({
  // title: String
  // });



  const User = mongoose.model('user', UserSchema)  //le model pour mongo la dessus son les methode.
  //console.log(User)





  /////////////////////////Vitual fields///////////////////////////////////////////

  // on veut ici que le nombre de posts soit representé dasn postCount et que ce chiffre se fasse seul.:

  //donc on sert postCount de la schema, et l ajoute ici:


  UserSchema.virtual('postCount').get(function (){
   return this.posts.length;  //donne la qte de posts.
  });

  //Champ virtuel ! la valeur de postCount sera le lenght de titre qu on aura.
  //fonctionne avec es6 getter et setter. joe.postCount va devenir une genre de function qui va aller chercher l info sur le fly. doit utiliser function pas de arrow dans le getter. on a besoin du this, le this devient l isntance qui appele postcount. donc joe.postCount , this === joe.


    /////////////////////////Vitual fields///////////////////////////////////////////

/////////////////////////////////////////joindre trois models ///////////////////////////////////


const UserSchema = new Schema({   ///forme de la schema
  name: {
    type: String,
    validate: {
      validator: (name) =>  name.length > 2,
      message: 'Doit avoir plus de 2 caracteres'
    },
    required: [true, 'Name is required']  //fait jsute regarder si y a quelque chose..
  },
  posts: [ PostSchema ],   ///va faire la magie pour un subdocument!
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'       //en lien avec le model blogPost
  }]
});

const BlogPostSchema = new Schema({
  titre: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'  //en lien avec le model comment
  }]
});

const CommentSchema = new Schema({   ///forme de la schema
 content: String,
 user: {
   type: Schema.Types.ObjectId,
   ref: 'user'          //en lien avec le model user
 }
});



en test maintenant apres les avoir importé.

describe('Assocations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ titre: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);  ///ARR
    blogPost.comments.push(comment);   ///ARR
    comment.user = joe;    ///OBJ

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

/* IMPORTANT
!!! ameliorer nos query avec un modifier. Avec POPULATE , User.findOne({ name: 'Joe' }) .populate('blogPosts')
veut dire : load le user joe, et retourne le user avec tous les blogposts qui lui sont associer.
*/
  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')        //IMPORTANT
      .then((user) => {
        assert(user.blogPosts[0].titre === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].titre === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');

        done();
      });
  });
});

                      DONC :

populate : peut prendre un obj comme configuration
path : dans ce user, on veut aussi cette info.
 //console.log(user.blogPosts[0].comments[0].user) on pourrait faire une roue infinie :
 //user.blogPosts[0].comments[0].user.blogPosts[0].comments[0].user.blogPosts[0].comments[0].user ...

User.findOne({ name: 'Joe'  //va chercher le user
  .populate({
    path: 'blogPosts',     //va chercher les blogPosts de ce user
    populate: {           ///deuxieme etapes de creusage
      path: 'comments',     //va dans les blogPosts de ce user chercher les comments
      model: 'comment',     //il faut dire dans quel model il doit chercher ca.
      populate: {
        path: 'user',      //va dans les blogPosts de ce user chercher les comments et de qui il sont
        model: 'user'       //il faut aussi ici dire dans quel model il doit chercher ca.
      }
    }
  })
  .then(user => {
       console.log(user.blogPosts[0].comments[0]/*.user.blogPosts[0]*/)
    assert(user.name === "Joe");
    assert(user.blogPosts[0].titre === "JS est cool");
    assert(user.blogPosts[0].comments[0].content === "Congrats on great post");
    assert(user.blogPosts[0].comments[0].user.name === "Joe");  ///tout un tour...

    done();
  });



                                          MIDDLEWARE
//////////////////////RElation si le user est detruit, comment effacer le reste des trucs associees////////////

//comment deleter les trucs associer avec le middleware.
IL Y A 2 TYPE DE MIDDLEWARE, CEUX PRE EVENT ET CEUX POST EVENT..

DISONS SAVE() EST UN EVENT . DONC ON POURRAIT ROULER deux MIDDLEWARES AVANT LE SAVE ET UN APRES .
ou REMOVE() dans le cas qui nous interesse

///middleware
UserSchema.pre('remove', function (){
  //pour avoir au this,,,
});

//////////////////////RElation si le user est detruit, middleware suite ////////////
// le probleme est de ne pas avoir a importer dans User.js les deux autre page et vice versa, enfaisant un loop d improtation, si jamais on avait des pre ou post pour chaque model.
// y a moyen d acceder aux modelk sans importation, une fois les model linker a mongoose, il sont disponnible dans la collection.


///middleware et query OPERATOR // fn a besoin de next pour passer la main.
UserSchema.pre('remove', function (next){
 const BlogPost = mongoose.model('BlogPost');
 // $in regarde dans this.blogPosts tous ceux qui match avec le _id en question.
 BlogPost.remove({_id: { $in: this.blogPosts}}) //retourne un promise.
 .then( () => next());   // ca continue..

});


///tester ca
describe('Middleware', () => {
  let joe, blogPost;
///mettre du contenu dans la DB.
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ titre: 'JS est cool', content: 'Yep it really is' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

//count retourne le nombre de blogPosts avec le model.
  it('users qu on delete va remover les blogPosts en lien avec', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((truc) => {
        assert(truc === 0);
        done();
      }).catch(e => {
        console.log(e)
      })
  });
});



/////////////////SCENARIO OU ON A 1000 RESULTATS, MAIS VEUT EN MONTRER 6 A LA FOIS AVEC UNE NEXT //////////////

//avec SKIP - LIMIT et SORT({ champs a indexer: 1 ou -1}) ascendant ou descandant.
de retour dans read.js

//on va rajouter des users ...
let joe, ben , bob, peter;                       //pour avoir acces en bas.
beforeEach((done) => {
  joe = new User({name: 'Joe'});
  ben = new User({name: 'Ben'});
  bob = new User({name: 'Bob'});
  peter = new User({name: 'Peter'});
  Promise.all([joe.save(), ben.save(), bob.save(), peter.save()])      //save retourne un promisse ..
    .then(() => done());
});


///petit fuck Promise.all([joe.save(), ben.save(), bob.save(), peter.save()]) ne garantie pas ce qui sera fait en premier. donc l ordre peut varier.
it('peut skiper et limiter le resultat retourné par la DB', (done) => {
  User.find({})           ///pas de filtres donc tous.
    .sort({name: 1})        // donc ici sort par name, 1 === asc -1 === descending.
    .skip(1)                //skip le premier du save
    .limit(2)             //en retourne que 2

  .then(users => {
      assert(users.length  === 2)
      // par defaut (sans sort) on peut pas vraiment savoir si Ben sera vraiment sauvegarder dans l ordre.
      assert(users[0].name === 'Ben')
      done();
  }).catch(e => {
  //  console.log(e);
  })

});



///////////////////////////FIN DES TESTs DEBUT DE L APP ELECTRON ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////DEBUT de l app ARTIST////////////////////////////////////////  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
=== album.js ===

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({   ///forme de la schema
  title: String,
  date: Date,                 //y a un type juste pour les dates.
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number
});

module.exports = AlbumSchema;



===  artist.js ===
const mongoose = require('mongoose');
const AlbumSchema = require('./album');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [ AlbumSchema ]
});

module.exports = mongoose.model('Artist', ArtistSchema);  //le model pour mongo est Artist donc.
//ou
//const Artist = mongoose.model('artist', ArtistSchema);
//module.exports = Artist ; //exporte que le model.


 ===  findArtist.js ===    Y A TOUJOURS MOYEN DE TOUT FAIRE EN UNE LIGNE , DU MOINS 90%, le crud
const Artist = require('../models/artist');


//y a find qui retourne tout, findOne qui retourne un, et un autre en retourne un : findById


module.exports = (_id) => {
   //retrouver un seul artist par _id.
  // return Artist.findOne({ _id: _id});
    return Artist.findById(_id);
};


 ===  DeleteArtist.js ===  Y A TOUJOURS MOYEN DE TOUT FAIRE EN UNE LIGNE , DU MOINS 90% , le crud

 const Artist = require('../models/artist');
 module.exports = (_id) => {
   //1-
   //const artist = Artist.findById(_id)
   //  .then(artist => {
   //    return artist.remove();
   //  });
   //2-
   //return Artist.remove({_id: _id});
   //3-
   return Artist.remove({_id }); //es6
 };



 ===  EditArtist.js ===  Y A TOUJOURS MOYEN DE TOUT FAIRE EN UNE LIGNE , DU MOINS 90% , le crud

 module.exports = (_id, artistProps) => {
   //console.log(_id, artistProps)
   //59680e33da637e3683cbfe1c et {name: "Mossie Howe", age: 44, yearsActive: "2", genre: "Power Electronics"}
   // 1-
   // return  Artist.update( {_id},  artistProps );
   // 2-
   return Artist.findByIdAndUpdate( _id,  artistProps );
 };




//////////////////////////Search et query plus complexe ///////////////////////
* Searches through the Artist collection
* @param {object} criteria An object with a name, age, and yearsActive
* @param {string} sortProperty The property to sort the results by name age album released.
* @param {integer} offset How many records to skip in the result set
* @param {integer} limit How many records to return in the result set
* @return {promise} A promise that resolves with the artists, count, offset, and limit
*/
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
//const sortOrder = {}; es5, comment pouvoir faire dire : sortOrder.(sortProperty == name, age ... )=1
//sortOrder[sortProperty] = 1;  // c est laite.

// let arr = ['ben', 'bob', 'serge' ];
// console.log({[arr]: 1}) //{ben,bob,serge: 1}, c est ok pour le sort. qui commande , key et 1 ou -1

 //console.log(criteria);


 const query = Artist.find(buildQuery(criteria))
   .sort({[sortProperty]: 1})   ///sortProperty est un array,
   .skip(offset)
   .limit(limit);


   return Promise.all([query, Artist.count()])  //deux promise, count( c est comme un compteur == length)

   .then(res => {
     return {
       all: res[0],
       count: res[1],
       offset,
       limit
     };
   });


};

const buildQuery = (criteria) => {
 //le fuck upp ici , c est que criteria retourne seulement name '' par default, pour voir Age et Years active, il faut bouger les slider et faire sumit
//console.log(criteria);    //Object {name: ""}

const query = {};
if (criteria.age) {
 query.age = {
   $gte: criteria.age.min,
   $lte: criteria.age.max
 };
}

if (criteria.yearsActive) {
 query.yearsActive = {
   $gte: criteria.yearsActive.min,
   $lte: criteria.yearsActive.max
 };
 //  console.log(query.age) //en bougeant les sliders : {$gte: 19, $lte: 44}
}

if (criteria.name) {
 // ici on veut pas avoir a tapper les nom parfait et complet...
 //marche PAS : query.name = criteria.name, j sais pas pourquoi.
 //$text	Performs text search.

 query.$text = { $search: criteria.name } //errmsg:"text index required for $text query"
 //mongo fait avec les String des indexes, pour ameliorer les recherches. maintenant il faut lui dire..
 //par defaut deulement _id est indexer, d ailleur la vitesse de recherche par id est ce qui est donc le plus rapide dans mongo.
 // il faut donc si on veut que la recherche par nom soit simple et efficace. il faut donc donner name, un index.

 //CREER un index sur ARtist.name , mongo par defaut ne permet que de mettre un index sur un seul champ. il faut bien choisir...


}

//  console.log(query)
 return query;
};

/*MONGO QUERY OPERATOR*/
//$gte	Matches values that are greater than or equal to a specified value.
//$lte	Matches values that are less than or equal to a specified value.


//////////////////////////Search et query plus complexe ///////////////////////

//////////////////////////indexer NAME  ///////////////////////

//$text	Performs text search.
//exemple mongodb: db.articles.find({$text: { $search: 'coffee'}})



//CREER UN INDEX POUR NAME , DANS ARTIST.

//1- OUVRIR UN MONGO SHELL DNAS LE TERMINAL: mongo
//2- POUR S ASSURER D ETRE DANS LA BONNE DB: use nomDeLaDB et enter. ici: use upstar_music
//3- POUR VOIR TOUS LES DB QUE NOUS AVONS : show dbs -ensuite enter.

//maintenant pour faire l indexement : db.artists.createIndex({name: "text"})

//WHY ?? artists. un email a stephen d envoyé.


/////////////enorme fuck ave cupdate ////////////////////////
//MAIS Y A UN ENORME FUCK AVEC UPDATE, il faut le savoir en sale, ca va updater que le premier. 1er arg , selection, 2ieme arg transformation, il faut un troisieme arg si on veut modifier plusieurs elements....
// donc options est le 3 ieme ... l option se nomme multi : true ou false ,

//// SETRETIRED

//1- pour un UPDATE, selection et ensuite transformation..
//selection: {_id: { $in: _ids }} dans les _id de tous es artist, si leur _id est dans($in) la liste de ids. // //transformation   { retired: false }  , ne pas les retirered.
//faut comme le lire a l envers, les _ids dans _id
return Artist.update({_id: { $in: _ids }}, { retired: true }, { multi: true });

//// SETNOTRETIRED
 return Artist.update({_id: { $in: _ids }}, { retired: false }, { multi: true });



/////////////////////////FAKER: comment se creer du faux contenu////////////////////

//seeds.js dams src.
//cool pour faker et ajouter bcp de trucs dans un projet.
//y en a deux, Faker et faker sur npm, faker est le bon.

j vais mettre le fichier complet ici, pas sur de tout saisir
et le lien pour le git hub pour plus d infos, mais c est cool , pour test de performance, c est un must :

https://github.com/marak/Faker.js/
import _ from 'lodash';
import faker from 'faker';
import { Db, Server } from 'mongodb';
import { GENRES } from './constants';

const MINIMUM_ARTISTS = 200;  //minimum a avoir en tout temps meme apres des deletes. c etait a 2 avant..
const ARTISTS_TO_ADD = 15000;  //combien a generer. et ici c etait 15

let artistsCollection;
const db = new Db('upstar_music', new Server('localhost', 27017));
db.open()
  .then(() => {
    artistsCollection = db.collection('artists');
    return artistsCollection.count({});
  })
  .then(count => {
    if (count < MINIMUM_ARTISTS) {
      const artists = _.times(ARTISTS_TO_ADD, () => createArtist());

      artistsCollection.insertMany(artists);
    }
  })
  .catch(e => console.log(e));


function createArtist() {
  return {
    name: faker.name.findName(),
    age: randomBetween(15, 45),
    yearsActive: randomBetween(0, 15),
    image: faker.image.avatar(),
    genre: getGenre(),
    website: faker.internet.url(),
    netWorth: randomBetween(0, 5000000),
    labelName: faker.company.companyName(),
    retired: faker.random.boolean(),
    albums: getAlbums()
  };
}

function getAlbums() {
  return _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 12.99
    };
  });
}

function getAlbumImage() {
  const types = _.keys(faker.image);
  const method = randomEntry(types);

  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max-min)) + min;
}
/////////////////////////FAKER: comment se creer du faux contenu FIN////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fin de l app ARTIST/////////////////////////////////////////////////// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// App Uber Express-mongo et fucking mocha ///////////////////////////// /////// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app va a routes pour separer le routing, et le model pour la Schema. on va faire nos queryu dans controller.


CE qu on doit faire :

1- dnas app.js on fait la connection et les middleware , et install les routes=>
1b- dans index.js on va faire la connection le app.listen avec le port.
2- dans routes on fait ce qui sera soit des get ou post ... delete
3- dans les controlleur les actions , ce qu on fait avec les get et post.
4- danms Driver.js on fait la schema et export le model.
5- on fait des asti de test.



///separer la logique avec un controller.






///tester avec mocha et supertest. qui est un nom con, mais qui fake un call, du faux browsing.


const assert = require('assert'); //assert avec mocha c est cool mais assert est dans NODE pas mocha.
const request = require('supertest');
const app = require('../app.js');


describe('tester le get request de express', () => {
 it('gere le get pour /api', (done) => {
   request(app) ///avec supertest, ca fait un fake request. qui retourne la verite.
    .get('/api')
    .end( (err, res) => {
      console.log(res); ///un osti paquet d affaire.
      console.log(res.body) //{ bonjour: 'toi' }
      assert(res.body.bonjour === 'toi');
      done();
    });
 });
});



Dans POSTMAN ( app de chrome ), on va tester des call http, c est facile avec postman, on choisi, get pot, et on entre dans l option body et ensuite de text on met ca a json, ce que l on veut passer comme arguments, sans avoir a faire une form en html et js en front end. on peut tester donc le back end rapidement.

//envoi json, ensuite send :
{
 "email": "ben2@axe-z.com"
}

en retour on aura :
{
    "__v": 0,
    "email": "ben2@axe-z.com",
    "_id": "596f8703eaf95430fa7132af",
    "driving": false
}





///Chaques test creer un driver en ce moment et on doit donc faire en sorte que ce qui est fait en test soit deleté mais aussi faire un systeme qui conserve ce que l on veut bien garder.
NODE_ENV = testing || production

//donc nos test seront dans un ENV=test
"test": "NODE_ENV=test nodemon --exec 'mocha --recursive -R min'"






////////////////////////////traiter la localisation avec mongoose //////////////////////////////////////
////////////////////////////traiter la localisation avec mongoose //////////////////////////////////////
////////////////////////////traiter la localisation avec mongoose //////////////////////////////////////
outils: geojson de www.geojson.org
/Model.geoNear(GeoJSON, options, [callback])

geojson est un standard de jason qui traite avec une formule le lat et lon et des points, ce standard est supporté par mongoose. Donc il est preferable de l utiliser.

//voici en sub doc une shema qui est pour du geojson
const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [ Number ],    //arr de number : lon, lat
    index: '2dsphere'
  }
});

ensuite dans le main schema :
,
geometry: PointSchema   //sub doc.


//mongodbinverse lng et et lat ... d ordinaire c est lat lng !! great ....

/*geoNear support for Mongoose

                                        GEONEAR


Parameters:

GeoJSON <Object, Array> point or legacy coordinate pair [x,y] to search near
options <Object> for the query
[callback] <Function> optional callback for the query
Returns:

<Promise>
See:

http://docs.mongodb.org/manual/core/2dsphere/
http://mongodb.github.io/node-mongodb-native/api-generated/collection.html?highlight=geonear#geoNear

OPTIONS:

lean {Boolean} return the raw object
All options supported by the driver are also supported
EXAMPLE:


// geoJson ///nous cest ca
var point = { type : "Point", coordinates : [9,9] };
Model.geoNear(point, { maxDistance : 5, spherical : true }, function(err, results, stats) {
   console.log(results);
});
*/


la route :
//traditionnelement , la liste qui retourne tous les drivers se nomme en fn , index.
app.get('/api/drivers', DriversController.index);

le controlleur:
//GET location last truc dans le cours
 index(req,res,next){
   // faut avoir le point de depart // exemple : 'http:truc.com/api/drivers?lng=80&lat=20'
   //req.query va sortir le 80 et le 20 mais en STRING !! il faut parsefloater la req.
    const { lng, lat } = req.query;  //parce que c est un get // ca sera dans le url.

   Driver.geoNear(          //mongoose inverse lng et et lat ... d ordinaire c est lat lng
     {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
     //options ( il va regarder les distance avec la courvature de la terre) , distance en metres. 200km
     { spherical : true, maxDistance: 200000 }
   )
   .then((drivers) => res.send(drivers))
   .catch(next);
 },


le test:
it('Get trouver la localisation d un driver', (done) => {
  const seattleDriver = new Driver({
     email: "seattle@axe-z.com",
     geometry: {
       type: 'Point',
       coordinates: [-122.4759902, 47.6147628]
     }
 });
 const miamiDriver = new Driver({
    email: "miami@axe-z.com",
    geometry: {
      type: 'Point',
      coordinates: [-80.253, 25.791 ]
    }
});

Promise.all([seattleDriver.save(), miamiDriver.save()])
.then(() => {
  request(app)
  .get('/api/drivers?lng=-80&lat=25')
  .end((err, response) => {
      //console.log(response);
      //console.log(response.body[0].obj.email)  //miami@axe-z.com
      assert(response.body.length === 1 )
      assert(response.body[0].obj.email === 'miami@axe-z.com')
      done();
    });
  });

});//fin du it

la response est celle-ci, parce que l ont cherchait a partir du '/api/drivers?lng=-80&lat=25':
on a eu que celui a moins de 200km et non pas lui a seattle.
lui est a 91.655km
 TEXT: text:'[{"dis":91655.08414855521,"obj":{"email":"miami@axe-z.com","geometry":{"coordinates":[-80.253,25.791],"_id":"59721c98ee7523464e8ab4d2","type":"Point"},"__v":0,"_id":"59721c98ee7523464e8ab4d1","driving":false}}]',

 body: [ { dis: 91655.08414855521, obj: [Object] } ],  //response.body[0].obj.email


////////////////////////////traiter la localisation avec mongoose //////////////////////////////////////
////////////////////////////traiter la localisation avec mongoose //////////////////////////////////////
////////////////////////////traiter la localisation avec mongoose //////////////////////////////////////
