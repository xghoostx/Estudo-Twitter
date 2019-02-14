const express = require('express');
const routes = express.Router(); // express.Router() = e o modulo de rotas do express e apartir de routes e possivel definir todas as rotas
const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');

routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.create);
routes.post('/likes/:id', LikeController.create); // precisa do id para saber qual e o tweet que quer dar like

module.exports = routes;
