const expect = require('expect');
const {Users} = require('./../server/utils/users.js');


describe("Test de Users", () => {
  let users;
    beforeEach( () => {
      users = new Users();
      users.users = [{
        id: '1',
        nom: 'Ben',
        chambre: "Verdons"
      },
      {
        id: '2',
        nom: 'Benoit',
        chambre: "Verdons"
      },
      {
        id: '3',
        nom: 'Seb',
        chambre: "Vert"
      },
    ];
  });

  it("Ca Devrait marcher", () => {
    const userstest = new Users();
    const user = {
      id: '123',
      nom: 'Ben',
      chambre: "Verdons"
    }
    const resUser = userstest.addUser(user.id,user.nom,user.chambre)  //addUser , retourne le user dans la fn
    console.log(resUser)

    expect(userstest.users).toBeA('array') //constructor fait un array
    expect(resUser).toExist()
    expect(resUser.nom).toBe('Ben');
    expect(userstest.users).toEqual([user]);
  });


  it('devrait retourner les nom dans la chambre Verdons', () => {
      expect(users.getUserList('Verdons').length).toBe(2);
      expect(users.getUserList('Verdons')).toEqual(['Ben', 'Benoit']);
  });

  it('devrait retourner les nom dans la chambre Vert', () => {
      expect(users.getUserList('Vert').length).toBe(1);
      expect(users.getUserList('Vert')).toEqual(['Seb']);
  });
});
