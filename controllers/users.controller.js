import { userService } from '../services/repository/implementation.js';
import { authorization } from '../middlewares/auth.js';

export class UsersController {

    getAll = async (req, res) => {
    const { page, limit } = req.query;
    try {
        const dataUsers = await userService.getAll(page, limit);
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
        return res.status(500).json({
        status: 'Error',
        msg: 'Error obteniendo usuarios',
        data: e.message,
        });
        }
    }

    getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getById(id)

        return user?
        res.status(200).json({
            status: 'Success',
            msg: 'Usuario obtenido con éxito.',
            data: user,
        })  :
        res.status(400).json({
            status: 'Not Found',
            msg: 'Usuario no encontrado con el ID proporcionado.',                                                             
            data: "Revise su ID: " + id,
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'Error desconocido al obtener usuario.',
            data: e.message,
        });
        }
    };

    createOne = async (req, res) => {
    try {
        const user = req.body;
        const userCreated = await userService.createUser(user);
        return res.status(201).json({
        status: 'Success',
        msg: 'Usuario creado con éxito.',
        data: userCreated,
        });
    } catch (e) {
        return res.status(500).json({
        status: 'Error',
        msg: 'Error al insertar usuario.',
        data: e.message,
        });
        }
    };

    deleteOne = async (req, res) => {
    //Recuperar información de usuario con rol Admin para este método
    //if(!!req.session.user && req.session.user.role == isAdmin)
    try {
        const { id } = req.params;
        const validar = await userService.getById(id);

        if(!validar)
        {
            return res.status(404).json({
            status: 'Not found',
            msg: 'No se encontró ningún usuario con el id indicado.',
            });
        } else {
            const deleted = await userService.deleteUser(id);
            return res.status(200).json({
                status: 'Success',
                msg: 'Usuario eliminado correctamente.',
                data: deleted,
            });
        }
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            msg: 'Error el eliminar el usuario.',
            data: e.message,
            });
        }
    }

    updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const validar = await userService.getById(id);

        if(!validar)
        {
          return res.status(404).json({
            status: 'Not found',
            msg: 'No se encontró ningún usuario con el id indicado.',
          });
        } else {
            const userUpdated = await userService.updateUser(id, user)
            return res.status(201).json({
            status: 'Success',
            msg: 'Usuario editado con éxito.',
            data: userUpdated,
            });
        }
    } catch (e) {
        return res.status(500).json({
        status: 'Error',
        msg: 'Error al intentar actualizar el usuario.',
        data: e.message,
        });
    }
    };

}