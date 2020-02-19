export default (module2, value1) => {
  return {
    salute: () => `I'm module 1`,
    derive: () => `${module2.salute()} - called from module 1`,
    value1,
  };
};
