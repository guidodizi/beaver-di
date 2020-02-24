export default (module1) => ({
  salute: () => "I'm module 4",
  derive: () => `${module1.salute()} - called from module 4`,
});
