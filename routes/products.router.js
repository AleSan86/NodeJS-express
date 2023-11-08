import express from 'express';
import { ProductsController } from '../controllers/productos.controller.js';

export const productsRouter = express.Router();
const productsController = new ProductsController()

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', productsController.createOne);
productsRouter.delete('/:id', productsController.deleteOne);
productsRouter.put('/:id', productsController.updateOne);
