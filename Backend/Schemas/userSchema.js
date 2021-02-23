const mongoose = require('mongoose')

var Schema1 = new mongoose.Schema({
username : String,
first_name: String,
last_name: String,
email:String,
password:String,
resetPasswordToken : String
});

// Compile model from schema
var New_Collection = mongoose.model('New_Collection', Schema1 );
module.exports = New_Collection;