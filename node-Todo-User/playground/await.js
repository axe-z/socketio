const fetch = require('node-fetch')
//npm install --save node-fetch

//en promise

/*function fetchAvatarUrl(userId){
  return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
  .then(data => {
   return data.json()
  })
  .then((data) => {
    //console.log(data) ///obj complet
  //  console.log(data.imageUrl)  //http://images.somecdn.com/user-123.jpg
    return data.imageUrl
}).catch...
}

const result = fetchAvatarUrl(123)
result.then(url => console.log(url))//http://images.somecdn.com/user-123.jpg
*/

//async await , c est ecrire du async, mais en sync.


async function fetchAvatarUrl(userId){
  const res = await fetch(`https://catappapi.herokuapp.com/users/${userId}`);
  //const data = res.json() //promise avec le data
  const data = await res.json() //le data direct ,
  //console.log(res)  // tout la rep.
  console.log(data.imageUrl)  //http://images.somecdn.com/user-123.jpg
  return data.imageUrl
}


const result = fetchAvatarUrl(123)
//console.log(result) est comme en haut une promesse qui resolve l adresse
