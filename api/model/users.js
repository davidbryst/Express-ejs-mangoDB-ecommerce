const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        maxlength: 32,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
        type: String,
        required: true,
    },
    sexe: {
      type: String,
      required: true,
    },
    userRole: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    // userImage: {
    //   type: String,
    //   default: "user.png",
    // },
    // verified: {
    //   type: String,
    //   default: false,
    // },
    // secretKey: {
    //   type: String,
    //   default: null,
    // },
    // history: {
    //   type: Array,
    //   default: [],
    // },
},
{ timestamps: true });

userSchema.plugin(uniqueValidator);
// userSchema.post('save', function (doc, next){
//   console.log('new users creat and save', doc);
// })

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;