import { Router } from 'express';

export default (userController) => {
  const router = Router();

  router.get('/', userController.salute);
  router.get('/echo', userController.echo);

  return router;
};
