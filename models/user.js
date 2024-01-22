const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {Type:String, unique:true, required:true, trim:true},
    email: {Type:String, required:true, unique:true, match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/}, 
    thoughts: { type: mongoose.Schema.Types.ObjectId, ref: 'Thought'},
    friends: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

userSchema.virtual(friendCount).get(function () {
    return this.friends.length;
  });

  const User = model('user', userSchema)

  module.exports = { User };