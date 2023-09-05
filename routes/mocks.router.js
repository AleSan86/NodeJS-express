import express from 'express';
import { MocksController } from '../controllers/mocks.controller.js';

export const mocksRouter = express.Router();
const mocksController = new MocksController()

mocksRouter.get('/products', mocksController.getMockedProducts);
mocksRouter.get('/users', mocksController.getMockedUsers);

// router.get('/products', mockProducts)
// router.get('/users', mockUsers)