const express = require('express'), path = require("path");

const PORT = 8080;

const app = new express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/lander.html')
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/projects.html'))
})

app.get('/challenges', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/challenges.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/contact.html'))
})


//checks if user has completed landing
const checkAuth = (objectsWithConfidences, passObject) => {
    if(objectsWithConfidences.person && objectsWithConfidences.passObject){
        console.log("YAY");
    }
}


app.listen(process.env.PORT || PORT);