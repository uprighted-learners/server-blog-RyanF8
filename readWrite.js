const fs = require('fs');

function read(path) { //allows us to get the path leading to our json file
    const file = fs.readFileSync(path);
    return !file.length ? [] : JSON.parse(file);// this is an if else but its a ternary
};

function save(data, path) { //alows us to save data to our json file
    fs.writeFile(path, JSON.stringify(data), (error) => {
        if (error) console.log(error)
    })
};


module.exports = { read, save }; //export our read and save function