const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true},//It automatically removes any leading or trailing whitespace from the string before saving it to the database.
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required: true,
        minlength:6,
        select: false//select false means that by default, this field will not be returned in query results unless explicitly specified.
     },
},
{    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'}
    }
);
module.exports = mongoose.model("User",userSchema);