const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

// Login
router.post("/login", async (req, res) => {
  const { error } = validateLoginUsers(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne(
    { email: req.body.email }
  );
  if (!user) {
    return res.status(400).send("Invalid email address.");
  }
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("Invalid password.");
    }
  
  const token = user.generateAuthToken();

  res.status(200).send(token);
});

function validateLoginUsers(user) {
  const schema = Joi.object({
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
    })
  });

return schema.validate(user);
}

// Create User (Register)
router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user) {
    return res.status(400).send("User is already registered");
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profilePic: req.body.profilePic,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  const { password, ...newUser } = user._doc;
  res.status(200).json(newUser);
});

module.exports = router;