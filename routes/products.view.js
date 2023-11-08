import express from 'express';
import { productService } from '../services/repository/implementation.js';

export const productsViewRouter = express.Router();

productsViewRouter.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const dataProducts = await productService.getAll(page, limit);

  let productos = dataProducts.docs.map((item) => {
    return { name: item.name, description: item.description, price: item.price };
  });

  const { docs, ...rest } = dataProducts;
  let links = [];

  for (let i = 1; i < rest.totalPages + 1; i++) {
    links.push({ label: i, href: 'http://localhost:8080/products/?page=' + i });
  }
  
  return res.status(200).render('productos', { productos, pagination: rest, links });
});
