const router = require('express').Router();
const { read, save } = require('../readWrite.js');
const dbPath = './api/blog.json';

router.get('/api/test', (req, res) => { //this is a test 
    res.send('were up and going')
});

//get all from db - /get/all
router.get('/get/all', (req, res) => {
    try {
        const allPosts = read(dbPath)
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json({message: 'error getting all posts'})
    }
});

//get one db by post_id - /get/one/:id
router.get('/get/one/:id', (req, res) => {
    try {
        const postId = req.params.id
        const allPosts = read(dbPath)
        const onePost = allPosts.find(post => post.post_id.toString() === postId)//get the whole post, stringify the id because its comparing a number to a string, get the id that matches the params 
        
        if (!onePost) res.status(404).json({message: 'id does not exist'}) //error if the id does not exist 
    
        res.status(200).json(onePost)
    } catch (error) {
        res.status(500).json({message: 'error getting one post'})//error 
    }
});

//post - /create - entry should contain {post_id, author, title, body}
router.post('/create', (req,res) => {
    try {
        const allPosts = read(dbPath)
        const { title, author, body } = req.body
         const post = {
            post_id: allPosts.length + 1,
            title,
            author,
            body
        }
        allPosts.push(post) //add new post to all posts and save it 
        save(allPosts, dbPath)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({message: 'error creating new post'})
    }
});

// put - /update/:id - if no data is given for any item do not update the item
router.put('/update/:id', (req, res) => {
    try {
        const postId = req.params.id;
        const { title, author, body } = req.body;
        const allPosts = read(dbPath);
        const postIndex = allPosts.findIndex(post => post.post_id.toString() === postId);// Find the index of the post with the given postId

        if (postIndex === -1) { //if post index is not found then error
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        allPosts[postIndex] = {  // Update the post with the new data
            ...allPosts[postIndex], //seperate the array into individual elements(used this syntax in zorkington)
            title,
            author,
            body
        };
        save(allPosts, dbPath); // Save the updated list of posts
        res.status(200).json(allPosts[postIndex]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating post' });
    }
});

//delete - /delete/:id - make sure to tell user it has been deleted



module.exports = router;


//start link with localhost:5500/blog AND THEN add endpoint 
