
const fs = require('fs');


const fetchNotes = () => {
  ///methode pour lire le data actuel, retourne le data sinon fait un arr vide.
	try {
		let noteString = fs.readFileSync("notes-data.json");
		return JSON.parse(noteString); // Retourne le contenu actuel [{},{}]
	} catch (e) {
		return [];      //on va retourner un array vide au cas d un error.
	}
};

const saveNotes = (notes) => {
  //prend le data et le renvois dans le fichier json.
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

//add
const addnote = (title, body) => {
    let notes = fetchNotes(); //retourne ce qu on a , ou un arr vide.
    let note = {title,body};
  let duplicateNotes = notes.filter(note => {
      return note.title === title
    })
    if(duplicateNotes.length === 0) {
      notes.push(note);
      saveNotes(notes);
      return note;
    };
};
//list
const getAll = () => {
  return fetchNotes();
};
//read
const getNote = (title) => {
  let notes = fetchNotes(); //ARR
  let filteredNote = notes.filter(note => {
    return note.title === title;
  });
	if(filteredNote.length === 1){  //pas besoin vraiment..
		 return filteredNote[0];  //retourne un arr !!
	 }
};
//remove
const removeNote = (title) => {
  let notes = fetchNotes();
  let filteredNote = notes.filter(note => {
    return note.title !== title;
  });
  saveNotes(filteredNote);
  return notes.length !== filteredNote.length //si on delete ca devrait pas etre pareil.
};

const logNote = (note) => {
  console.log('-------------');
  console.log('title: ' + note.title);
  console.log('Body: ' + note.body);
    console.log('-------------');
}


module.exports = {
  addnote: addnote ,
  getAll,
  getNote,
  removeNote,
	logNote
}














//1- premier passe
// const addnote = (title, body) => {
//     let notes = [];
//
//     let note = {
//       title,
//       body
//     };
//
//     //verifier si le fichier n est pas encore la
//     try {    //pour partir du bon endroit dans le fichier si deja du stock
//       let noteString = fs.readFileSync('notes-data.json');
//       notes = JSON.parse(noteString); // le contenu actuel.
//     } catch(e){
//       //console.log(e)
//     }
//
//     let duplicateNotes = notes.filter(note => {
//       return note.title === title // si le titre qu on met est le meme , c est donc un doublons.
//     })
//     if(duplicateNotes.length === 0) {  //donc seulement si y a pas de situation de doublons on write.
//       //pour ecrire
//       notes.push(note); // si y a rien , ca push , si y a quelques chose, sa ajoute.
//      fs.writeFileSync('notes-data.json', JSON.stringify(notes))
//
//     };
// };
