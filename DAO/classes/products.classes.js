import { ProductModel } from "../models/products.model.js";

export class ProductClass {

  async paginate(customA, customB){
    let paginated = await ProductModel.paginate(customA, customB);
    return paginated;
  }

  async getAll(page, limit, sort, query) {
    // const products = await ProductModel.paginate({}, { limit:limit || 5, page: page || 1 });
    // return products;
    const options = {page: page || 1, limit: limit || 4, sort: sort || "asc"};
    const queryOptions = {};
    if(query){queryOptions.$text = {$search: query}};
    if(sort){options.sort = {price: sort}};
    let queryResult = await ProductModel.paginate(queryOptions, options);

    return queryResult;
  }

  async getById(_id) {
    const product = await ProductModel.findOne({ _id: _id });
    return product;
  }

  async createOne(product) {
    const newProduct = await ProductModel.createOne(product);
    return newProduct;
  }

  async deletedOne(id) {
    const deleted = await ProductModel.deleteOne({ _id: id });
    return deleted;
  }

  async findOne(id){
    const product = await ProductModel.findOne({ _id: id});
    return product;
  }

  async updateOne(id, product) {
    const productUptaded = await ProductModel.updateOne({ _id: id }, { 
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
      category: product.category,
      status: true
    });
    return productUptaded;
  }

  async updateOneStock(id, product){
    const stockUptaded = await ProductModel.updateOne({_id: id},  {stock: product,});
    return stockUptaded;
  }

}