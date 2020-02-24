import beaver from './beaver.config';

export default (app) => {
  const todo = beaver.get('todo');
  app.use('/api/todo', todo);
};
