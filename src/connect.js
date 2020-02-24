/**
 * @summary Assign a beaver property to a factory function. This property contains the
 * dependencies needed to instantiate the factory
 * @param {Function} factory - Factory
 * @param {object} dependencies - Object mapping the dependencies needed for the factory
 */
export default (factory, dependencies) => {
  // eslint-disable-next-line no-param-reassign
  factory.beaver = dependencies;
  return factory;
};
