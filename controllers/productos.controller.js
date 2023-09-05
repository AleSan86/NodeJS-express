import { ProductDTO } from '../DAO/DTO/product.dto.js'
import { ProductService } from '../services/products.services.js';

const Service = new ProductService();

export class ProductsController {

  async getAll(req, res) {
    try {
      let {limit = 4, page = 1, query, sort} = req.query
      if(sort && (sort !== 'asc' && sort !== 'desc')){
        sort = ''
      } 
      let products = await Service.getAll(page, limit, sort, query)
      res.status(200).json({
        status: "success",
        message: 'Lista de productos',
        payload: products
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message
      })
    }
  }

  // getAll = async (req, res) => {
  //   const { page, limit } = req.query;
  //   try {
  //     const dataProducts = await Service.getAll(page, limit);
  //     //console.log(dataProducts);
  //     return res.status(200).json({
  //       status: 'Success desde el CONTROLADOR',
  //       payload: dataProducts.docs,
  //       totalPages: dataProducts.totalPages,
  //       prevPages: dataProducts.prevPage,
  //       nextPages: dataProducts.nextPage,
  //       page: dataProducts.page,
  //       hasPrevPage: dataProducts.hasPrevPage,
  //       hasNextPage: dataProducts.hasNextPage,
  //       prevLink: dataProducts.hasPrevPage ? `http://localhost:8080/dataProducts/?page=${dataProducts.prevPage} ` : null,
  //       nextLink: dataProducts.hasNextPage ? `http://localhost:8080/dataProducts/?page=${dataProducts.nextPage} ` : null,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({
  //       status: 'Error',
  //       msg: 'Error obteniendo los productos',
  //       data: {},
  //     });
  //   }
  // }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const product = await Service.getById(id)
      return product ?
        res.status(200).json({
          status: 'Success',
          msg: 'Producto obtenido con éxito',
          data: product,
        }) :
        res.status(200).json({
          status: 'Error',
          msg: 'Producto no encontrado',
          data: product,
        })
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error al obtener el producto',
        data: {},
      });
    }
  }

  async createOne(req, res) {
    try {
      const product = req.body;
      const productToAdd = new ProductDTO(product)
      const productCreated = await Service.createOne(productToAdd);
      return res.status(201).json({
        status: 'Success',
        msg: 'Producto creado con éxito',
        data: productCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error al crear el producto',
        data: {},
      });
    }
  };

  async deletedOne(req, res) {
    try {
      const id = req.params.id;
      const product = await Service.deletedOne(id)
      return res.status(200).json({
        status: 'Success',
        msg: 'Producto eliminado correctamente',
        data: product,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error el eliminar el producto',
        data: {},
      });
    }
  };

  async updateOne(req, res){
    try {
      const id = req.params.id;
      const productByUser = req.body
      const product = await Service.updateOne(id, productByUser);
      return res.status(201).json({
        status: 'Success',
        msg: `Producto editado con éxito, con id: ${id}`,
        data: product,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error el actualizar el producto',
        data: {},
      });
    }
  }

  // updateOne = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name, marca, description, price } = req.body;

  //     await Service.updateOne(id, name, marca, description, price)
  //     return res.status(201).json({
  //       status: 'Success',
  //       msg: 'Producto editado con éxito',
  //       data: { name, marca, description, price },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({
  //       status: 'Error',
  //       msg: 'Error el actualizar el producto',
  //       data: {},
  //     });
  //   }
  // }

    //   getAll = async (req, res) => {
    //   const { page, limit } = req.query;
    //   try {
    //     const dataProducts = await Service.getAll(page, limit);
    //     //console.log(dataProducts);
    //     return res.status(200).json({
    //       status: 'Success desde el CONTROLADOR',
    //       payload: dataProducts.docs,
    //       totalPages: dataProducts.totalPages,
    //       prevPages: dataProducts.prevPage,
    //       nextPages: dataProducts.nextPage,
    //       page: dataProducts.page,
    //       hasPrevPage: dataProducts.hasPrevPage,
    //       hasNextPage: dataProducts.hasNextPage,
    //       prevLink: dataProducts.hasPrevPage ? `http://localhost:8080/dataProducts/?page=${dataProducts.prevPage} ` : null,
    //       nextLink: dataProducts.hasNextPage ? `http://localhost:8080/dataProducts/?page=${dataProducts.nextPage} ` : null,
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     return res.status(500).json({
    //       status: 'Error',
    //       msg: 'Error obteniendo los productos',
    //       data: {},
    //     });
    //   }
    // }

      //  async createOne(req, res) {
      //   try {
      //     const { name, marca, description, price } = req.body;
      //     const productCreated = await Service.createOne(name, marca, description, price);
      //     return res.status(201).json({
      //       status: 'Success',
      //       msg: 'Producto creado',
      //       data: productCreated,
      //     });
      //   } catch (e) {
      //     console.log(e);
      //     return res.status(500).json({
      //       status: 'Error',
      //       msg: 'Error al crear el producto',
      //       data: {},
      //     });
      //   }
      // };
}