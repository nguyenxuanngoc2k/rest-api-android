const mongoose = require('mongoose');
const{Schema} = mongoose;
const ProductSchema = new Schema({
    name: String,
    decription: String,
    image: [String],
    price: Number,
    category: {type :Schema.Types.ObjectId , ref: "categories"},
    creaAt: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Product', ProductSchema);