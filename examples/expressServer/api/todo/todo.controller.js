export default (todoService) => {
  const getAll = (req, res) => {
    const result = todoService.getAll();

    return res.status(200).json(result);
  };

  const get = (req, res) => {
    const result = todoService.getById(req.params.id);

    return res.status(200).json(result);
  };

  const create = (req, res) => {
    const result = todoService.create(req.body);

    return res.status(200).json(result);
  };

  const deleteTodo = (req, res) => {
    const result = todoService.delete(req.params.id);

    return res.status(200).json(result);
  };

  return {
    getAll,
    get,
    create,
    delete: deleteTodo,
  };
};
