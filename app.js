const express = require('express');

// express app
const app = express();

// registre view engine
app.set('view engine', 'ejs');

// listen to requests
const port = process.env.PORT || 3000;
app.listen(port);

// middleware and static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.send('...');
    // res.sendFile('./views/home/index.html', { root: __dirname})
    res.render('./home/index', {title: 'home'});
});

// app.get('/ConnectFour', (req, res) => {
//     // res.send('...');
//     // res.sendFile('./views/ConnectFour/index.html', { root: __dirname});
//     res.render('./ConnectFour/index', {title: 'ConnectFour'});
// });

app.get('/DeathRace', (req, res) => {
    // res.send('...');
    // res.sendFile('./views/DeathRace/index.html', { root: __dirname});
    res.render('./DeathRace/index', {title: 'DeathRace'});
});

app.get('/MemoryGame', (req, res) => {
    // res.send('...');
    // res.sendFile('./views/MemoryGame/index.html', { root: __dirname})
    res.render('./MemoryGame/index', {title: 'MemoryGame'});
});

app.get('/SpaceInvader', (req, res) => {
    // res.send('...');
    // res.sendFile('./views/SpaceInvader/index.html', { root: __dirname});
    res.render('./SpaceInvader/index', {title: 'SpaceInvader'});
});

app.get('/Tetris', (req, res) => {
    // res.send('...');
    // res.sendFile('./views/Tetris/index.html', { root: __dirname});
    res.render('./Tetris/index', {title: 'Tetris'});
});

app.get('/TheSnake', (req, res) => {
    // res.send('...');
    // res.sendFile('./views/TheSnake/index.html', { root: __dirname});
    res.render('./TheSnake/index', {title: 'TheSnake'});
});

app.get('/WackMole', (req, res) => {
    // res.send('...');
    // res.sendFile('./views/WackMole/index.html', { root: __dirname});
    res.render('./WackMole/index', {title: 'WackMole'});
});

// app.get('/', (req, res) => {
//     // res.send('...');
//     res.sendFile('./views/home/index.html', { root: __dirname})
// });

// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('views/404/index.html', { root: __dirname})
    res.status(404).render('./404/index', {title: '404'});
})