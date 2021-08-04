//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var FeelerSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // name: String,
  picture: String,
  joined: Date,
  admin: Boolean
});

FeelerSchema
.virtual('url')
.get(function() {
  return '/' + this._id;
})

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Feeler', FeelerSchema );
