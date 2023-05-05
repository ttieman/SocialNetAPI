const { Schema, model } = require('mongoose'); //import the schema and model methods from mongoose
const userSchema = require('./User');
const reactionSchema = require('./reaction');
//import the userSchema from the user model
const thoughtSchema = new Schema(
    //declare the new thought schema
    {
        thoughtText: {
            type: String, //declare the thoughtText field as a string
            required: true, //declare the thoughtText field as required
            max_length: 280 //declare the max length of the thoughtText field
        },
        createdAt: {
            type: Date, //declare the createdAt field as a Date
            default: Date.now, //declare the default value of the createdAt field
            get: createdAtVal => dateformat(createdAtVal, 'mm/dd/yyyy hh:mm:ss') //declare the getter method for the createdAt field
        },
        username:
        {
            type: String, //declare the username field as a string
            required: true //declare the username field as required
        },
        reactions: [reactionSchema] //declare the reactions field as an array of reactionSchema values

    }
);

thoughtSchema.virtual('reactionCount').get(function () { //declare the virtual reactionCount field
    return this.reactions.length; //return the length of the reactions array
});

const Thought = model('Thought', thoughtSchema); //create the Thought model using the thoughtSchema

module.exports = Thought; //export the Thought model