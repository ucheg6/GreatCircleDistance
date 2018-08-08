// Question1 Write a function called deepClone which takes an object and creates a copy of it.

// Check if obj is an object
const isObject = (val) => {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
 }
const obj = { name: "Paddy", address: { town: "Lerum", country: "Sweden" } };

//clone object
function deepClone(obj){
    if (isObject(obj)) { return { ...obj }; }
    return undefined;
  }

const obj2 = deepClone(obj);
console.log(obj);
console.log(obj2);

module.exports = {
    deepClone: deepClone
};



 

 