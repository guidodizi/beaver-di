import beaver from '../../src';
import user from './api/user';
import userController from './api/user/user.controller';
import userService from './api/user/user.service';

export default beaver({
  userController,
  userService,
  user,
  greeting: 'hello world',
});
