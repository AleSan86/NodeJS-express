import { UserModel } from '../DAO/models/users.model.js';

export class UserService {
  validateUser(firstName, lastName, email, password) {
    if (!firstName || !lastName || !email || !password) {
      console.log('Error: Complete los campos obligatorios.');
      throw new Error('Error: Complete los campos obligatorios.');
    }
  }

  async getAll( page, limit ) {
    const users = await UserModel.paginate({}, { limit:limit || 5, page: page || 1 });
    return users;
  }

  async getById(_id) {
    const user = await UserModel.findOne({ _id: _id });
    return user;
  }

  async createOne(firstName, lastName, email, age, password, cart, role) {
    this.validateUser(firstName, lastName, email, age, password);
    const userCreated = await UserModel.create({ firstName, lastName, email, age, password, cart, role});
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, firstName, lastName, email, age, password, cart, role) {
    if (!_id) throw new Error('_id invalido');
    this.validateUser(firstName, lastName, email);
    const userUptaded = await UserModel.updateOne({ _id: _id }, { firstName, lastName, email, age, password, cart, role });
    return userUptaded;
  }
}
