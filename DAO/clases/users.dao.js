import { UserModel } from "../models/users.model.js";

export default class UserServiceDao {

  constructor() { 
    console.log("Working users Ok");
  }

  async getUser (params) {
    return UserModel.find(params);
  }

  async getAll( page, limit ) {
    const users = await UserModel.paginate({}, { limit:limit || 5, page: page || 1 });
    return users;
  }

  async getBy (params) {
    let result = await UserModel.findOne(params).populate('users').lean();
    return result;
  };

  async getById(_id) {
    const user = await UserModel.findOne({_id: _id});
    return user;
  }

  async findByUsername (username) {
    const result = await UserModel.findOne({email: username});
    return result;
  };

  async createOne(user) {
    const userCreated = await UserModel.create(user);
    return userCreated;
  }

  async deleteUser(_id) {
    const deleted = await UserModel.deleteOne({_id: _id});
    return deleted;
  }

  async updateUser(_id, user) {
    const userUptaded = await UserModel.updateOne({_id: _id}, {$set:user});
    return userUptaded;
  }
  
}