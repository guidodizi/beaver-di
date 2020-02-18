import { expect, assert } from 'chai';
import beaver from '../src';

describe('Testing that modules get injected correctly', () => {
  let container;
  before(() => {
    container = beaver({ configPath: './test/beaver.test.json' });
  });

  it('Should retrieve module 1 correctly', () => {
    const module1 = container.get('factory1');
    expect(module1).to.be.an('object');
    expect(module1).to.have.property('salute');
    expect(module1).to.have.property('derive');
  });
  it('Should retrieve module 2 correctly', () => {
    const module2 = container.get('factory2');
    expect(module2).to.be.an('object');
    expect(module2).to.have.property('salute');
    expect(module2).to.have.property('derive');
  });
  it('Should retrieve module 3 correctly', () => {
    const module3 = container.get('factory3');
    expect(module3).to.be.an('object');
    expect(module3).to.have.property('salute');
  });

  it('Should correctly call injected property in module 1', () => {
    const module1 = container.get('factory1');
    assert(module1.derive() === `I'm module 2 - called from module 1`);
  });
  it('Should correctly call injected property in module 2', () => {
    const module2 = container.get('factory2');
    assert(module2.derive() === `I'm module 3 - called from module 2`);
  });
});

describe('Testing that initialization is done correctly', () => {
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
});
