/*
  - Models will act like a middleman for communicating
   with database.
*/

const mongoose = require('mongoose');

//require bcrypt
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

/*- create a Schema
  - pass an object for each { field } in document of Collection
   + and define these type of each field
*/
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  }

});
/*
  - create a model - make the model name singular
  - and mongoose will make it plural as Database name
*/
const User = mongoose.model('user', UserSchema);

// export the model
module.exports = User;