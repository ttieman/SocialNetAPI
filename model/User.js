const { Schema, model } = require('mongoose'); //import the schema and model methods from mongoose

const userSchema = new Schema(
    //declare the new user schema
    {
        username: {
            type: String, //declare the username field as a string
            required: true, //declare the username field as required
            max_length: 20, //declare the max length of the username field
            trim: true //trim whitespace from the username field 
        },
        email: {
            type: String, //declare the email field as a string
            required: true, //declare the email field as required
            unique: true, //declare the email field as unique
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] //declare the email field as a valid email address
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, //declare the thoughts field as an array of ObjectId values
                ref: 'Thought' //declare the thoughts field as a reference to the Thought model            
            }],
        friends: [
            {
                type: Schema.Types.ObjectId, //declare the friends field as an array of ObjectId values
                ref: 'User' //declare the friends field as a reference to the User model
            }],
    }

);

userSchema.virtual('friendCount').get(function () { //declare the virtual friendCount field
    return this.friends.length;
});

const User = model('User', userSchema); //create the User model using the userSchema

module.exports = User; //export the User model