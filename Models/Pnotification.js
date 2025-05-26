// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
PnotificationSchema = new Schema({
    email: String,
    name: String,
    phone: Number,
    pname: String,
    pid: Number,
    date: String
});
module.exports = mongoose.model('Pnotification', PnotificationSchema);