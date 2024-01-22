const app = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // Get a single user by its _id and populated thought and friend data
      async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Post a new user
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      // Put to update a user by its _id
      async updateUser(req, res) {
        try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}) ;
            
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(updatedUser);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
             
      


    // Delete to remove user by its _id
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          await Application.deleteMany({ _id: { $in: user.applications } });
          res.json({ message: 'User and associated apps deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
      }
    ,

// Post to add a new friend to a users friend list
    async addFriend(req, res) {
    try {
        const addFriend = await User.findByIdAndUpdate(req.params.userId, 
            { $push: {friends: req.params.friendId } }, { new: true })
            
            if (!addFriend) {
                return res.status(404).json({ message: 'No friend with this id!' });
              }
        
              res.json(addFriend);
            } catch (err) {
              res.status(500).json(err);
            }
          },


// Delete to remove a friend from a users friend list
    async removeFriend(req, res) {
    try{
        const deletedFriend = await User.findByIdAndUpdate(req.params.userId, 
            { $pull: { friends: req.params.friendId } }, { new: true });
            if (!application) {
                return res.status(404).json({ message: 'No application with this id!' });
              }
        
              res.json(application);
            } catch (err) {
              res.status(500).json(err);
            }
        }    

}