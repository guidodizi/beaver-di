import _ from 'lodash';
import fnParams from 'get-parameter-names';
import { keying } from './utils';

class Beaver {
  /**
   *
   * @param {object} initial - initializing object containing key, values to either
   * factories or instances of dependencies
   * @param {object} options
   * @param {string} options.configPath - path to configuration file
   */
  constructor(factories, dependencies) {
    this.factories = new Map();
    this.dependencies = dependencies;

    // Set initial state
    const keys = keying(factories);

    keys.forEach((key) => {
      const value = _.get(factories, key);

      if (typeof value !== 'function') {
        throw new Error('Factories object can only contain function values');
      }
      this.factory(key, value);
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
    if (_.get(this.dependencies, name)) {
      throw new Error(
        'There is already a dependency instance for the name: ',
        name,
      );
    }
    _.set(this.dependencies, name, dependency);
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

    if (!_.get(this.dependencies, name)) {
      dependencyPrecedence.push(name);

      const factory = this.factories.get(name);
      _.set(
        this.dependencies,
        name,
        factory && this._inject(factory, dependencyPrecedence),
      );

      if (!_.get(this.dependencies, name)) {
        throw new Error(`Cannot resolve dependecy ${name}`);
      }

      return _.get(this.dependencies, name);
    }
    return _.get(this.dependencies, name);
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
      Object.keys(params).forEach((factoryDep) => {
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

export default (...args) => new Beaver(...args);
