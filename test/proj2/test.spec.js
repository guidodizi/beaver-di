import { assert } from 'chai';
import beaver from './beavertest.config';

export default () => {
  it('Should fail to get module1 because of circular dependency', () => {
    assert.throws(
      () => beaver.get('module1'),
      Error,
      'Circular dependency detected: module1 => module2 => module3 => module4 => module1',
    );
  });
};
