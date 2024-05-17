const { Thought, User, Reaction } = require ('../models')

  module.exports = {
      // Get to get all thoughts
      async getThoughts(req, res) {
          try {
          const thoughts = await Thought.find()
          res.json(thoughts)
      } catch (err) {
          res.status(500).json(err)
      }
      },

      // Get to get a single thought by its _id
  async getSingleThought(req, res) {
      try {
          const oneThought = await Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v');

          if (!oneThought) {
              return res.status(404).json({ message: 'No thought with that ID'})
          }
          res.json(oneThought)
      } catch (err) {
          res.status(500).json(err)
      }
  },

  // POST to create a new thought 
  async createThought(req, res) {
      try {
          const newThought = await Thought.create(req.body)
          const updateUser = await User.findOneAndUpdate(
              { username: req.body.username }, 
              { $addToset: { thoughts: newThought._id} },
              {new: true });
              
              if (!updateUser) {
                  return res
                    .status(404)
                    .json({ message: 'thought created, but found no user with that ID' });
                }
          
                res.json('Created the thought 🎉');
              } catch (err) {
                console.log(err);
                res.status(500).json(err);
              }
            },

    // PUT to update a thought by its _id
  async updateThought (req, res) {
      try {
          const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, 
              { thoughtText: req.body.thoughtText, createdAt: req.body.createdAt });
              
              if (!updatedThought) {
                  return res.status(404).json({ message: 'No thought with this id!' });
                }
          
                res.json(updatedThought);
              } catch (err) {
                console.log(err);
                res.status(500).json(err);
              }
            },

  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
  try {
      const deletedThought = await Thought.findByIdAndDelete( req.params.thoughtId );
      
      if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );

        if (!user) {
          return res.status(404).json({ 
            message: 'Thought deleted but no user with this id!' 
          });
        }

        res.json({ message: 'Thought successfully deleted!' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // POST to create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const newReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true  }
      );
        
      if (!newReaction) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }
  
      res.json('Created the reaction 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
    
    // DELETE to pull and remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
  try {
    const deleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
      
    if (!deleteReaction) {
      return res.status(404).json({ message: 'No reaction with this ID' });
    }

    res.json({ message: 'Reaction successfully deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
}








