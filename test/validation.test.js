const expect = require('expect');
 const { isRealString } = require('./../server/utils/validation.js');


 describe("Test de validation isRealString()", () => {
   it("Ca Devrait valider", () => {
     const nom = '   Ben'
     const chambre = "Verdons"
      //const chambre = "   ";
     const validNom = isRealString(nom);
     const validChambre = isRealString(chambre);

     expect(validNom).toBe(true);
     expect(validChambre).toBeA('boolean')
    //  expect(validChambre).toBe(false) // si des vides.
   });
   it('devrait dire noooonnn', () => {
     const res = isRealString('  %@#%$#^$#  ')
     expect(res).toBe(true);
   });
 });
