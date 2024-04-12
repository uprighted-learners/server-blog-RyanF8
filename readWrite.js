const fs = require('fs');

function read(path) {
    const file = fs.readFileSync(path);
    return !file.length ? [] : JSON.parse(file);// this is an if else but its a ternary
};

function save(data, path) {
    fs.writeFile(path, JSON.stringify(data), (error) => {
        if (error) console.log(error)
    })
};


module.exports = { read, save };