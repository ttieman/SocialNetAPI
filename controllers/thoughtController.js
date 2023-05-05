const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../model');
const reactionSchema = require('../model/reaction');

module.exports = {
    //get all thoughts
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body); //create a new thought

            await User.findOneAndUpdate( //find a user by id and update the thoughts array
                { _id: req.body.userId },
                { $push: { thoughts: newThought._id } },
                { runValidators: true, new: true }
            );
            res.status(200).json(newThought); //return the new thought
        } catch (err) {
            res.status(400).json(err); //return the error


        }
    },
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({}); //find all thoughts
            res.status(200).json(thoughts); //return the thoughts
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id }); //find a thought by id
            res.status(200).json(thought); //return the thought
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id }, //find a thought by id
                { $set: req.body }, //update the thought
                { runValidators: true, new: true } //validate the update and return the updated thought
            );
            res.status(200).json(thought); //return the updated thought
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.id });//find a thought by id
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            const user = await User.findOneAndUpdate(//find a user by id
                { username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true }
            );
            res.status(200).json({ message: "Thought was deleted successfully" });
        } catch (err) {
            console.error(err); // Log the error
            res.status(400).json({ message: "An error occurred while deleting the thought", error: err.message }); // Provide more information about the error
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id }, //find a thought by id
                { $push: { reactions: req.body } }, //update the thought
                { runValidators: true, new: true } //validate the update and return the updated thought
            );
            res.status(200).json(thought); //return the updated thought
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id }, //find a thought by id
                { $pull: { reactions: { reactionId: req.params.reactionId } } }, //update the thought
                { runValidators: true, new: true } //validate the update and return the updated thought
            );
            res.status(200).json(thought); //return the updated thought
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    }


};