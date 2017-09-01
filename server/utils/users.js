
class Users {
 constructor (){
  this.users = [];                            //on initialise un array
 }
 addUser(id, nom, chambre) {
   let user = { id, nom, chambre };           //user devient un obj a trois key qu on va pusher dans l arr.
   this.users.push(user);
   return user;
 }
 removeUser(id){
   const user = this.users.filter((user) => user.id === id)[0];
   //avec notre user a deleter, on va filter celui ci de l arr et retourner que les autres.
   if(user){
     this.users = this.users.filter((user) => user.id !== id)
   }
   return user;                               //retourner le user delete
 }
 getUser(id){
   ///au lieu d un array de 1 on aurra le user direct.
  return this.users.filter((user) => user.id === id)[0];
 }
 getUserList(chambre){
   const users = this.users.filter((user) => {
     return user.chambre === chambre ;
   });
   const ArrayDeNoms = users.map(user => {
     return user.nom
   });
   return ArrayDeNoms;
 }
}

//on veut ca..
// [{
//   id:,
//   nom:'',
//   chambre:
// }]

module.exports = { Users };
