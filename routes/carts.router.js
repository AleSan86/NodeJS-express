import express from 'express';
import { CartsController } from '../controllers/carts.controller.js';

export const cartsRouter = express.Router();
const cartsController = new CartsController()

cartsRouter.get('/', cartsController.getAll);
cartsRouter.get('/:id', cartsController.getById);
cartsRouter.post('/', cartsController.createOne);
cartsRouter.delete('/:id', cartsController.deletedOne);
cartsRouter.put('/:id', cartsController.updateOne);
//Para productos en el carrito
cartsRouter.post("/:cid/product/:pid", cartsController.addProductToCart)
cartsRouter.delete("/:cid/product/:pid", cartsController.deleteProductFromCart)
cartsRouter.put("/:cid/product/:pid", cartsController.updateQuantity)
//Para los tickets
cartsRouter.get('/:cid/purchase', cartsController.purchase)
cartsRouter.get('/:cid/purchases', cartsController.getPurchase)
cartsRouter.delete('/:cid/purchases', cartsController.deletePurchase)
