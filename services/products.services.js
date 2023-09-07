import { ProductMethods } from '../DAO/factory.js';

export class ProductService {

  validateProduct(title, description, price, thumbnail, code, stock, category) {
    try {
      if (!code || !title || !description || !price || !thumbnail || !stock || !category) {
      console.log('Error: Complete todos los datos.');
      throw new Error('Error: Complete todos los datos.');
      }
    } catch (error) {
    console.log(error)
    throw new Error(error.message);
    }
  }

  // async getAll() {
  //   const products = await ProductMethods.getAll(page, limit);
  //   return products;
  // }

  async getAll(page, limit, sort, query) {
    try {
      const queryResult = await ProductMethods.getAll(page, limit, sort, query)
      const {docs, ...rest } = queryResult;
      let products = docs.map((doc)=>{
        console.log(products);
        return {
            title: doc.title,
            description: doc.description,
            price: doc.price,
            stock: doc.stock,
            category: doc.category,
            thumbnail: doc.thumbnail,
            id: doc._id.toString()
          }
      })
      let prevPage = rest.prevPage
      let prevLink = prevPage ? `/products?page=${prevPage}` : null;
      let nextPage = rest.nextPage
      let nextLink = nextPage ? `/products?page=${nextPage}` : null;
      let links = {prevLink: prevLink, nextLink: nextLink}
      const data = {products: products, pagination: rest, links: links}
      return data;
    } catch (error) {
        throw new Error(error.message);
    }
  }

  async getById(_id) {
    try {
      console.log(_id, product);
      const product = await ProductMethods.find(_id );
      return product;
    } catch (error) {
      console.log(_id, product);
      throw new Error(error.message);
    }
  }

  async createOne(product) {
    try {
      await this.productValidation(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category);
      let customA = {}
      let customB = {limit: 40}
      const query = await ProductMethods.paginate(customA,customB);
      const { docs, ...rest } = query;
      let products = docs.map((doc) => {
        return { _id: doc._id, title: doc.title, thumbnail: doc.thumbnail, price: doc.price, stock: doc.stock };
      });
      let checkCode = products.find((pCode) => pCode.code === product.code);
        if (checkCode) {
            throw new Error('Ya existe un producto con dicho código');
        }
        const newProduct = await ProductMethods.create({
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
          code: product.code,
          stock: product.stock,
          status: true,
          category: product.category,
      });
      console.log(`Producto ${product.title} creado con éxito`);
      return newProduct;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
  }

  async deletedOne(_id) {
    try {
      const deletedProduct = await ProductMethods.deleteProduct(_id);
      console.log(`El producto: ${_id} fué eliminado`);
      return deletedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
  }

  async updateOne(_id, product) {
    try {
      if (!_id) throw new Error(`No existe un producto para el id: ${_id}`);
      const updatedProduct = await ProductMethods.updateOne(_id, product);
      console.log(`Producto: ${_id} actualizado correctamente`);
      return updatedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
  }

  async updateStockProduct(_id, product) {
    try {
      if (!_id) throw new Error(`No existe un producto para  el id: ${_id}`);
      const updatedProduct = await ProductMethods.updateOne(_id, {stock:product});
      console.log(`El stock del producto: ${_id} actualizado`);
      return updatedProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductData(page){
    let customA = {}
    let customB = { page: page || 1, limit: 8 }
    const query = await ProductMethods.paginate(customA, customB);
    return query
  }

  async getArrProductsData(arr) {
    const productsData = [];
    for (const id of arr) {
      const product = await this.getProductById(id);
      productsData.push(product);
    }
    return productsData;
  }

}
