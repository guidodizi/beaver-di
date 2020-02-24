export default (module4) => ({
  salute: () => "I'm module 3",
  derive: () => `${module4.salute()} - called from module 3`,
});
