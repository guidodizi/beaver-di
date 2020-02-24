import factory1 from './factory1';
import factory2 from './factory2';
import factory3 from './factory3';
import beaver from '../../src';

const beaverTest = beaver({
  module1: factory1,
  module2: factory2,
  module3: factory3,
  value1: 'helloWorld',
  value2: {
    prop1: 22,
    module3A: factory3,
  },
});

export default beaverTest;
