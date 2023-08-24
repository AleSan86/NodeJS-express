import express from 'express';
import { UsersController } from '../controllers/users.controller.js';

export const usersRouter = express.Router();
const usersController = new UsersController()

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/', usersController.createOne);
usersRouter.delete('/:id', usersController.deletedOne);
usersRouter.put('/:id', usersController.updateOne);

