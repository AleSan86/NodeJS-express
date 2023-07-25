import { ProductModel } from '../DAO/models/products.model.js';

export class ProductService {
  validateProduct(name, marca, description, price) {
    if (!name || !marca || !description || !price) {
      console.log('Error: Complete todos los datos.');
      throw new Error('Error: Complete todos los datos.');
    }
  }

  async getAll( page, limit ) {
    const products = await ProductModel.paginate({}, { limit:limit || 5, page: page || 1 });
    return products;
  }

  async getById(_id) {
    const product = await ProductModel.findOne({ _id: _id });
    return product;
  }

  async createOne(name, marca, description, price) {
    this.validateProduct(name, marca, description, price);
    const productCreated = await ProductModel.create({ name, marca, description, price});
    return productCreated;
  }

  async deletedOne(_id) {
    const deleted = await ProductModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, name, marca, description, price) {
    if (!_id) throw new Error('_id inválido');
    this.validateProduct(name, marca, description, price);
    const productUptaded = await ProductModel.updateOne({ _id: _id }, { name, marca, description, price });
    return productUptaded;
  }
}
