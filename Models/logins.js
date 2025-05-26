// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
LogSchema = new Schema({
    email: String,
    name: String,
    password: String,
    phone: Number,
    type: String
});
module.exports = mongoose.model('logins', LogSchema);