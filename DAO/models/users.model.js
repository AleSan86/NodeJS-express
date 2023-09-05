import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  firstName: {type: String, required: true, max: 100,},
  lastName: {type: String, required: true,max: 100,},
  email: {type: String, required: true, max: 100, unique: true,},
  age: {type: Number,},
  password:{type: [String, null], max: 100,},
  cart:{type: String, required: false},
  role: {type: String, default: 'user',},
  }, {versionKey: false}
);

// Método alternativo para Hashear password

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