const mongoose = require('mongoose');
const Joi = require('joi');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 10,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        required: false,
        default: '/public/profileImages/profileLogo.png'
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      profilePic: this.profilePic,
      isAdmin: this.isAdmin
    },
    process.env.jwtPrivateKey
  );
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(10).required().lowercase().trim(true).messages({
            'string.base': `The username should be 'text'`,
            'string.empty': `The username cannot be an empty field`,
            'string.min': `The username should be at least 5 characters`,
            'string.max': `The username should be at most 10 characters`,
            'any.required': `The username is a required field`
        }),
        email: Joi.string().email({ tlds: { allow: false } }).lowercase().trim(true).required().messages({
            'string.base': `The email address should be 'text'`,
            'string.empty': `The email address cannot be an empty field`,
            'string.email': `The email address is not valid`,
            'any.required': `The email address is a required field`
        }),
        password: Joi.string().min(8).trim(true).required().messages({
            'string.base': `The password should be 'text'`,
            'string.empty': `The password cannot be an empty field`,
            'string.min': `The password should be at least 8 characters`,
            'any.required': `The password is a required field`
        }),
        profilePic: Joi.string().messages({
            'string.base': `The profilePic should be 'text'`,
        })
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
