import express from 'express';
import { userService } from '../services/repository/implementation.js';

export const usersViewRouter = express.Router();

usersViewRouter.get('/', async (req, res) => {

  const { page, limit } = req.query;
  const dataUsers = await userService.getAll(page, limit);
  
  let usuarios = dataUsers.docs.map((item) => {
    return { firstName: item.firstName, lastName: item.lastName, email: item.email };
  });

  const { docs, ...rest } = dataUsers;
  let links = [];

  for (let i = 1; i < rest.totalPages + 1; i++) {
    links.push({ label: i, href: 'http://localhost:8080/users/?page=' + i });
  }

  return res.status(200).render('usuarios', { usuarios, pagination: rest, links });
});
