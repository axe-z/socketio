const moment = require('moment');
moment.locale('fr-ca'); //mettre en fr.

const generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
  //  createdAt: Date.now()
   createdAt: moment().calendar()
  };
};

//https://www.google.com/maps?q=lat,lng
const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: moment().valueOf()  // sort un timeStamp. genre 1504052452492
  };
};


//https://www.google.com/maps/dir/45.443500,-73.584139/Parc+Raymond-Préfontaine
// const generateLocationPre = (from, lat, lng) => {
//   return {
//     from,
//     url: `https://www.google.com/maps/dir/${lat},${lng}/Parc+Raymond-Préfontaine`,
//     createdAt: Date.now()
//   };
// };


module.exports = {
  generateMessage,
  generateLocationMessage    //,
//  generateLocationPre
}



/*
shortcut :
moment.locale();         // fr-ca
moment().format('LT');   // 12:45
moment().format('LTS');  // 12:45:44
moment().format('L');    // 2017-08-29
moment().format('l');    // 2017-8-29
moment().format('LL');   // 29 août 2017
moment().format('ll');   // 29 août 2017
moment().format('LLL');  // 29 août 2017 12:45
moment().format('lll');  // 29 août 2017 12:45
moment().format('LLLL'); // mardi 29 août 2017 12:45
moment().format('llll');  // mar. 29 août 2017 12:46
*/

/*
calendar time :
moment().subtract(10, 'days').calendar(); // 2017-08-19
moment().subtract(6, 'days').calendar();  // mercredi dernier à 12:51
moment().subtract(3, 'days').calendar();  // samedi dernier à 12:51
moment().subtract(1, 'days').calendar();  // Hier à 12:51
moment().calendar();                      // Aujourd’hui à 12:51
moment().add(1, 'days').calendar();       // Demain à 12:51
moment().add(3, 'days').calendar();       // vendredi à 12:51
moment().add(10, 'days').calendar();
*/
