import express from 'express';
import { UserService } from '../services/users.services.js';
const Service = new UserService();

export const usersViewRouter = express.Router();
usersViewRouter.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const dataUsers = await Service.getAll(page, limit);
  
  // console.log(dataUsers)

 let usuarios = dataUsers.docs.map((item) => {
    return { firstName: item.firstName, lastName: item.lastName, email: item.email, gender: item.gender };
  });

  const { docs, ...rest } = dataUsers;
  let links = [];

  for (let i = 1; i < rest.totalPages + 1; i++) {
    links.push({ label: i, href: 'http://localhost:8080/users/?page=' + i });
  }
  // console.log(links);
  return res.status(200).render('usuarios', { usuarios, pagination: rest, links });
});
