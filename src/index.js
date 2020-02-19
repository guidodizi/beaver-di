'use strict';

import path from 'path';
import fs from 'fs';
import fnParams from 'get-parameter-names';

class Beaver {
  /**
   *
   * @param {object} options
   * @param {string} options.configPath - path to configuration file
   */
  constructor({ configPath } = {}) {
    this.configPath = configPath || '.beaver.json';
    this.dependencies = {};
    this.factories = {};

    this._hydrate();
  }

  /**
   * @summary assign to a specific name a factory function that when executed will create an instance of dependency
   * @param {string} name - unique name to register instances
   * @param {Function} factory - factory function to create an instance of dependency
   */
  factory(name, factory) {
    if (this.factories[name]) {
      throw new Error('There is already a factory for the name: ', name);
    }
    this.factories[name] = factory;
  }

  /**
   * @summary assign to a specific name an instance of a dependency. This can also be used to register constants i.e. beaver.register('TOKEN', 'secretToken!').
   * @param {string} name - unique name to register instance.
   * @param {*} dependency - instance of dependency.
   */
  register(name, dependency) {
    if (this.dependencies[name]) {
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
    if (!this.dependencies[name]) {
      const factory = this.factories[name];

      this.dependencies[name] = factory && this._inject(factory);

      if (!this.dependencies[name]) {
        throw new Error(`Cannot resolve dependecy ${name}`);
      }

      return this.dependencies[name];
    }
    return this.dependencies[name];
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

  /**
   * @summary hydrate factories from config path
   */
  _hydrate() {
    const configPath = path.resolve(process.cwd(), this.configPath);
    if (!fs.existsSync(configPath)) {
      throw new Error(
        'Create a .beaver.json file to specifiy factories for dependencies or instantiate Beaver with configPath option',
      );
    }

    const data = fs.readFileSync(configPath, 'utf8');
    try {
      const data = JSON.parse(data);
      for (let name in data) {
        const value = require(path.resolve(process.cwd(), factories[name]))
          .default;

        if (typeof value === 'function') {
          this.factories[name] = value;
          return;
        }
        this.dependencies[name] = value;
      }
    } catch (err) {
      console.log(err);
      throw new Error(`Couldn't hydrate factories`);
    }
  }
}

export default (opts) => new Beaver(opts);
