import fnParams from 'get-parameter-names';

class Beaver {
  constructor() {
    this.dependencies = {};
    this.factories = {};
  }

  /**
   * @summary assign to a specific name a factory function that when executed will create an instance of dependency
   * @param {string} name - unique name to register instances
   * @param {Function} factory - factory function to create an instance of dependency
   */
  factory(name, factory) {
    this.factories[name] = factory;
  }

  /**
   * @summary assign to a specific name an instance of a dependency. This can also be used to register constants i.e. beaver.register('TOKEN', 'secretToken!').
   * @param {string} name - unique name to register instance.
   * @param {*} dependency - instance of dependency.
   */
  register(name, dependency) {
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
}

export default new Beaver();
