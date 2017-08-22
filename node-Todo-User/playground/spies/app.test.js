const expect = require('expect');

describe("test de spies", () => {

	it("should call le spy", () => {
		let spy = expect.createSpy();
    spy('Ben', 40);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Ben', 40);
	});

});
