const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

//get all users
router.route('/').get(getAllUsers);

router.route(`/create`).post(createUser);

router.route('/:id').get(getUserById);

router.route('/update/:id').post(updateUser);  //http://localhost:3001/api/users/update/60b9b0b3e3b3a1b4b4f7b0b0

router.route('/delete/:id').post(deleteUser); //http://localhost:3001/api/users/delete/60b9b0b3e3b3a1b4b4f7b0b0

router.route(`/:id/addfriend/:friendId`).post(addFriend); //http://localhost:3001/api/users/60b9b0b3e3b3a1b4b4f7b0b0/addfriend/60b9b0b3e3b3a1b4b4f7b0b1

router.route(`/:id/removefriend/:friendId`).post(removeFriend); //http://localhost:3001/api/users/60b9b0b3e3b3a1b4b4f7b0b0/removefriend/60b9b0b3e3b3a1b4b4f7b0b1

module.exports = router;