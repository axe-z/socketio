const request = require('request');


const getWeather = (lat, lng, callback) => {
	request(
		{
			url:
			`https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/${lat},${lng}?units=ca&lang=fr`,
			json: true
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				//console.log(typeof body); //obj
				//console.log(Math.round(body.currently.temperature)); // 26
				//console.log(body.currently.temperature); // 26.49
				//console.log(body.daily.summary);

          callback( undefined , {
            temp: body.currently.temperature,
            today: body.daily.summary,
            apparentTemperature: body.currently.apparentTemperature
          })
			} else {
				//console.log("Un probleme est survenu");
        callback('un erreur s\'est produit', null)
			}
		}
	);
};



module.exports = {
  getWeather
}
