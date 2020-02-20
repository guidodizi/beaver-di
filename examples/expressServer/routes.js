import beaver from './beaver.config';

export default (app) => {
  const user = beaver.get('user');
  app.use('/api/user', user);
};
