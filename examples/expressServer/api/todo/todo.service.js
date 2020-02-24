import nanoid from 'nanoid';

export default (database) => {
  const { todos } = database;

  const getAll = () => Object.values(todos);

  const getById = (id) => {
    if (!todos[id]) {
      throw new Error('No todo found');
    }
    return todos[id];
  };

  const create = (todo) => {
    const id = nanoid();
    const newTodo = {
      id,
      ...todo,
    };

    todos[id] = newTodo;
    return newTodo;
  };

  const deleteTodo = (id) => {
    delete todos[id];
  };

  return {
    getAll,
    getById,
    create,
    delete: deleteTodo,
  };
};
