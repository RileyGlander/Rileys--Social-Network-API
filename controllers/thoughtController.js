const { Thought, User } = require ('..models')

module.exports = {
    // Get to get all thoughts
    async getThoughts(req, res) {
        try {
        const thoughts = await Thought.find({})
        res.json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
    },

async getSingleThought(req, res) {
    try {
        const oneThought = await Thought.findOne({ _id: req.params.id})

        if (!oneThought) {
            return res.status(404).json({ message: 'No thought with that ID'})
        }
        res.json(oneThought)
    } catch (err) {
        res.status(500).json(err)
    }
},

async createThought(req, res) {
    try {
        const newThought = await Thought.create(req.body)
        const updateUser = await User.findOneAndUpdate(
            { username: req.body.username }, 
            { $push: { thoughts: newThought} })
            
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

async updateThought (req, res) {
    try {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.id }, 
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

async deleteThought(req, res) {
try {
    const deletedThought = await Thought.findByIdAndDelete( req.params.id );
    
    if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

async createReaction(req, res) {
  try {
    const newReaction = await Thought.create({ thoughtId: req.params.thoughtId, reactionBody: req.body.reactionBody });
    const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { reactions: newReaction._id } },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({
          message: 'Application created, but found no user with that ID',
        })
      }

      res.json('Created the reaction 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
async removeReaction(req, res) {
try {
  const deleteReaction = await Thoughts.findOneAndRemove( req.params.thoughtId, 
    { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true })
    
    if (!deleteReaction) {
      return res.status(404).json({ message: 'No reaction with this id!' });
    }

    const user = await User.findOneAndUpdate(
      { reactions: req.params.reactionId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Reaction created but no user with this id!',
      });
    }

    res.json({ message: 'Reaction successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
}








