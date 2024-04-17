const router = require('express').Router();
const { read, save } = require('../readWrite.js');
const dbPath = './api/blog.json';
const { v4: uuidv4 } = require('uuid')//random id generator

//get all from db - /get/all
router.get('/get/all', (req, res) => {
    try {
        const allPosts = read(dbPath);
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

//get one db by post_id - /get/one/:id
router.get('/get/one/:id', (req, res) => {
    try {
        const postId = req.params.id;
        const allPosts = read(dbPath);
        const onePost = allPosts.find(post => post.post_id.toString() === postId);//find all post then find the matching id of the post 
        
        if (!onePost) res.status(404).json({message: 'id does not exist'}); //error if the id does not exist 
    
        res.status(200).json(onePost);
    } catch (error) {
        res.status(500).json({message: error});//error 
    }
});

//post - /create - entry should contain {post_id, author, title, body}
router.post('/create', (req,res) => {
    try { //try to get the new post created with the given params, change its id to +1 of what the old id was and save it to our json file
        const allPosts = read(dbPath)
        const { title, author, body } = req.body
         const post = {
            post_id: uuidv4(),//generate a uuid for each new post
            title,
            author,
            body
        }
        allPosts.push(post) //add new post to all posts and save it 
        save(allPosts, dbPath);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// put - /update/:id - if no data is given for any item do not update the item
router.put('/update/:id', (req, res) => {
    try { //try to update a post by the id given with the new data 
        const postId = req.params.id; //const { id } = req.params(different way of writing this)
        const { title, author, body } = req.body;
        const allPosts = read(dbPath);
        const postIndex = allPosts.findIndex(post => post.post_id.toString() === postId);// Find the index of the post with the given postId

        if (postIndex === -1) { //if post index is not found then error
            res.status(404).json({ message: 'Post not found' });
            return;
        };
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
        res.status(500).json({ message: error });
    }
});

// delete - /delete/:id - make sure to tell user it has been deleted
router.delete('/delete/:id', (req, res) => {
    try {
        const postId = req.params.id;
        let allPosts = read(dbPath); 
        const postIndex = allPosts.findIndex(post => post.post_id.toString() === postId);// Find the index of the post with the given postId

        if (postIndex === -1) { // If post not found, return 404
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        const deletedPost = allPosts.splice(postIndex, 1);// Remove the post from the array
        save(allPosts, dbPath);
        res.status(200).json({ message: 'Post deleted successfully', deletedPost });//notify the user and show the post deleted
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});


module.exports = router;

