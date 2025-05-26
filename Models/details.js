// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
DetailsSchema = new Schema({
    name: String,
    address: String,
    city: String,
});
module.exports = mongoose.model('details', DetailsSchema);