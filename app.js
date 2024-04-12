require('dotenv').config();
const express = require('express');
const blogController = require('./controllers/routes');

const app = express(); //express app variable

const PORT = process.env.PORT || 6000;//declaring a port
//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/blog', blogController);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

