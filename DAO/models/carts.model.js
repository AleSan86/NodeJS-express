import { Schema, model, mongoose } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'users'},
    product: {type: Schema.Types.ObjectId, ref: 'products', quantity: { type: Number, min: 1 } },
    modifiedOn: {type: Date, default: Date.now},
    active: {type: Boolean, default: true},
},
    { timestamps: true }
)

schema.pre('find', function(){
    this.populate('products.product')
})

schema.pre('findOne', function(){
    this.populate('products.product')
})

schema.pre('getCart', function(){
    this.populate('products.product')
})

schema.plugin(monsoosePaginate);
export const CartModel = model('carts', schema);