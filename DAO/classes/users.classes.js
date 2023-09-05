import { UserModel } from "../models/users.model.js";

export class UserClass {

  async paginate(customA, customB){
    let paginated = await UserModel.paginate(customA, customB);
    return paginated;
  }

  async getAll(page, limit, sort, query) {
    // const users = await UserModel.paginate({}, { limit:limit || 5, page: page || 1 });
    // return users;
    const options = {page: page || 1, limit: limit || 4,sort: sort || "asc"};
    const queryOptions = {};
    if(query){queryOptions.$text = {$search: query}};
    if(sort){options.sort = {price: sort}};
    let queryResult = await UserModel.paginate(queryOptions,options);

    return queryResult;
  }

  async getById(_id) {
    const user = await UserModel.findOne({ _id: _id });
    return user;
  }

  async createOne(user) {
    const newUser = await UserModel.createOne(user);
    return newUser;
  }

  async deletedOne(id) {
    const deleted = await UserModel.deleteOne({ _id: id });
    return deleted;
  }

  async findOne(id){
    const user = await UserModel.findOne({ _id: id});
    return user;
  }

  async updateOne(id, user) {
    const userUptaded = await UserModel.updateOne({ _id: id }, { 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      password: user.password,
      cart: user.cart,
      role: user.role
    });
    return userUptaded;
  }

  // async getAll( page, limit ) {
  //   const users = await UserModel.paginate({}, { limit:limit || 5, page: page || 1 });
  //   return users;
  // }

  // async getById(_id) {
  //   const user = await UserModel.findOne({ _id: _id });
  //   return user;
  // }

  // async createOne(firstName, lastName, email, age, password, cart, role) {
  //   const userCreated = await UserModel.create({ firstName, lastName, email, age, password, cart, role});
  //   return userCreated;
  // }

  // async deletedOne(_id) {
  //   const deleted = await UserModel.deleteOne({ _id: _id });
  //   return deleted;
  // }

  // async updateOne(_id, firstName, lastName, email, age, password, cart, role) {
  //   const userUptaded = await UserModel.updateOne({ _id: _id }, { firstName, lastName, email, age, password, cart, role });
  //   return userUptaded;
  // }
}