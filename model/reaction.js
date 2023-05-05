const mongoose = require('mongoose'); //import mongoose
const { Schema, model } = require('mongoose'); //import the schema and model methods from mongoose

const reactionSchema = new Schema(
    // Declare the new reaction schema
    {
        reactionId: {
            type: Schema.Types.ObjectId, // Declare the reactionId field as an ObjectId
            default: () => new mongoose.Types.ObjectId() // Declare the default value of the reactionId field
        },
        reactionBody: {
            type: String, // Declare the reactionBody field as a string
            required: true, // Declare the reactionBody field as required
            max_length: 280 // Declare the max length of the reactionBody field
        },
        username: {
            type: String, // Declare the username field as a string
            required: true // Declare the username field as required
        },
        createdAt: {
            type: Date, // Declare the createdAt field as a Date
            default: Date.now, // Declare the default value of the createdAt field
            get: createdAtVal => dateformat(createdAtVal, 'mm/dd/yyyy hh:mm:ss') // Declare the getter method for the createdAt field
        }
    }
);

module.exports = reactionSchema; //export the reactionSchema
