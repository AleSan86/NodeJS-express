import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { passportCall } from '../utils.js';

export const usersRouter = express.Router();
const usersController = new UsersController()

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:id', usersController.getById);
usersRouter.post('/', usersController.createOne);
usersRouter.delete('/:id', usersController.deleteOne);
usersRouter.put('/:id', usersController.updateOne);