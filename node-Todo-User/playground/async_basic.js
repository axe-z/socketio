//ASYNC NODE

console.log('part l app.')

setTimeout( () => {
  console.log('dedans le set')
},200);

setTimeout( () => {
  console.log('dedans le set 2')
}, 0);

console.log('fin de l app.')

// part l app.
// fin de l app.
// dedans le set2     //meme a 0 , il prend .004ms
// dedans le set
