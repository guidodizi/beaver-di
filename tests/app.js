import beaverContainer from '../src';
import factory1 from './factory1';
import factory2 from './factory2';
import factory3 from './factory3';

const beaver = beaverContainer();

beaver.factory('factory3', factory3);
beaver.factory('factory2', factory2);
beaver.factory('factory1', factory1);

const module2 = beaver.get('factory2');
const module1 = beaver.get('factory1');
const module3 = beaver.get('factory3');

console.log(module1.salute());
console.log(module1.derive());

console.log(module2.salute());
console.log(module2.derive());

console.log(module3.salute());
