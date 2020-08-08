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
    res.render('./home/index', {title: 'home'});
});

app.get('/Minesweeper', (req, res) => {
    res.render('./Minesweeper/index', {title: 'Minesweeper'});
});

app.get('/MemoryGame', (req, res) => {
    res.render('./MemoryGame/index', {title: 'MemoryGame'});
});

app.get('/SpaceInvader', (req, res) => {
    res.render('./SpaceInvader/index', {title: 'SpaceInvader'});
});

app.get('/Tetris', (req, res) => {
    res.render('./Tetris/index', {title: 'Tetris'});
});

app.get('/TheSnake', (req, res) => {
    res.render('./TheSnake/index', {title: 'TheSnake'});
});

app.get('/WackMole', (req, res) => {
    res.render('./WackMole/index', {title: 'WackMole'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('./404/index', {title: '404'});
})