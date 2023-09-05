import { UserMethods } from '../DAO/factory.js';

export class UserService {

  validateUser(firstName, lastName, email, age, password) {
    try {
    if (!firstName || !lastName || !email || !age ||!password) {
      console.log('Error: Complete los campos obligatorios.');
      throw new Error('Error: Complete los campos obligatorios.');
      }
    } catch (error) {
      console.log(error)
      throw new Error(error.message);
    }
  }

  async getAll( page, limit ) {
    const users = await UserMethods.getAll(page, limit);
    return users;
  }

  // async getAll(page, limit, sort, query) {
  //   try {
  //     const queryResult = await UserMethods.getAll(page, limit, sort, query)
  //     const {docs, ...rest } = queryResult;
  //     let users = docs.map((doc)=>{
  //       return {
  //           firstName: doc.firstName,
  //           lastName: doc.lastName,
  //           age: doc.age,
  //           email: doc.email,
  //           id: doc._id.toString()
  //         }
  //     })
  //     let prevPage = rest.prevPage
  //     let prevLink = prevPage ? `/users?page=${prevPage}` : null;
  //     let nextPage = rest.nextPage
  //     let nextLink = nextPage ? `/users?page=${nextPage}` : null;
  //     let links = {prevLink: prevLink, nextLink: nextLink}
  //     const data = {users: users, pagination: rest, links: links}
  //     return data;
  //   } catch (error) {
  //       throw new Error(error.message);
  //   }
  // }

  async getById(_id) {
    try {
    const user = await UserMethods.findOne(_id);
    return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createOne(user) {
    try {
      await this.userValidation(user.firstName, user.lastName, user.age, user.email, user.password, user.cart, user.role);
      let customA = {}
      let customB = {limit: 40}
      const query = await UserMethods.paginate(customA,customB);
      const { docs, ...rest } = query;
      let users = docs.map((doc) => {
        return { _id: doc._id, firstName: doc.firstName, lastName: doc.lastName, age: doc.age, email: doc.email };
      });

      const newUser = await UserMethods.create({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        code: user.code,
        password: user.password,
        role: user.role,
      });
      console.log(`Usuario ${user.email} creado con éxito`);
      return newUser;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
  }

  async deletedOne(_id) {
    try {
      const deleted = await UserMethods.deleteOne(_id);
      return deleted;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateOne(_id, user) {
    try {
      if (!_id) throw new Error(`No existe un usuario con el id informado: ${_id}`);
      const userUptaded = await UserMethods.updateOne(_id, user);
      console.log(`Usuario: ${user.email} actualizado correctamente`);
      return userUptaded;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async updateOne(_id, firstName, lastName, email, age, password, cart, role) {
  //   if (!_id) throw new Error('_id invalido');
  //   this.validateUser(firstName, lastName, email);
  //   const userUptaded = await UserMethods.updateOne(_id, firstName, lastName, email, age, password, cart, role);
  //   return userUptaded;
  // }
  
  // async getAll( page, limit ) {
  //   const users = await UserMethods.getAll(page, limit);
  //   return users;
  // }

  //  async createOne(firstName, lastName, email, age, password, cart, role) {
  //   this.validateUser(firstName, lastName, email, age, password);
  //   const userCreated = await UserMethods.createOne(firstName, lastName, email, age, password, cart, role);
  //   return userCreated;
  // }

}
