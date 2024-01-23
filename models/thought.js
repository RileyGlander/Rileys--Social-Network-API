const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
      Type:String, 
      required:true, 
      minlength: 1, maxlength: 280},
    
      createdAt:{
        type: Date, 
        default: Date.now,},
    
        username: {
          Type:String, 
          required:true},
    
          reactions: {get: function () {
        return this.createdAt.toLocaleString()
        }
     }  
})

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function () {
      return this._createdAt.toISOString().split('T')[0];
    },
  },
});

reactionSchema.virtual(reactionCount).get(function () {
  return this.friends.length;
});

const Reaction = model('reaction', reactionSchema)
  const Thought = model('thought', thoughtSchema)
  

  module.exports = Thought, Reaction;