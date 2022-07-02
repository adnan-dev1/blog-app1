const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Post } = require("../models/post");
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');
const isAdmin = require("../middleware/isAdmin");

// Get User
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(404).send("There is no user found with the given ID.");
  }

  res.status(200).json(user);
});

// Update User
router.put("/me", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (user) {
    if (user._id.toString() !== req.user._id) {
      return res.status(400).send("Username or Email address is already taken.");
    }
  }

  user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).send("The user with the given ID was not found.");
  }

  await Post.updateMany({ username: user.username }, {
    username: req.body.username
  });
  
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profilePic: req.body.profilePic,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      username: user.username,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic,
    },
    { new: true }
  );

  const token = updatedUser.generateAuthToken();

  const { password, ...newUser } = updatedUser._doc;
  res.status(200).json(token);
});

// Delete User
router.delete("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).send("The user with the given ID was not found.");
  }

  await Post.deleteMany({ username: user.username });
  await User.findByIdAndRemove(req.user._id);

  res.status(200).json('User has been deleted.');
});

// Delete Specific User By Admin 
router.delete("/:id",[auth, isAdmin], async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send("The user with the given ID was not found.");
  }

  await Post.deleteMany({ username: user.username });
  await User.findByIdAndRemove(req.params.id);

  res.status(200).json('User has been deleted.');
});

// Get Users
router.get("/",[auth, isAdmin], async (req, res) => {
  const users = await User.find({isAdmin: false}).select('-password');

  res.status(200).json(users);
});

module.exports = router;
