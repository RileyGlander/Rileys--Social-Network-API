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

router.route('/api/thoughts').get(getThoughts)
router.route('/api/thoughts:/id').get(getSingleThought)
router.route('/api/thoughts').get(createThought)
router.route('/api/thoughts').get(updateThought)
router.route('/api/thoughts:/id').get(deleteThought)
router.route('/api/thoughts/:thoughtId/reactions').get(createReaction)
router.route('/api/thoughts/:thoughtId/reactions/:reactionId').get(removeReaction)



module.exports = router;