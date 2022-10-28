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
userSchema.plugin(mongooseUniqueValidator);

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user
userSchema.statics.login = async (email, password) => {
  
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;