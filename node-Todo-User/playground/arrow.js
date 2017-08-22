//DANS UN OBJECT DEPUIS ES6

let obj = {
  name: "ben",
  sayhi: () => {
    console.log(arguments); //marche pas
    console.log(`allo je suis ${this.name}`)  //marche pas
  },
  sayhiEs6(){
    console.log(arguments);
    console.log(`allo je suis ${this.name} en es6`)
  }
}
//obj.sayhi('arg1', 'arg2');
//obj.sayhiEs6('arg1', 'arg2');
