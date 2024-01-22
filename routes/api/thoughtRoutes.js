const router = require('express').Router();
const {
getThoughts,
getSingleThought,
createThought,
updateThought,
deleteThought,
createReaction,
removeReaction,
} = require('../../controllers/userController');

router.route('/api/thoughts').get(getThoughts)
router.route('/api/thoughts:/id').get(getSingleThought)
router.route('/api/thoughts').get(createThought).post(createUser);
router.route('/api/thoughts').get(updateThought).post(createUser);
router.route('/api/thoughts:/id').get(deleteThought).post(createUser);
router.route('/api/thoughts/:thoughtId/reactions').get(createReaction).post(createUser);
router.route('/api/thoughts/:thoughtId/reactions/:reactionId').get(removeReaction).post(createUser);


router.route('/:userId').get(getSingleUser);

module.exports = router;