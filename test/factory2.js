export default (module3) => {
  return {
    salute: () => `I'm module 2`,
    derive: () => `${module3.salute()} - called from module 2`,
  };
};
