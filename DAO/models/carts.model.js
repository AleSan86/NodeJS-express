import { Schema, model, mongoose } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
        name: String,
        description: String,
        price: Number
        }
    ],
    modifiedOn: {
        type: Date,
        default: Date.now
    },
    // cart: {
    //     cart: {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'Cart'
    //     }
    // }
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
    this.populate('docs.product')
})

schema.plugin(monsoosePaginate);
export const CartModel = model('carts', schema);