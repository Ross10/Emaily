//Here we will create our module class :
const mongoose = require('mongoose');

//We can write this :
//const Schema = mongoose.Schema;
//To this (Down Below) : - Its call distructor
const { Schema } = mongoose;
//Create a new Schema for this new collection

const userSchema = new Schema({
    googleId: String, //That tell th Schema that this need to be a string!
    name: String
});

//This will create a new collection call "users".
mongoose.model('users',userSchema);