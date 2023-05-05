const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../model');

module.exports = {
    //get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}); //find all users
            res.status(200).json(users); //return the users
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    //create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body); //create a new user
            res.status(200).json(user); //return the user
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }); //find a user by id
            res.status(200).json(user); //return the user
        } catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id }, //find a user by id
                { $set: req.body }, //update the user
                { runValidators: true, new: true } //validate the update and return the updated user
            );
            res.status(200).json(user); //return the updated user

        }
        catch (err) {
            res.status(400).json(err); //return the error
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.status(200).json({ message: "User was deleted successfully" });
        } catch (err) {
            console.error(err); // Log the error
            res.status(400).json({ message: "An error occurred while deleting the user", error: err.message }); // Provide more information about the error
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.id } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                res.status(404).json({ message: 'No friend found with this id!' });
                return;
            }

            res.status(200).json(user);
        }
        catch (err) {
            console.error(err); // Log the error
            res.status(400).json({ message: "An error occurred while adding the friend", error: err.message }); // Provide more information about the error
        }
    },

    //remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.id } },
                { runValidators: true, new: true }
            );
            if (!friend) {

                res.status(404).json({ message: 'No friend found with this id!' });
                return;
            }

            res.status(200).json(user);

        }
        catch (err) {
            console.error(err); // Log the error
            res.status(400).json({ message: "An error occurred while removing the friend", error: err.message }); // Provide more information about the error

        }
    }
}
