const router = require('express').Router();
const {
getThoughts,
getSingleThought,
createThought,
updateThought,
deleteThought,

createReaction,
removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

router.route('/api/thoughts/:thoughtId/reactions').put(createReaction)
router.route('/api/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction)



module.exports = router;