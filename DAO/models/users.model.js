import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  firstName: {type: String, required: true, max: 100,},
  lastName: {type: String, required: true, max: 100,},
  email: {type: String, max: 100, unique: true,},
  age: {type: Number,},
  password: {type: String, max: 100,},
  cart: [{default: {type: Schema.Types.ObjectId, ref: 'carts'}}],
  role: {type: String, default: 'user',},
});

//ALTERNATIVA PARA IMPLEMENTAR BCRYPT
// schema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

schema.plugin(monsoosePaginate);
export const UserModel = model('users', schema);