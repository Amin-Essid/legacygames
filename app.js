const express = require('express');

// express app
const app = express();

// listen to requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('...');
    res.sendFile('./views/home/index.html', { root: __dirname})
});

app.get('/ConnectFour', (req, res) => {
    // res.send('...');
    res.sendFile('./views/ConnectFour/index.html', { root: __dirname})
});

app.get('/DeathRace', (req, res) => {
    // res.send('...');
    res.sendFile('./views/DeathRace/index.html', { root: __dirname})
});

app.get('/MemoryGame', (req, res) => {
    // res.send('...');
    res.sendFile('./views/MemoryGame/index.html', { root: __dirname})
});

app.get('/SpaceInvader', (req, res) => {
    // res.send('...');
    res.sendFile('./views/SpaceInvader/index.html', { root: __dirname})
});

app.get('/Tetris', (req, res) => {
    // res.send('...');
    res.sendFile('./views/Tetris/index.html', { root: __dirname})
});

app.get('/TheSnake', (req, res) => {
    // res.send('...');
    res.sendFile('./views/TheSnake/index.html', { root: __dirname})
});

app.get('/WackMole', (req, res) => {
    // res.send('...');
    res.sendFile('./views/WackMole/index.html', { root: __dirname})
});

// app.get('/', (req, res) => {
//     // res.send('...');
//     res.sendFile('./views/home/index.html', { root: __dirname})
// });

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('views/404/index.html', { root: __dirname})
})