/*
  - Models will act like a middleman for communicating
   with database.
*/

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

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
    },
    bio: String,
    image: String
  },
  { timestamps: true }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;


/**
 * 
 *     username: {
      type: String,
      //required: true
    }
    // bio: String,
    // image: String
 */