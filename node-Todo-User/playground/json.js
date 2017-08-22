// const obj = {
//   name: "Ben"
// }
//
// let stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);        //string
// console.log(stringObj)                 //{"name":"Ben"}
//
//
// let personString = '{"name": "Ben", "age" : 40}';
// let personObj = JSON.parse(personString);
// console.log(typeof personObj)           //obj
// console.log(personObj)                  //{ name: 'Ben', age: 40 }


const fs = require('fs');

let originalNote = {
  title: 'Un titre cool',
  body: 'du contenu'
}
// let ori = JSON.stringify(originalNote); //convertir en json

fs.writeFileSync('./notes.json', ori);     //va creer un fichier et mettre le json


let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(noteString)
console.log(note) //{ title: 'Un titre cool', body: 'du contenu' }
