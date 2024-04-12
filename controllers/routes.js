const router = require('express').Router();
const { read, save } = require('../readWrite.js');
const dbPath = './api/blog.json';

router.get('/api/test', (req, res) => {
    res.send('were up and going')
});

//get all from db - /get/all
router.get('/get/all', (req, res) => {
    try {
        const allPosts = read(dbPath)
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json({message: error})
    }
});

//get one db by post_id - /get/one/:id

//post - /create - entry should contain {post_id, author, title, body}

//put - /update/:id - if no data is given for any item do not update the item

//delete - /delete/:id - make sure to tell user it has been deleted

module.exports = router;


//start link with localhost:6000/blog AND THEN add endpoint 