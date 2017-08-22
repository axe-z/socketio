const request = require('request');

//Sans commentaires. voir en bas pour info sur le code.
const geocodeAddress = (address, callback) => {
	//soit errorMessage ou results
	const addresseEncode = encodeURIComponent(address);
	request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresseEncode}`,
			json: true
		},
		(error, response, body) => {
			if (error) {
				callback("un erreur s'est produit" + response.statusCode);
			} else if (body.status === "ZERO_RESULTS") {
				callback("Aucun resultat retrouvé");
			} else if (body.status === "OK") {
				callback(undefined, {
					address: body.results[0].formatted_address,
					lat: body.results[0].geometry.location.lat,
					lng: body.results[0].geometry.location.lng
				});
			}
		}
	);
};

module.exports = {
  geocodeAddress
}



//AVEC INFOS MEME CHOSE QU EN HAUT
/*const geocodeAddress = (address, callback) => {  //soit errorMessage ou results

  const addresseEncode = encodeURIComponent(address);
  //le request a google.
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresseEncode}`,
    json: true                      //va recevoir du json, et ca le transforme en obj.
}, (error, response, body) => {
//GOOGLEMAPS A DES STATUS DIFFERENT PAS DE 404 OU 200 , MAIS 'ZERO_RESULTS' OU 'OK' RESPECTIVEMENT.
if (error) {                       //null si pas.
                                   //console.log('un erreur s\'est produit', response.statusCode)
    callback('un erreur s\'est produit' + response.statusCode);
                                   // console.log(response.statusCode) //plus facile a trouver dans le body.
} else if (body.status === 'ZERO_RESULTS') {
                                    //bonne idee de faire des test sur le site, pour voir les erreurs.
                                    //console.log('Aucun resultat retrouvé')
     callback('Aucun resultat retrouvé')
} else if (body.status === 'OK') {  //OK quand tout es beau.
      callback( undefined , {       //undefined, pour passer le errorMessage !!!
        address: body.results[0].formatted_address,
        lat:  body.results[0].geometry.location.lat,
        lng:  body.results[0].geometry.location.lng
      });
                                    //const {lat, lng } = body.results[0].geometry.location;
                                    //console.log('lat: ' + lat,'lng: ' +  lng) //45.5351737 -73.5854221
                                    //console.log('Adresse: ', body.results[0].formatted_address)
   };
  });
}
module.exports = {
  geocodeAddress
}
*/

// {
// "address": "5261 Rue Garnier, Montréal, QC H2J 3T3, Canada",
// "lat": 45.5351737,
// "lng": -73.5854221
// }
