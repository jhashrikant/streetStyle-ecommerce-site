const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//     product_name: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String, required: true },
//     size: { type: String },
//     color: { type: String },
//     category: { type: String, required: true },
//     availableQty: { type: Number, required: true },
// }, { timestamps: true });



const ProductSchema = new mongoose.Schema({
    product_name: { type: String, required: true, unique: true },
    default_img: {type: String},
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    colors: [{
        color: { type: String, required: true },
        image: { type: String, required: true },
        sizes: [{
            size: { type: String, required: true },
            quantity: { type: Number, required: true }
        }]
    }]
}, { timestamps: true });


mongoose.models = {}
module.exports = mongoose.model('Product', ProductSchema);