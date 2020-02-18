import fnParams from 'get-parameter-names';

export default () => {
  const dependencies = {};
  const factories = {};
  const container = {};

  container.factory = (name, factory) => {
    factories[name] = factory;
  };

  container.register = (name, dependency) => {
    dependencies[name] = dependency;
  };

  container.get = (name) => {
    if (!dependencies[name]) {
      const factory = factories[name];
      dependencies[name] = factory && container.inject(factory);

      if (!dependencies[name]) {
        throw new Error(`Cannot resolve dependecy ${name}`);
      }

      return dependencies[name];
    }
    return dependencies[name];
  };

  container.inject = (factory) => {
    // dependencies for selected factory
    const args = fnParams(factory).map((dep) => container.get(dep));

    return factory(...args);
  };

  return container;
};
