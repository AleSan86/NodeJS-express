import { productService } from '../services/repository/implementation.js';

export class ProductsController {

  getAll = async (req, res) => {
    const { page, limit } = req.query;
    try {
      const dataProducts = await productService.getAll(page, limit);
      return res.status(200).json({
        status: 'Success',
        payload: dataProducts.docs,
        totalPages: dataProducts.totalPages,
        prevPages: dataProducts.prevPage,
        nextPages: dataProducts.nextPage,
        page: dataProducts.page,
        hasPrevPage: dataProducts.hasPrevPage,
        hasNextPage: dataProducts.hasNextPage,
        prevLink: dataProducts.hasPrevPage ? `http://localhost:8080/dataProducts/?page=${dataProducts.prevPage} ` : null,
        nextLink: dataProducts.hasNextPage ? `http://localhost:8080/dataProducts/?page=${dataProducts.nextPage} ` : null,
      });
    } catch (e) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Error obteniendo los productos',
        data: e.message,
      });
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productService.getById(id)
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
        data: e.message,
      });
    }
  }

  createOne = async (req, res) => {
    try {
      const product = req.body;
      const validarCodigo = await productService.getByCode(product.code);

      if(!!validarCodigo && product.code === validarCodigo.code)
      {
        return res.status(409).json({
          status: 'Error',
          msg: 'Ya existe un código con el mismo valor. Debe ingresar otro distinto.',
          data: validarCodigo,
        })
      } else {
        const productCreated = await productService.createProduct(product);
        return res.status(201).json({
          status: 'Success',
          msg: 'Producto creado con éxito',
          data: productCreated,
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Error al crear el producto',
        data: e.message,
      });
    }
  };

  deleteOne = async (req, res) => {
    try {
      const { id } = req.params;
      const validar = await productService.getById(id);

      if(!validar)
      {
        return res.status(404).json({
          status: 'Not found',
          msg: 'No se encontró un producto con el id indicado.',
        });
      } else {
        const deleted = await productService.deleteProduct(id)
        return res.status(200).json({
          status: 'Success',
          msg: 'Producto eliminado correctamente',
          data: deleted,
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Error el eliminar el producto',
        data: e.message,
      });
    }
  };
  
  updateOne = async (req, res) => {
    try {
      const { id } = req.params;
      const product = req.body;

      await productService.updateProduct(id, product)
      return res.status(201).json({
        status: 'Success',
        msg: 'Producto editado con éxito',
        data: { product },
      });
    } catch (e) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Error el actualizar el producto',
        data: e,
      });
    }
  }

}