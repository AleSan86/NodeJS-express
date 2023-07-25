import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';
import { UserService } from '../services/users.services.js';

export const usersRouter = express.Router();

const Service = new UserService();

usersRouter.get('/', async (req, res) => {
    const { page, limit } = req.query;
  try {
    const dataUsers = await Service.getAll(page, limit);
   //  console.log(dataUsers);
    return res.status(200).json({
     status: 'Success',
     payload: dataUsers.docs,
     totalPages:dataUsers.totalPages,
     prevPages:dataUsers.prevPage,
     nextPages:dataUsers.nextPage,
     page:dataUsers.page,
     hasPrevPage:dataUsers. hasPrevPage,
     hasNextPage:dataUsers.hasNextPage,
     prevLink:dataUsers.hasPrevPage?`http://localhost:8080/dataUsers/?page=${dataUsers.prevPage} ` : null,
     nextLink:dataUsers.hasNextPage?`http://localhost:8080/dataUsers/?page=${dataUsers.nextPage} `: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      msg: 'Error obteniendo usuarios',
      data: {},
    });
  }
});

usersRouter.get('/:id', async (req, res) => {
try {
  const { id } = req.params;
  const user= await Service.getById(id)
  return user? 
  res.status(200).json({
    status: 'Success',
    msg: 'Usuario obtenido con éxito',
    data: user,
  }):
   res.status(200).json({
    status: 'Error',
    msg: 'Usuario no encontrado',                                                             
    data: user,
  })
} catch (e) {
  console.log(e);
  return res.status(500).json({
    status: 'Error',
    msg: 'Error al obtener usuario',
    data: {},
  });
}
})

usersRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, age, password } = req.body;
    const userCreated = await Service.createOne(firstName, lastName, email, age, password);
    return res.status(201).json({
      status: 'Success',
      msg: 'Usuario creado',
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      msg: 'Error al insertar usuario',
      data: {},
    });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Service.deletedOne(id)
    return res.status(200).json({
      status: 'Success',
      msg: 'Usuario eliminado correctamente',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      msg: 'Error el eliminar el usuario',
      data: {},
    });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, age, password } = req.body;

    await Service.updateOne(firstName, lastName, email, age, password)
    return res.status(201).json({
      status: 'Success',
      msg: 'Usuario editado con éxito',
      data: {firstName, lastName, email, age},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'Error',
      msg: 'Error el actualizar el usuario',
      data: {},
    });
  }
});