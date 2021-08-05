//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PrivateFeelingSchema = new Schema({
  message: String,
  color: String,
  date: Date,
  feeler: {type: Schema.Types.ObjectId, ref: 'User'},
  feelee: {type: Schema.Types.ObjectId, ref: 'User'}
});

PrivateFeelingSchema
.virtual('url')
.get(function() {
  return '/' + this._id;
})

//Export function to create "SomeModel" model class
module.exports = mongoose.model('PrivateFeeling', PrivateFeelingSchema );
