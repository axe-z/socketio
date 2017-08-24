const expect = require('expect');
 const {generateMessage} = require('./../server/utils/message.js');

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
