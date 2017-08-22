//PROMISE SIMPLE
// const unePromise = new Promise((res , rej) => {
//   setTimeout( () => {
//     res( 'brave' );
//     rej('oups');
//   },2000);
// });
//
// unePromise
// .then((ceQuonRecoitDuRes) => {
//   console.log(ceQuonRecoitDuRes)
// })
// .catch(ceQuonRecoitCommeErr => {
//   console.log(ceQuonRecoitCommeErr)
// })

//AVEC FN
/*const test = temps => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			if (temps >= 2500) {
				res("bravo");
			} else {
				rej("oups");
			}
		}, temps);
	});
};
*/
//
// test(2000).then((ceQuonRecoitDuRes) => {    //OUPS
//   console.log('Sucess: ', ceQuonRecoitDuRes)
// })
// .catch(ceQuonRecoitCommeErr => {
//   console.log('Error: ', ceQuonRecoitCommeErr)
// });

//Si on veut chainer, on ne met pas deux Catch. on doit mettre le premier en CB et le dernier ok.
// test(2900).then((ceQuonRecoitDuRes) => {    //OUPS
//   console.log('Sucess: ', ceQuonRecoitDuRes)  //
//   return test(2600);
// }, (ceQuonRecoitCommeErr) => {
//   console.log('Error: ', ceQuonRecoitCommeErr)
// })
// .then((res)  => {
//   console.log(res , 'Ben 2 then')
// })
// .catch(ceQuonRecoitCommeErr => {
//   console.log('Error: ', ceQuonRecoitCommeErr)
// });


/*//ou plus simple :
test(2900).then((ceQuonRecoitDuRes) => {    // pour chainer la promesse.
  console.log('Sucess: ', ceQuonRecoitDuRes)  //
  return test(2400);
})
.then((res)  => {
  console.log(res , 'Ben 2 then')
})
.catch(ceQuonRecoitCommeErr => {
  console.log('Error: ', ceQuonRecoitCommeErr, arguments)
});
*/

//***************************************************************************************************
//WEATHER APP avec Promises avec Request
const request = require('request');

const geocodeAddress = (address) => {
	return new Promise((res, rej) => {
		const addresseEncode = encodeURIComponent(address);
		request(
			{
				url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresseEncode}`,
				json: true //va recevoir du json, et ca le transforme en obj.
			},
			(error, response, body) => {
				if (error) {
					rej("un erreur s'est produit" + response.statusCode);
				} else if (body.status === "ZERO_RESULTS") {
					rej("Aucun resultat retrouvé");
				} else if (body.status === "OK") {
					res({
						address: body.results[0].formatted_address,
						lat: body.results[0].geometry.location.lat,
						lng: body.results[0].geometry.location.lng
					});
				}
			}
		);
	});
};


geocodeAddress('H7M 2C6')
.then(location => {
  console.log(JSON.stringify(location, null, 2));
  console.log(location.lat)
})
.catch(err => {
  console.log(err)
})
//***************************************************************************************************
//WEATHER APP avec Promises avec Request
