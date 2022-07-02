const router = require('express').Router();
const auth = require('../middleware/auth');
const { Post, validate } = require('../models/post');

// Get Posts
router.get("/", async (req, res) => {
    const username = req.query.username;
    const catName = req.query.cat;
    const postTitle = req.query.post;
    
    let posts;

    if (username) {
        posts = await Post.find({ username: username });
    } else if (catName) {
        const regex = new RegExp(catName, 'i');
        posts = await Post.find(
            {
                categories: {
                    $in: [regex]
                }
            });    
    } else if (postTitle) {
        const regex = new RegExp(postTitle, 'i');
        posts = await Post.find({ title: {$regex: regex}});
    } else {
        posts = await Post.find();
    }

    res.status(200).json(posts);
});

// Create Post
router.post("/", auth, async (req, res) => {
    req.body.username = req.user.username;
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        username: req.body.username,
        photo: req.body.photo,
        categories: req.body.categories
    });

    newPost = await newPost.save();
    res.status(200).json(newPost);
});

// Delete Post
router.delete("/:id",auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).send('The category with the given ID was not found.');
    }

    if (req.user.username !== post.username && !req.user.isAdmin) {
        return res.status(401).send('Access denied. You can only delete your posts.');
    }

    await Post.deleteOne({_id: req.params.id})

    res.status(200).json('Post has been deleted.');
});

// Update Post
router.put("/:id", auth, async (req, res) => {
    req.body.username = req.user.username;
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).send('The category with the given ID was not found.');
    }

    if (req.user.username !== post.username) {
        return res.status(401).send('Access denied. You can only update your posts.');
    }
  
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        desc: req.body.desc,
        photo: req.body.photo,
        categories: req.body.categories
      },
      { new: true }
    );
  
    res.status(200).json(post);
  });
  
// Get Post
router.get("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id );
    if (!post) {
        return res.status(404).send("The Post with the given ID was not found.");
    }
    res.status(200).json(post);
});

module.exports = router;