import express from 'express';
import { ProductService } from '../services/products.services.js';
const Service = new ProductService();

export const productsViewRouter = express.Router();

productsViewRouter.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const dataProducts = await Service.getAll(page, limit);

 let productos = dataProducts.docs.map((item) => {
    return { name: item.name, description: item.description, price: item.price };
  });

  const { docs, ...rest } = dataProducts;
  let links = [];

  for (let i = 1; i < rest.totalPages + 1; i++) {
    links.push({ label: i, href: 'http://localhost:8080/products/?page=' + i });
  }
  // console.log(links);
  return res.status(200).render('productos', { productos, pagination: rest, links });
});
