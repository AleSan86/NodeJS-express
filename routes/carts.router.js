import express from 'express';
import { CartModel } from '../DAO/models/products.model.js';
// import { CartService } from '../services/products.services.js';

export const cartsRouter = express.Router();

//const Service = new CartService();

cartsRouter.post("/cart", async (req, res) => {
    const { productId, name, marca, description, price } = req.body;
  
    //TODO: the logged in user id
    const userId = "5de7ffa74fff640a0491bc4f";
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, name, marca, description, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, name, marca, description, price }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Algo salió mal");
    }
  });