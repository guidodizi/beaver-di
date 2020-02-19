import { assert } from 'chai';
import beaver from '../beavertest.config';

export default () => {
  it('Should fail since no .beaver.json is found in top level', () => {
    assert.throws(
      beaver,
      Error,
      'Create a .beaver.json file to specifiy factories for dependencies or instantiate Beaver with configPath option',
    );
  });
  it('Should fail since config file does not exist', () => {
    assert.throws(
      () => beaver({ configPath: 'random.json' }),
      Error,
      'Create a .beaver.json file to specifiy factories for dependencies or instantiate Beaver with configPath option',
    );
  });
  it('Should pass since config file runs smoothly', () => {
    assert.throws(
      () => beaver({ configPath: 'beaver.test.json' }),
      Error,
      'Create a .beaver.json file to specifiy factories for dependencies or instantiate Beaver with configPath option',
    );
  });
};
