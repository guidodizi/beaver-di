'use strict';

import path from 'path';
import fs from 'fs';
import fnParams from 'get-parameter-names';

class Beaver {
  /**
   *
   * @param {object} inital - initalizing object containing key, values to either facotries or instances of dependencies
   * @param {object} options
   * @param {string} options.configPath - path to configuration file
   */
  constructor(inital) {
    this.dependencies = {};
    this.factories = {};

    for (let key in inital) {
      const value = inital[key];
      if (typeof value === 'function') {
        this.factories[Symbol.for(key)] = value;
      } else {
        this.dependencies[Symbol.for(key)] = value;
      }
    }
  }

  /**
   * @summary assign to a specific name a factory function that when executed will create an instance of dependency
   * @param {string} name - unique name to register instances
   * @param {Function} factory - factory function to create an instance of dependency
   */
  factory(name, factory) {
    if (this.factories[Symbol.for(name)]) {
      throw new Error('There is already a factory for the name: ', name);
    }
    this.factories[Symbol.for(name)] = factory;
  }

  /**
   * @summary assign to a specific name an instance of a dependency. This can also be used to register constants i.e. beaver.register('TOKEN', 'secretToken!').
   * @param {string} name - unique name to register instance.
   * @param {*} dependency - instance of dependency.
   */
  register(name, dependency) {
    if (this.dependencies[Symbol.for(name)]) {
      throw new Error(
        'There is already a dependency instance for the name: ',
        name,
      );
    }
    this.dependencies[name] = dependency;
  }

  /**
   * @summary retrieve instance of dependency
   * @param {string} name - identifier of dependency
   */
  get(name) {
    if (!this.dependencies[Symbol.for(name)]) {
      const factory = this.factories[Symbol.for(name)];

      this.dependencies[Symbol.for(name)] = factory && this._inject(factory);

      if (!this.dependencies[Symbol.for(name)]) {
        throw new Error(`Cannot resolve dependecy ${name}`);
      }

      return this.dependencies[Symbol.for(name)];
    }
    return this.dependencies[Symbol.for(name)];
  }

  /**
   * @summary excecutes factory function to create instance of dependency.
   * @param {Function} factory - factory function to instantiate dependency
   */
  _inject(factory) {
    // dependencies for selected factory
    const args = fnParams(factory).map((dep) => this.get(dep));

    return factory(...args);
  }
}

export default (opts) => new Beaver(opts);
