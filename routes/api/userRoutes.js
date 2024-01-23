const router = require('express').Router();
const { getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,

} = require('../../controllers/userController');
router.route('/api/users').get(getUsers)
router.route('/api/users:/id').get(getSingleUser)
router.route('/api/users').get(createUser)
router.route('/api/users').get(updateUser)
router.route('/api/users').get(deleteUser)
router.route('/api/users/:userId/friends/:friendId').get(addFriend)
router.route('/api/users/:userId/friends/:friendId').get(removeFriend)

module.exports = router;

