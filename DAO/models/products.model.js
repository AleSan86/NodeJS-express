import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    max: 100,
  },
  marca: {
    type: String,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    max: 100,
  },
  price: {
    type: Number,
    required: true,
  }
});

schema.plugin(monsoosePaginate);
export const ProductModel = model('products', schema);