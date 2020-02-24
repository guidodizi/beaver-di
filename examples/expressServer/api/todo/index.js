import { Router } from 'express';

export default (todoController) => {
  const router = Router();

  router.get('/', todoController.getAll);
  router.post('/', todoController.create);
  router.get('/:id', todoController.get);
  router.delete('/:id', todoController.delete);

  return router;
};
