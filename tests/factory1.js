export default (factory2) => {
  return {
    salute: () => `I'm module 1`,
    derive: () => `${factory2.salute()} - called from module 1`,
  };
};
