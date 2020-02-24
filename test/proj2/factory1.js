export default (module2) => ({
  salute: () => "I'm module 1",
  derive: () => `${module2.salute()} - called from module 1`,
});
