import { Schema, model, mongoose } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
        idProduct: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: { type: Number }, 
        _id: false 
        },
        { versionKey: false }
    ],
    modifiedOn: {
        type: Date,
        default: Date.now
    },
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