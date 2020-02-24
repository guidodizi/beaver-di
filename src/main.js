import _ from 'lodash';
import fnParams from 'get-parameter-names';
import { keying } from './utils';

class Beaver {
  /**
   *
   * @param {object} inital - initalizing object containing key, values to either
   * factories or instances of dependencies
   * @param {object} options
   * @param {string} options.configPath - path to configuration file
   */
  constructor(inital) {
    this.dependencies = new Map();
    this.factories = new Map();

    // Set initial state
    const keys = keying(inital);

    keys.forEach((key) => {
      const value = _.get(inital, key);

      if (typeof value === 'function') {
        this.factory(key, value);
      } else {
        this.register(key, value);
      }
    });
  }

  /**
   * @summary assign to a specific name a factory function that when executed will create an
   * instance of dependency
   * @param {string} name - unique name to register instances
   * @param {Function} factory - factory function to create an instance of dependency
   */
  factory(name, factory) {
    if (this.factories.get(name)) {
      throw new Error('There is already a factory for the name: ', name);
    }
    this.factories.set(name, factory);
  }

  /**
   * @summary assign to a specific name an instance of a dependency.
   * This can also be used to register constants i.e. beaver.register('TOKEN', 'secretToken!').
   * @param {string} name - unique name to register instance.
   * @param {*} dependency - instance of dependency.
   */
  register(name, dependency) {
    if (this.dependencies.get(name)) {
      throw new Error(
        'There is already a dependency instance for the name: ',
        name,
      );
    }
    this.dependencies.set(name, dependency);
  }

  /**
   * @summary retrieve instance of dependency
   * @param {string} name - identifier of dependency
   * @param {array} dependencyPrecedence - array of dependency tree being called until now,
   * used to check for circular deps
   */
  get(name, dependencyPrecedence = []) {
    if (dependencyPrecedence.includes(name)) {
      const circularity = dependencyPrecedence.reduce(
        (acc, curr) => `${acc} => ${curr}`,
        dependencyPrecedence.shift(),
      );
      throw new Error(
        `Circular dependency detected: ${circularity} => ${name}`,
      );
    }
    if (!this.dependencies.get(name)) {
      const factory = this.factories.get(name);
      dependencyPrecedence.push(name);

      this.dependencies.set(
        name,
        factory && this._inject(factory, dependencyPrecedence),
      );

      if (!this.dependencies.get(name)) {
        throw new Error(`Cannot resolve dependecy ${name}`);
      }

      return this.dependencies.get(name);
    }
    return this.dependencies.get(name);
  }

  /**
   * @summary excecutes factory function to create instance of dependency.
   * @param {Function} factory - factory function to instantiate dependency
   * @param {array} dependencyPrecedence - array of dependency tree being called until now,
   * used to check for circular deps
   */
  _inject(factory, dependencyPrecedence) {
    if (factory.beaver) {
      const params = { ...factory.beaver };
      Object.keys(factory.beaver).forEach((factoryDep) => {
        params[factoryDep] = this.get(params[factoryDep], dependencyPrecedence);
      });

      return factory(params);
    }

    // dependencies for selected factory
    const args = fnParams(factory).map((dep) =>
      this.get(dep, dependencyPrecedence),
    );

    return factory(...args);
  }
}

export default (opts) => new Beaver(opts);
