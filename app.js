require('dotenv').config();
const express = require('express');
const blogController = require('./controllers/routes');
const cors = require('cors')

const app = express(); //express app variable

const PORT = process.env.PORT || 6000;//declaring a port
//adding middleware
app.use(express.json()); //gives access to the body of posts requests
app.use(express.urlencoded({ extended: true }));
app.use('/blog', blogController);
app.use(cors());

//serve public directory
app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});


