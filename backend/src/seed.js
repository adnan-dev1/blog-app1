const { Category } = require("./models/category");
const { Post } = require("./models/post");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const users = [
    {
        username: 'Melody',
        email: 'MelodyWClute@dayrep.com',
        password: 'CAlkhret'
    },
    {
        username: 'Florence',
        email: 'FlorenceAHolden@jourrapide.com',
        password: 'atERgstu'
    },
    {
        username: 'Anthony',
        email: 'AnthonyVTodd@rhyta.com',
        password: 'OckpIUsH'
    },
    {
        username: 'Johnny',
        email: 'JohnLCash@dayrep.com',
        password: 'alitYPnO'
    },
    {
        username: 'Danielle',
        email: 'DanielleJSmith@dayrep.com',
        password: 'AndANSiV'
    }
];

const categories = [
    {
        name: 'Game'
    },
    {
        name: 'Life'
    },
    {
        name: 'Music'
    },
    {
        name: 'Food & Drink'
    },
    {
        name: 'Sport'
    },
    {
        name: 'Anime'
    },
];

const posts = [
    {
        title: 'Make GAME',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Johnny',
        categories: ['Game']
    },
    {
        title: 'Successful Life',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Johnny',
        categories: ['Life']
    },
    {
        title: 'Fast-Track',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Danielle',
        categories: ['Music']
    },
    {
        title: 'Kitchen Title',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Anthony',
        categories: ['Food & Drink', 'Life']
    },
    {
        title: 'Music Title',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Florence',
        categories: ['Music', 'Life']
    },
    {
        title: 'Music Life',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Anthony',
        categories: ['Music', 'Life', 'Sport']
    },
    {
        title: 'Food Title',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Melody',
        categories: ['Food & Drink']
    },
    {
        title: 'Animation World',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Florence',
        categories: ['Anime', 'Game']
    },
    {
        title: 'Power Up',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Melody',
        categories: ['Sport', 'Game']
    },
    {
        title: 'Sports Title',
        desc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        username: 'Johnny',
        categories: ['Sport']
    }
]

async function seed() {
    await mongoose.connect(process.env.MONGO_URL + '/blog_app');

    console.log('Purging the database ....');

    await Category.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});

    console.log('Purging done !!');

    console.log('Populating the categories ...');

    for (let category of categories) {
        const newCat = new Category({
            name: category.name
        });
        await newCat.save();
    }

    console.info("Populating categories done !!");

    console.log('Populating the users ...');

    for (let user of users) {
        const newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
    }

    console.info("Populating users done !!");

    console.log('Populating the posts ...');

    for (let post of posts) {
        const newPost = new Post({
            title: post.title,
            desc: post.desc,
            username: post.username,
            categories: post.categories
        });
        await newPost.save();
    }

    console.info("Populating posts done !!");

    mongoose.disconnect();

    console.info("All Populating Done !!");
}

seed();