const router = require('express').Router();

const {
    getAllThoughts,

    getThoughtById,

    createThought,

    updateThought,

    deleteThought,

    addReaction,

    removeReaction

} = require('../../controllers/thoughtController');


//get all thoughts
router.route('/').get(getAllThoughts);

//get a thought by id
router.route('/:id').get(getThoughtById);

//create a thought
router.route('/create').post(createThought);

//update a thought
router.route('/update/:id').post(updateThought);

//delete a thought
router.route('/delete/:id').post(deleteThought);

//add a reaction
router.route('/:id/reactions').post(addReaction);

//delete a reaction
router.route('/:id/reactions/:reactionId').delete(removeReaction);



module.exports = router;