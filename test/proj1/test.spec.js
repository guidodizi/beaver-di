import { expect, assert } from 'chai';
import beaver from './beavertest.config';

export default () => {
  it('Should retrieve module 1 correctly', () => {
    const module1 = beaver.get('module1');
    expect(module1).to.be.an('object');
    expect(module1).to.have.property('salute');
    expect(module1).to.have.property('derive');
    expect(module1).to.have.property('value1');
    assert(module1.value1 === 'helloWorld');
  });
  it('Should retrieve module 2 correctly', () => {
    const module2 = beaver.get('module2');
    expect(module2).to.be.an('object');
    expect(module2).to.have.property('salute');
    expect(module2).to.have.property('derive');
  });
  it('Should retrieve module 3 correctly #here', () => {
    const module3 = beaver.get('module3');
    expect(module3).to.be.an('object');
    expect(module3).to.have.property('salute');
    expect(module3).to.have.property('value');
    assert(module3.value === 22);
  });

  it('Should correctly call injected property in module 1', () => {
    const module1 = beaver.get('module1');
    assert(module1.derive() === "I'm module 2 - called from module 1");
  });
  it('Should correctly call injected property in module 2', () => {
    const module2 = beaver.get('module2');
    assert(module2.derive() === "I'm module 3 - called from module 2");
  });

  it('Should correctly call injected property in module 2', () => {
    const module2 = beaver.get('module2');
    assert(module2.derive() === "I'm module 3 - called from module 2");
  });
};
