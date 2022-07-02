const mongoose = require('mongoose');
const Joi = require('joi');

const Category = mongoose.model('Category', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 15
    }
}, { timestamps: true }));

function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required().messages({
            'string.base': `The category name should be 'text'`,
            'string.empty': `The category name cannot be an empty field`,
            'string.min': `The category name should be at least 5 characters`,
            'string.max': `The category name should be at most 15 characters`,
            'any.required': `The category name is a required field`
        })
    })

    return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;
