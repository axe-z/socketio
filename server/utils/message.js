const generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: Date.now()
  };
};

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: Date.now()
  };
};


//https://www.google.com/maps/dir/45.443500,-73.584139/Parc+Raymond-Préfontaine
const generateLocationPre = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps/dir/${lat},${lng}/Parc+Raymond-Préfontaine`,
    createdAt: Date.now()
  };
};


module.exports = {
  generateMessage,
  generateLocationMessage,
  generateLocationPre
}
