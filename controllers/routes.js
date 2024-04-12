
const PORT = process.env.PORT || 6000;

app.get('/api/test', (req, res) => {
    res.send('were up and going')
});

