import express from 'express';
import { ProductModel } from '../DAO/models/products.model.js';
import { ProductService } from '../services/products.services.js';

export const productsRouter = express.Router();

const Service = new ProductService();

productsRouter.get('/', async (req, res) => {
    const { page, limit } = req.query;
  try {
    const dataProducts = await Service.getAll(page, limit);
   //  console.log(dataProducts);
    return res.status(200).json({
     status: 'Success',
     payload: dataProducts.docs,
     totalPages:dataProducts.totalPages,
     prevPages:dataProducts.prevPage,
     nextPages:dataProducts.nextPage,
     page:dataProducts.page,
     hasPrevPage:dataProducts. hasPrevPage,
     hasNextPage:dataProducts.hasNextPage,
     prevLink:dataProducts.hasPrevPage?`http://localhost:8080/dataProducts/?page=${dataProducts.prevPage} ` : null,
     nextLink:dataProducts.hasNextPage?`http://localhost:8080/dataProducts/?page=${dataProducts.nextPage} `: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      msg: 'Error obteniendo los productos',
      data: {},
    });
  }
});

productsRouter.get('/:id', async (req, res) => {
try {
  const { id } = req.params;
  const product= await Service.getById(id)
  return product? 
  res.status(200).json({
    status: 'Success',
    msg: 'Producto obtenido con éxito',
    data: product,
  }):
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
})

productsRouter.post('/', async (req, res) => {
  try {
    const { name, marca, description, price } = req.body;
    const productCreated = await Service.createOne(name, marca, description, price);
    return res.status(201).json({
      status: 'Success',
      msg: 'Producto creado',
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
});

productsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Service.deletedOne(id)
    return res.status(200).json({
      status: 'Success',
      msg: 'Producto eliminado correctamente',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      msg: 'Error el eliminar el producto',
      data: {},
    });
  }
});

productsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {name, marca, description, price } = req.body;

    await Service.updateOne(id, name, marca, description, price)
    return res.status(201).json({
      status: 'Success',
      msg: 'Producto editado con éxito',
      data: {name, marca, description, price},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      msg: 'Error el actualizar el producto',
      data: {},
    });
  }
});