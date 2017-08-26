const expect = require('expect');
 const {generateMessage, generateLocationMessage} = require('./../server/utils/message.js');

describe("Test de generateMessage", () => {
  it("Ca Devrait marcher", () => {
    const from = 'ben';
    const text = 'allo le test';
    const message = generateMessage(from, text)

     expect(message.createdAt).toBeA('number'); //fucking lowercase.
     expect(message).toBeA('object');   //fucking lowercase.
     expect(message.from).toBe('ben');
  });
});


describe("Test de generation de message", () => {
  it("Ca Devrait donner un url", () => {
    const message = generateLocationMessage("moi", 45, -73);

    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe( `https://www.google.com/maps?q=45,-73`);
  });
});
