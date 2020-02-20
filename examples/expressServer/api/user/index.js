import { Router } from 'express';

export default (userController) => {
  const router = Router();

  router.get('/', userController.salute);

  return router;
};
