import express from 'express';
import dotenv from 'dotenv';

const app = express(); //express app variable
dotenv.config(); //load environmental variabless
const PORT = process.env.PORT || 6000;//declaring a port


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

