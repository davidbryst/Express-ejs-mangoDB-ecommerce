const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please enter an username'],
        minlength: [4, 'Minimum username length is 4 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [8, 'Minimum password length is 8 characters'],
    },
    sexe: {
      type: String,
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

// 
// userSchema.plugin(mongooseUniqueValidator);

// static method to login user
// userSchema.statics.login = async (email, password) => {
//   const user = await this.findOne({ email });
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error('incorrect password');
//   }
//   throw Error('incorrect email');
// };

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;