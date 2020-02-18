export default (factory3) => {
  return {
    salute: () => `I'm module 2`,
    derive: () => `${factory3.salute()} - called from module 2`,
  };
};
