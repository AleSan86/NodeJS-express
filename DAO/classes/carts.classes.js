import { CartModel } from "../models/carts.model.js";

export class CartClass {

  async getAll( page, limit ) {
    const carts = await CartModel.paginate({}, { limit:limit || 5, page: page || 1 });
    return carts;
  }

  async getById(id) {
    const cart = await CartModel.findOne({ _id: id });
    return cart;
  }

  async find(){
    let carts = await CartModel.find({})
    return carts;
  }

  async findOne(id){
    let cart = await CartModel.findOne({_id: id});
    return cart;
  }

  async createOne(cart) {
    const cartCreated = await CartModel.createOne(cart);
    return cartCreated;
  }

  async findPopulatedOne(id){
    let cart = await CartModel.findOne({_id: id}).populate('products.idProduct')
    return cart;
  }

  async deletedOne(id) {
    const deleted = await CartModel.deleteOne({ _id: id });
    return deleted;
  }

  async updateOne(id) {
    const cartUptaded = await CartModel.updateOne({ _id: id }, {products: []});
    return cartUptaded;
  }

  async updateProducts(id, products){
    await CartModel.updateOne({_id: id}, {products});
  }

}