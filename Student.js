const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    RollNo : String,
    name : String,
    degree : String,
    city : String
})

module.exports = mongoose.model('Student',studentSchema);