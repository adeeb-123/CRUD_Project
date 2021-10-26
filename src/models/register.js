const mongoose = require("mongoose")


const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: true,
        unique: true
    },
    filename: {
        type: String
    },
})


const Register = new mongoose.model("RegisterEmp" , empSchema)
module.exports = Register