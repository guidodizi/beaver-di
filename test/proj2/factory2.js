export default (module3) => ({
  salute: () => "I'm module 2",
  derive: () => `${module3.salute()} - called from module 2`,
});
