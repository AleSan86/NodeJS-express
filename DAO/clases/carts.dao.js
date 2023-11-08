import { CartModel } from "../models/carts.model.js";

export default class CartClass{

    constructor() { 
        console.log("Working carts Ok");
      }

    async getCart(params){
        return CartModel.find(params)
    }

    async getAll(page, limit) {
        const carts = await CartModel.paginate({}, { limit:limit || 5, page: page || 1 });
        return carts;
    }

    async getById(_id) {
        const cart = await CartModel.findOne({_id: _id});
        return cart;
    }

    async createOne(cart){
        let newCart = await CartModel.create(cart)
        return newCart;
    }

    async findPopulatedOne(id){
        let cart = await CartModel.findOne({_id: id}).populate('products.idProduct')
        return cart;
    }

    async updateCart(id){
        await CartModel.updateOne({_id: id}, {products: []});
    }

    async updateProducts(id, products){
        const updated = await CartModel.updateOne({_id: id}, {products});
        return updated;
    }

    async deleteProductFromCart(cid, productoEliminado){
        // const updated = await CartModel.updateOne({_id: cid}, {_id: pid});
        // return updated;
        const cart = await cartsModel.findOneAndUpdate(
            { _id: cid, "products.product": productoEliminado._id },
            {
              $inc: { "products.$.quantity": -1 },
            }
          );
      
          let findIndexArray = cart.products.findIndex(
            (product) => product.product.toString() === pid
          );
      
          if (cart.products[findIndexArray].quantity <= 1) {
            await cartsModel.findByIdAndUpdate(cid, {
              $pull: { products: { product: productoEliminado._id } },
            });
          }
      
        return cart;
    }

    async deleteCart(_id) {
        const deleted = await CartModel.deleteOne({_id: _id});
        return deleted;
    }

}