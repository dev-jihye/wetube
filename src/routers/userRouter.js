import express from 'express';
import {
  see,
  logout,
  edit,
  remove,
  startGithubLogin,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/:id', see);
userRouter.get('/logout', logout);
userRouter.get('/edit', edit);
userRouter.get('/remove', remove);
userRouter.get('/github/start', startGithubLogin);

export default userRouter;
