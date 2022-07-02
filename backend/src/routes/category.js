const router = require('express').Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { Category, validate } = require('../models/category');
const { Post } = require('../models/post');

// Get Categories
router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

// Create Category
router.post("/",[auth, isAdmin], async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let newCat = new Category({
        name: req.body.name,
    });

    newCat = await newCat.save();
    res.status(200).json(newCat);
});

// Delete Category
router.delete("/:id",[auth, isAdmin], async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
        return res.status(404).send('The category with the given ID was not found.');
    }

    await Post.updateMany({},
        {
            $pull: {
                categories: {
                    $in: [category.name]
                }
            }
        }
    );

    res.status(200).json(category);
});

module.exports = router;