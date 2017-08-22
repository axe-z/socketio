///////////////REQUIRE
const fs = require('fs');
const os = require('os');
const _ = require('lodash');


///////////////////////////////////////////////////////////////////////////////////////////////
///                        ////Weather app avec AXIOS ////                            ////
///////////////////////////////////////////////////////////////////////////////////////////////

const yargs = require('yargs');
const axios = require('axios');

//le yargs qui permet de faire node app.js  -a "mettre une addresse ou code postal"
const argv = yargs.options({
  a: {
    demand: false,
    alias: 'address',
    describe: 'Adresse pour rechercher la temperature',
    string: true      //yargs va parser en string.
  }
}).help().alias('help', 'h').argv;

//console.log(argv)
const addresseEncode = encodeURIComponent(argv.address);
//node appPromise.js -a="H7M 2C6"
//console.log(addresseEncode) //H7M%202C6

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addresseEncode}`

axios
	.get(geocodeUrl)
	.then(response => {
		if (response.data.status === "ZERO_RESULTS") {
			throw new Error("Rien n'a ete trouvé a cette addresse");
		}
  //  else if (response.data.status === "OK") {   //pas vraiment necessaire
		const { lat, lng } = response.data.results[0].geometry.location;
		const weatherUrl = `https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/${lat},${lng}?units=ca&lang=fr`;
		return axios
			.get(weatherUrl)
			.then(res => {
				const temp = res.data.currently.temperature;
				const resume = res.data.daily.summary;
				const apparentTemperature = res.data.currently.apparentTemperature;

				console.log(`Il fait presentement ${Math.round(temp)} mais on ressent ${Math.round(apparentTemperature)} avec l'humidité`);
			})
			.catch(e => {
				console.log(e);
			});
//    }  //fin du else if OK
	})
	.catch(err => {
		//bonne idee de tester , en fermant sa connection , address 00000
		if (err === "ENOTFOUND") {
			console.log("pas capable de se connecter au serveur");
		} else {
			console.log(err);
		}
	});






///////////////////////////////////////////////////////////////////////////////////////////////
///                        ////Weather app avec AXIOS ////                            ////
///////////////////////////////////////////////////////////////////////////////////////////////
