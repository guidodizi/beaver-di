import beaver from '../src';

const container = beaver();
const module2 = container.get('factory2');
const module1 = container.get('factory1');
const module3 = container.get('factory3');

console.log(module1.salute());
console.log(module1.derive());

console.log(module2.salute());
console.log(module2.derive());

console.log(module3.salute());
