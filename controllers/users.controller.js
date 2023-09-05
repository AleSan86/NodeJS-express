import { UserDTO } from '../DAO/DTO/users.dto.js'
import { UserService } from '../services/users.services.js';

const Service = new UserService();

export class UsersController {

  async getAll(req, res) {
    try {
      let {limit = 4, page = 1, query, sort} = req.query
      if(sort && (sort !== 'asc' && sort !== 'desc')){
        sort = ''
      } 
      let users = await Service.getAll(page, limit, sort, query)
      res.status(200).json({
        status: "success",
        message: 'Lista de usuarios',
        payload: users
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message
      })
    }
  }
    
  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await Service.getById(id)
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
  }

  async createOne(req, res) {
    try {
      const user = req.body;
      const userToAdd = new UserDTO(user)
      const userCreated = await Service.createOne(userToAdd);
      return res.status(201).json({
        status: 'Success',
        msg: 'Usuario creado correctamente',
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
  };
    
  async deletedOne(req, res) {
    try {
      const id = req.params.id;
      const user = await Service.deletedOne(id)
      return res.status(200).json({
        status: 'Success',
        msg: 'Usuario eliminado correctamente',
        data: user,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
      status: 'Error',
      msg: 'Error el eliminar el usuario',
      data: {},
      });
    }
  }
    
  async updateOne(req, res){
    try {
      const id = req.params.id;
      const userUpdate = req.body
      const user = await Service.updateOne(id, userUpdate);
      return res.status(201).json({
        status: 'Success',
        msg: 'Usuario editado con éxito',
        data: user,
      });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
        status: 'Error',
        msg: 'Error el actualizar el usuario',
        data: {},
      });
    }
  }

    // getAll = async (req, res) => {
    //     const { page, limit } = req.query;
    //     try {
    //     const dataUsers = await Service.getAll(page, limit);
    //     //console.log(dataUsers);
    //     return res.status(200).json({
    //      status: 'Success',
    //      payload: dataUsers.docs,
    //      totalPages:dataUsers.totalPages,
    //      prevPages:dataUsers.prevPage,
    //      nextPages:dataUsers.nextPage,
    //      page:dataUsers.page,
    //      hasPrevPage:dataUsers. hasPrevPage,
    //      hasNextPage:dataUsers.hasNextPage,
    //      prevLink:dataUsers.hasPrevPage?`http://localhost:8080/dataUsers/?page=${dataUsers.prevPage} ` : null,
    //      nextLink:dataUsers.hasNextPage?`http://localhost:8080/dataUsers/?page=${dataUsers.nextPage} `: null,
    //     });
    //     } catch (e) {
    //         console.log(e);
    //         return res.status(500).json({
    //         status: 'Error',
    //         msg: 'Error obteniendo usuarios',
    //         data: {},
    //         });
    //     }
    // };

    // async createOne(req, res) {
  //   try {
  //     const { firstName, lastName, email, age, password } = req.body;
  //     const userCreated = await Service.createOne(firstName, lastName, email, age, password);
  //     return res.status(201).json({
  //       status: 'Success',
  //       msg: 'Usuario creado',
  //       data: userCreated,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({
  //     status: 'Error',
  //     msg: 'Error al insertar usuario',
  //     data: {},
  //     });
  //   }
  // };

  // async updateOne(req, res){
  //   try {
  //     const { id } = req.params;
  //     const { firstName, lastName, email, age, password } = req.body;
  //     await Service.updateOne(id, firstName, lastName, email, age, password)
  //     return res.status(201).json({
  //       status: 'Success',
  //       msg: 'Usuario editado con éxito',
  //       data: {firstName, lastName, email, age},
  //     });
  //   } catch (e) {
  //       console.log(e);
  //       return res.status(500).json({
  //       status: 'Error',
  //       msg: 'Error el actualizar el usuario',
  //       data: {},
  //     });
  //   }
  // }

}