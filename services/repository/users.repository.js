export default class UsersRepository {

    constructor(dao) {
        this.dao = dao;
    }

    get = () => {
        return this.dao.getUser();
    }

    getAll = () =>{
        return this.dao.getAll();
    }

    getById = (id) => {
        return this.dao.getById(id);
    }

    getBy = (params) => {
        return this.dao.getBy(params);
    }

    createUser = (user) =>{
        return this.dao.createOne(user);
    }

    updateUser = (id,user) =>{
        return this.dao.updateUser(id,user);
    }

    findByUsername = async (username) => {
        return this.dao.findByUsername(username);
    };

    deleteUser = (id) => {
        return this.dao.deleteUser(id);
    }
};