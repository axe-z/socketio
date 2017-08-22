let getUser = (id, cb) => {
  let user = {
    id,
    name: 'Vikram'
  };
  setTimeout(() => {
      cb(user)
  },2000)
};

getUser(31, (userdata) => {
  console.log(userdata.name); //Vikram
});

/*
https://maps.googleapis.com/maps/api/geocode/json?address=5261%20garnier%20montreal

{
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "5261",
               "short_name" : "5261",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Rue Garnier",
               "short_name" : "Rue Garnier",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Le Plateau-Mont-Royal",
               "short_name" : "Le Plateau-Mont-Royal",
               "types" : [ "political", "sublocality", "sublocality_level_1" ]
            },
            {
               "long_name" : "Montréal",
               "short_name" : "Montréal",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Communauté-Urbaine-de-Montréal",
               "short_name" : "Communauté-Urbaine-de-Montréal",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "Québec",
               "short_name" : "QC",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "Canada",
               "short_name" : "CA",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "H2J 3T3",
               "short_name" : "H2J 3T3",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "5261 Rue Garnier, Montréal, QC H2J 3T3, Canada",
         "geometry" : {
            "location" : {
               "lat" : 45.5351737,
               "lng" : -73.5854221
            },
            "location_type" : "RANGE_INTERPOLATED",
            "viewport" : {
               "northeast" : {
                  "lat" : 45.5365226802915,
                  "lng" : -73.58407311970849
               },
               "southwest" : {
                  "lat" : 45.5338247197085,
                  "lng" : -73.58677108029151
               }
            }
         },
         "partial_match" : true,
         "place_id" : "Ei81MjYxIFJ1ZSBHYXJuaWVyLCBNb250csOpYWwsIFFDIEgySiAzVDMsIENhbmFkYQ",
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
}
*/
