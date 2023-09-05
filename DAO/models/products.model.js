import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true, max: 100000000 },
  thumbnail: { type: String, required: false, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: Number, required: true, max: 200000000 },
  status: {type: Boolean},
  category: { type: String, required: true, max: 100 }
}, { versionKey: false });

schema.plugin(monsoosePaginate);
export const ProductModel = model('products', schema);