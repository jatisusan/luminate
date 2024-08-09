import samplePosts from "./data/posts.js";
import Post from "./models/post.model.js";
import User from "./models/user.model.js";
import users from "./data/users.js";
import posts from "./data/posts.js";
import connectDB from "./config/db.js";
import colors from "colors";

process.loadEnvFile();

connectDB();

async function loadData(){
    try {
        await Post.deleteMany();
    await User.deleteMany();
    let newUser = await User.insertMany(users);
    await Post.insertMany(samplePosts.map(p => {
        return { ...p, author: newUser[0]._id }
    }));
    console.log('Data loaded'.green);
    process.exit();
    } catch (err) {
        console.log(err.message);
    }
}

async function clearData() {
    try {
        await User.deleteMany();
        await Post.deleteMany();
        console.log('Data cleared'.red);
        process.exit();
    } catch (err) {
        console.log(err.message);
        
    }
}

if (process.argv[2] == "-d") {
    clearData();
} else {
    loadData();
}
