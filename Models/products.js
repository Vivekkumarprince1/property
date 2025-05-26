// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ProductSchema = new Schema({
    name: String,
    pid: Number,
    price: Number,
    size: String,
    location: String,
    phone: Number,
    image: String
});
module.exports = mongoose.model('products', ProductSchema);