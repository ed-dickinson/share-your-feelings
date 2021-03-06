//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PublicFeelingSchema = new Schema({
  message: String,
  color: String,
  date: Date,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

PublicFeelingSchema
.virtual('url')
.get(function() {
  return '/' + this._id;
})

//Export function to create "SomeModel" model class
module.exports = mongoose.model('PublicFeeling', PublicFeelingSchema );
