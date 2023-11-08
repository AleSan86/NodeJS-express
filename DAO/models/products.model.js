import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true, max: 100000000 },
  thumbnail: { type: String, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: Number, required: true, max: 200000000 },
  status: { type: Boolean },
  category: { type: String, required: true, max: 100 }
});

schema.plugin(monsoosePaginate);
export const ProductModel = model('products', schema);