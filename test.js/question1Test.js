const chai = require('chai');
const expect = chai.expect;

const deepClone = require('../deepClone').deepClone;

describe('deepClone function', () => {

	it('should clone the properties of an object', () => {
		const name = "Paddy";
		const town = "Lerum";
		const country = "Sweden";

		const obj1 = { name: name, address: { town: town, country: country } };
		const obj2 = deepClone(obj1);
		expect(obj1.name).to.equal(obj2.name);
	})

	it('should clone nested objects', () => {
		const level1 = "level1";
		const level2 = "level2";
		const level3 = "level3";

		const testObject = {
			level1: level1,
			level2: {
				level2: level2,
				level3: {
					level3: level3
				}
			}
		};
		const cloned = deepClone(testObject);
		expect(cloned.level2).to.equal(testObject.level2);
	})

	it('original should remain unchanged when cloned object is changed', () => {
		const name = "name";
		const object = { name: name };
		const object2 = deepClone(object);
		object2.name = "Uche";
		expect(object.name).to.equal(name);
	})

	it('should return undefined when the argument passed to it is not an object', () => {
		const aString = ' a string ';
		const cloned = deepClone(aString);
		expect(cloned).to.equal(undefined);
	})
})