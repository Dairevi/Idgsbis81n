const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content:{type: String, required: true}
});
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    lastname:{type: String, required: true}
});
const studentSchema = mongoose.Schema({
    studentname: {type: String, required: true},
    studentlastname:{type: String, required: true}
});
module.exports = mongoose.model('Post', postSchema);