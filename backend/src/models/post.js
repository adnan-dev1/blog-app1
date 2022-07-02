const mongoose = require('mongoose');
const Joi = require('joi');
const fs = require("fs");
const path = require('path');

const Post = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    desc: {
        type: String,
        required: true,
        maxlength: 1500
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    photo: {
        type: String,
        required: false,
        default: '/public/postImages/defaultImage.jpg'
    },
    categories: {
        type: Array,
        required: false,
        validate: [categoriesLimit, "You can't add more than 3 categories for one post."]
    }
}, {timestamps: true}));

function categoriesLimit(cats) {
    return cats.length <= 3;
}

function validatePost(post) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(20).required().messages({
            'string.base': `The post title should be 'text'`,
            'string.empty': `The post title cannot be an empty field`,
            'string.min': `The post title should be at least 5 characters`,
            'string.max': `The post title should be at most 20 characters`,
            'any.required': `The post title is a required field`
        }),
        desc: Joi.string().max(1500).required().messages({
            'string.base': `The post description should be 'text'`,
            'string.empty': `The post description cannot be an empty field`,
            'string.max': `The post description should be at most 1500 characters`,
            'any.required': `The post description is a required field`
        }),
        username: Joi.string().required().messages({
            'string.base': `The username should be 'text'`,
            'string.empty': `The username cannot be an empty field`,
            'any.required': `The username is a required field`
        }),
        photo: Joi.string().messages({
            'string.base': `The post photo should be 'text'`,
        }),
        categories: Joi.array()
    });

    return schema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;
