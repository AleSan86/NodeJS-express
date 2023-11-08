import express from 'express';
import { CartsController } from '../controllers/carts.controller.js';

export const cartsRouter = express.Router();
const cartsController = new CartsController()

cartsRouter.get('/', cartsController.getAll);
cartsRouter.get('/:id', cartsController.getCartById);
cartsRouter.post('/', cartsController.createCart);
cartsRouter.delete('/:cid', cartsController.deleteCart);
cartsRouter.put('/:id', cartsController.updateCart);
cartsRouter.post('/:cid', cartsController.addProductToCart);
cartsRouter.delete('/:cid/:pid', cartsController.deleteProductFromCart);

//Todo
cartsRouter.get('/', cartsController.updateQuantity);
cartsRouter.get('/:id', cartsController.purchase);
cartsRouter.post('/', cartsController.getPurchase);
cartsRouter.delete('/:id', cartsController.deletePurchase);