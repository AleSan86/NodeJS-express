import { ProductModel } from "../models/products.model.js";

export default class ProductServiceDao {

  constructor() { 
    console.log("Working products Ok");
  }
  
  async getAll( page, limit ) {
    const products = await ProductModel.paginate({}, { limit:limit || 5, page: page || 1 });
    return products;
  }

  async getById(_id) {
    const product = await ProductModel.findOne({_id: _id});
    return product;
  }

  async getByCode(code) {
    const productFound = await ProductModel.findOne({code: code});
    return productFound;
  }

  async createOne(product) {
    const productCreated = await ProductModel.create(product);
    return productCreated;
  }

  async deleteOne(_id) {
    const deleted = await ProductModel.deleteOne({_id: _id});
    return deleted;
  }

  async updateProduct(_id, product) {
    const productUptaded = await ProductModel.updateOne({ _id: _id }, {$set:product});
    return productUptaded;
  }
}