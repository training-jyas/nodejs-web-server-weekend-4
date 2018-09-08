const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const getTime = () => {
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes();
    const date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    return `${time}, ${date}`
};

hbs.registerHelper('getTime', getTime);

app.use((req, res, next) => {
    console.log(`Called at: ${getTime()}, ${req.method}, ${req.url}`);

    fs.appendFile('server.log', `Called at: ${getTime()}, ${req.method}, ${req.url} \n`);
    next();
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World !</h1>');
});

app.get('/students', (req, res) => {
    res.send({
        s1: 'Himanshu',
        s2: 'Vineet'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About'
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        title: 'Home'
    });
});

app.listen('3000', () => {
    console.log('Server is running on port 3000');
});
